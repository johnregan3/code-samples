<?php

namespace App\Jobs\Migrations;

use App\Apis\AdminberApi;
use App\Concerns\ExponentialBackoff;
use App\Enums\QuotaType;
use App\Enums\SiteType;
use App\Models\SiteMonitor;
use App\Models\User;
use Cache;
use Carbon\Carbon;
use DateTime;
use Exception;
use Illuminate\Bus\Batchable;
use Illuminate\Bus\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\Middleware\RateLimited;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UpgradeSiteType
{
    use Batchable;
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;
    use ExponentialBackoff;

    private const CACHE_PREFIX = 'upgrade_site_type';

    private const PRO_CACHE_KEY = 'pro';

    private const BASIC_CACHE_KEY = 'basic';

    private const SKIPPED_CACHE_KEY = 'skipped';

    private const FAILED_CACHE_KEY = 'failed';

    private const MONITOR_CACHE_KEY = 'monitor';

    private const MONITOR_DELETE_CACHE_KEY = 'monitor_delete';

    private const COUNT_CACHE_KEYS = [
        self::PRO_CACHE_KEY,
        self::BASIC_CACHE_KEY,
        self::FAILED_CACHE_KEY,
        self::SKIPPED_CACHE_KEY,
        self::MONITOR_CACHE_KEY,
        self::MONITOR_DELETE_CACHE_KEY,
    ];

    public function __construct(
        readonly public User $user,
        readonly public bool $isDryRun = false,
        readonly public bool $skipRefresh = false,
        readonly public int $createdAfter = 0,
    ) {}

    public function handle(AdminberApi $adminberApi): void
    {
        if ($this->batch() && $this->batch()->cancelled()) {
            // Skip execution if the batch has been cancelled...
            Log::channel('queue')->info('Batch cancelled. Not migrating site type', ['user' => $this->user->id]);
            return;
        }

        if (!$this->skipRefresh && !$this->user->hasValidProSiteUsage()) {
            $refreshed = $adminberApi->refreshUser($this->user->username);

            if (!$refreshed) {
                throw new Exception('User account could not be refreshed.');
            }
        }

        $quotas = $this->user->quotas()->whereIn('type', [QuotaType::SyncPaid, QuotaType::SyncFree])->get();
        $paid = $quotas->where('type', QuotaType::SyncPaid)->first();
        $free = $quotas->where('type', QuotaType::SyncFree)->first();
        $hasExpired = !$paid || $paid->expires_at < Carbon::now();

        if ((!$paid || $hasExpired) && $free?->quota < 1) {
            Log::channel('queue')->info(
                '[UpgradeSiteType] Skipping migration for user {user}. No free quota and pro quota expired: {expired}',
                [
                    'user' => $this->user->id,
                    'expired' => $paid?->expires_at,
                ]
            );

            $this->increment(self::SKIPPED_CACHE_KEY);

            return;
        }

        $monitorCount = SiteMonitor::query()
            ->join('sites', 'sites.id', '=', 'site_monitor.id')
            ->where('sites.user_id', '=', $this->user->id)
            ->count();

        $this->increment(self::MONITOR_CACHE_KEY, $monitorCount);

        $sitesQuery = $this->user
            ->sites()
            ->with('detailsCache:id,update_timestamp')
            ->orderBy('create_timestamp', 'asc');

        if ($this->createdAfter) {
            $sitesQuery->where('sites.create_timestamp', '>', $this->createdAfter);
        }

        $sites = $sitesQuery->get();

        $proQuota = $hasExpired ? 0 : $paid->quota;
        $proSites = $sites->slice(0, $proQuota);
        $proSiteCount = $proSites->count();
        $basicSites = $sites->slice($proQuota);
        $basicSitesCount = $basicSites->count();

        $monitorDeleteCount = SiteMonitor::query()
            ->join('sites', 'sites.id', '=', 'site_monitor.id')
            ->where('sites.user_id', '=', $this->user->id)
            ->whereIn('site_monitor.id', $basicSites->pluck('id')->toArray())
            ->count();

        $this->increment(self::PRO_CACHE_KEY, $proSiteCount);
        $this->increment(self::BASIC_CACHE_KEY, $basicSitesCount);
        $this->increment(self::MONITOR_DELETE_CACHE_KEY, $monitorDeleteCount);

        if ($this->isDryRun) {
            return;
        }

        DB::transaction(function () use ($hasExpired, $proSites, $basicSites) {
            foreach ($proSites as $proSite) {
                $proSite->type = SiteType::Pro;
                $proSite->saveQuietly();
            }

            foreach ($basicSites as $basicSite) {
                $basicSite->type = SiteType::Basic;
                $basicSite->saveQuietly();
            }

            if (!$hasExpired) {
                $this->user->schedules()->update([
                    'schedule->actionData->isWhiteLabel' => true,
                ]);

                $this->user->reportLinks()->update([
                    'report_data->isWhiteLabel' => true,
                ]);
            } else {
                $this->user->schedules()->update([
                    'schedule->actionData->isWhiteLabel' => false,
                ]);

                $this->user->reportLinks()->update([
                    'report_data->isWhiteLabel' => false,
                ]);
            }
        });
    }

    /**
     * Get the middleware the job should pass through.
     *
     * @return array<int, object>
     */
    public function middleware(): array
    {
        if ($this->skipRefresh) {
            return [];
        }

        return [new RateLimited('adminber')];
    }

    /**
     * Determine the time at which the job should timeout.
     */
    public function retryUntil(): DateTime
    {
        return now()->addMinutes(10);
    }

    public function failed(Exception $exception)
    {
        Log::channel('queue')->error('[UpgradeSiteType] Migration failed for user: {exception}', [
            'user' => $this->user,
            'exception' => $exception,
        ]);

        $this->increment(self::FAILED_CACHE_KEY);
    }

    public static function resetCounts(): void
    {
        Cache::setMultiple(
            collect(self::COUNT_CACHE_KEYS)->reduce(function (array $carry, string $key) {
                $carry[self::CACHE_PREFIX . ':' . $key] = 0;
                return $carry;
            }, []),
        );
    }

    public static function getCounts(): array
    {
        return collect(self::COUNT_CACHE_KEYS)->reduce(function (array $carry, string $key) {
            $carry[$key] = Cache::get(self::CACHE_PREFIX . ':' . $key, 0);
            return $carry;
        }, []);
    }

    private function increment($key, int $value = 1): void
    {
        Cache::increment(self::CACHE_PREFIX . ':' . $key, $value);
    }
}
