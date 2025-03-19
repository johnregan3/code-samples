<?php

namespace Functional\Migrations;

use App\Apis\AdminberApi;
use App\Enums\QuotaType;
use App\Enums\SiteType;
use App\Jobs\Migrations\UpgradeSiteType;
use App\Models\Site;
use App\Models\User;
use App\Models\UserQuota;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use Tests\Support\FunctionalTester;

class UpdateSiteTypeCest
{
    public const ADMINBER_API_URL = 'adminber-dev.solidwp.com/mpapi';

    protected User $user;

    protected $sites;

    public function _before(FunctionalTester $I)
    {
        $this->user = $I->have(User::class);
    }

    public function tryUpgradeSiteTypeMixed(FunctionalTester $I)
    {
        Http::fake([
            self::ADMINBER_API_URL . '/*' => Http::response(
                $this->getResponseDataSyncProQuota(),
                200
            ),
        ]);

        $I->haveMultiple(
            Site::class,
            20,
            [
                'user_id' => $this->user->id,
                'type' => SiteType::Basic,
            ],
        );

        $adminber = $I->grabService(AdminberApi::class);

        (new UpgradeSiteType($this->user))->handle($adminber);

        $I->seeNumRecords(
            5,
            Site::class,
            [
                'user_id' => $this->user->id,
                'type' => SiteType::Pro,
            ]
        );
        $I->seeNumRecords(
            15,
            Site::class,
            [
                'user_id' => $this->user->id,
                'type' => SiteType::Basic,
            ]
        );
    }

    public function tryUpgradeSiteTypeMixedWithPreviousPro(FunctionalTester $I)
    {
        Http::fake([
            self::ADMINBER_API_URL . '/*' => Http::response(
                $this->getResponseDataSyncProQuota(),
                200
            ),
        ]);

        $I->haveMultiple(
            Site::class,
            4,
            [
                'user_id' => $this->user->id,
                'type' => SiteType::Pro,
                'create_timestamp' => Carbon::now()->subDays(5)->timestamp,
            ],
        );

        $I->haveMultiple(
            Site::class,
            16,
            [
                'user_id' => $this->user->id,
                'type' => SiteType::Basic,
            ],
        );

        $adminber = $I->grabService(AdminberApi::class);

        (new UpgradeSiteType($this->user))->handle($adminber);

        $I->seeNumRecords(
            5,
            Site::class,
            [
                'user_id' => $this->user->id,
                'type' => SiteType::Pro,
            ]
        );
        $I->seeNumRecords(
            15,
            Site::class,
            [
                'user_id' => $this->user->id,
                'type' => SiteType::Basic,
            ]
        );
    }

    public function tryUpgradeSiteTypeBelowProQuota(FunctionalTester $I)
    {
        Http::fake([
            self::ADMINBER_API_URL . '/*' => Http::response(
                $this->getResponseDataSyncProQuota(),
                200
            ),
        ]);

        $I->haveMultiple(
            Site::class,
            4,
            [
                'user_id' => $this->user->id,
                'type' => SiteType::Basic,
            ],
        );

        $adminber = $I->grabService(AdminberApi::class);

        (new UpgradeSiteType($this->user))->handle($adminber);

        $I->dontSeeRecord(
            Site::class,
            [
                'user_id' => $this->user->id,
                'type' => SiteType::Basic,
            ],
        );
        $I->dontSeeRecord(
            Site::class,
            [
                'user_id' => $this->user->id,
                'type' => SiteType::Basic,
            ],
        );
        $I->seeNumRecords(
            4,
            Site::class,
            [
                'user_id' => $this->user->id,
                'type' => SiteType::Pro,
            ],
        );
    }

    public function tryUpgradeSiteTypeOnlyFree(FunctionalTester $I)
    {
        Http::fake([
            self::ADMINBER_API_URL . '/*' => Http::response(
                $this->getResponseDataSyncFreeOnlyQuota(),
                200
            ),
        ]);

        $I->haveMultiple(
            Site::class,
            20,
            [
                'user_id' => $this->user->id,
                'type' => SiteType::Basic,
            ],
        );

        $adminber = $I->grabService(AdminberApi::class);

        (new UpgradeSiteType($this->user))->handle($adminber);

        $I->dontSeeRecord(
            Site::class,
            [
                'user_id' => $this->user->id,
                'type' => SiteType::Pro,
            ]
        );
        $I->seeNumRecords(
            20,
            Site::class,
            [
                'user_id' => $this->user->id,
                'type' => SiteType::Basic,
            ]
        );
    }

    public function tryUpgradeSiteTypeExpiredProQuota(FunctionalTester $I)
    {
        Http::fake([
            self::ADMINBER_API_URL . '/*' => Http::response(
                $this->getResponseDataExpiredSyncProQuota(),
                200
            ),
        ]);

        $I->haveMultiple(
            Site::class,
            20,
            [
                'user_id' => $this->user->id,
                'type' => SiteType::Basic,
            ],
        );

        $adminber = $I->grabService(AdminberApi::class);

        (new UpgradeSiteType($this->user))->handle($adminber);

        $I->dontSeeRecord(
            Site::class,
            [
                'user_id' => $this->user->id,
                'type' => SiteType::Pro,
            ]
        );
        $I->seeNumRecords(
            20,
            Site::class,
            [
                'user_id' => $this->user->id,
                'type' => SiteType::Basic,
            ]
        );
    }

