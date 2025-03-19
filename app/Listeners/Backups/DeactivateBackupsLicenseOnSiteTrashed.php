<?php

namespace App\Listeners\Backups;

use App\Events\ProductLicenseRemoved;
use App\Events\Sites\SiteTrashed;
use App\Models\Site;
use App\SiteRequests\SiteRequest as LegacySiteRequest;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DeactivateBackupsLicenseOnSiteTrashed
{
    public function handle(SiteTrashed $event): void
    {
        if (!$event->site->user) {
            Log::channel('backups')->alert(
                'Could not deactivate solid-backups license on SolidWP API, user not found for site: {site}',
                [
                    'site' => $event->site->id,
                ]
            );

            return;
        }

        $response = $this->deactivateLicenseRequest($event->site);

        if (!isset($response['deactivate']['solid-backups'])) {
            Log::channel('backups')->alert(
                'Could not deactivate solid-backups license on SolidWP API for site: {site}',
                [
                    'site' => $event->site->id,
                ]
            );

            return;
        }

        $siteRequest = new LegacySiteRequest($event->site);

        $siteRequest->execute('manage-ithemes-licenses', [
            'set' => [
                'solid-backups' => $response['deactivate']['solid-backups'],
            ],
        ]);

        if (!$siteRequest->wasSuccessful()) {
            Log::channel('backups')->alert(
                'Could not deactivate solid-backups license on site: {site}',
                [
                    'site' => $event->site->id,
                ]
            );

            return;
        }

        ProductLicenseRemoved::dispatch($event->site, 'solid-backups');
    }

    private function deactivateLicenseRequest(Site $site)
    {
        $endpoint = config('services.ithemes_api.url') . '/sync/license-keys';

        $params = [
            'user' => $site->user->username,
            'site' => $site->url,
            'packages' => ['deactivate' => ['solid-backups']],
        ];

        return Http::asForm()->withOptions([
            'log' => [
                'redactions' => [
                    'request' => ['apikey'],
                ],
            ],
        ])->post(
            $endpoint,
            [
                'apikey' => config('services.ithemes_api.key'),
                'request' => json_encode($params),
            ]
        )->json();
    }
}