    public function tryDryRun(FunctionalTester $I)
    {
        Http::fake([
            self::ADMINBER_API_URL . '/*' => Http::response(
                $this->getResponseDataSyncProQuota(),
                200
            ),
        ]);

        $I->haveMultiple(
            Site::class,
            5,
            [
                'user_id' => $this->user->id,
                'type' => SiteType::Basic,
            ],
        );

        $adminber = $I->grabService(AdminberApi::class);

        (new UpgradeSiteType(user: $this->user, isDryRun: true))->handle($adminber);

        $I->seeNumRecords(
            5,
            Site::class,
            [
                'user_id' => $this->user->id,
                'type' => SiteType::Basic,
            ]
        );
    }

    public function trySkipRefreshWithValidQuota(FunctionalTester $I)
    {
        Http::preventStrayRequests();

        $I->haveMultiple(
            Site::class,
            5,
            [
                'user_id' => $this->user->id,
                'type' => SiteType::Basic,
            ],
        );

        $I->have(UserQuota::class, [
            'user_id' => $this->user->id,
            'type' => QuotaType::SyncPaid,
            'quota' => 5,
            'expires_at' => Carbon::now()->addDay(),
        ]);

        $adminber = $I->grabService(AdminberApi::class);

        (new UpgradeSiteType(user: $this->user, skipRefresh: true))->handle($adminber);

        $I->seeNumRecords(
            5,
            Site::class,
            [
                'user_id' => $this->user->id,
                'type' => SiteType::Pro,
            ]
        );
    }

    public function trySkipRefreshWithInvalidQuota(FunctionalTester $I)
    {
        Http::preventStrayRequests();

        $I->haveMultiple(
            Site::class,
            5,
            [
                'user_id' => $this->user->id,
                'type' => SiteType::Basic,
            ],
        );

        $I->have(UserQuota::class, [
            'user_id' => $this->user->id,
            'type' => QuotaType::SyncPaid,
            'quota' => 5,
            'expires_at' => Carbon::now()->subDay(),
        ]);

        $adminber = $I->grabService(AdminberApi::class);

        (new UpgradeSiteType(user: $this->user, skipRefresh: true))->handle($adminber);

        $I->seeNumRecords(
            5,
            Site::class,
            [
                'user_id' => $this->user->id,
                'type' => SiteType::Basic,
            ]
        );
    }

    public function trySkipRefreshWithoutQuota(FunctionalTester $I)
    {
        Http::preventStrayRequests();

        $I->haveMultiple(
            Site::class,
            5,
            [
                'user_id' => $this->user->id,
                'type' => SiteType::Basic,
            ],
        );

        $adminber = $I->grabService(AdminberApi::class);

        (new UpgradeSiteType(user: $this->user, skipRefresh: true))->handle($adminber);

        $I->seeNumRecords(
            5,
            Site::class,
            [
                'user_id' => $this->user->id,
                'type' => SiteType::Basic,
            ]
        );
    }

    private function getResponseDataSyncProQuota(): array
    {
        $data = $this->getAdminberData('account-by-username-for-sync/solidwpdemo-with-mixed-sync-quota.json');
        $data['quota_sync'] = [
            ...$data['quota_sync'],
            'quota' => [
                'free' => 10,
                'paid' => 5,
                'total' => 15,
            ],
        ];

        return $data;
    }

    private function getResponseDataExpiredSyncProQuota(): array
    {
        $data = $this->getAdminberData('account-by-username-for-sync/solidwpdemo-with-mixed-sync-quota.json');
        $expires = '2020-01-01';
        $data['quota_sync'] = [
            ...$data['quota_sync'],
            'expires' => $expires,
            'expires_timestamp' => strtotime($expires),
        ];

        return $data;
    }

    private function getResponseDataSyncFreeOnlyQuota(): array
    {
        $data = $this->getAdminberData('account-by-username-for-sync/solidwpdemo-with-mixed-sync-quota.json');
        $data['quota_sync'] = [
            ...$data['quota_sync'],
            'quota' => [
                'free' => 10,
                'paid' => 0,
                'total' => 10,
            ],
        ];

        return $data;
    }

    private function getAdminberData(string $path): array
    {
        $data = json_decode(file_get_contents(codecept_data_dir('adminber/' . $path)), true);
        $data['profile'] = [
            ...$data['profile'],
            'id' => $this->user->id,
            'username' => $this->user->username,
            'email' => $this->user->email,
            'firstname' => $this->user->firstname,
            'lastname' => $this->user->lastname,
            'user_id' => $this->user->id,
            'member_id' => $this->user->id,
        ];

        return $data;
    }
}
