<?php

namespace App\Events;

use App\Models\Site;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ProductLicenseAdded
{
    use Dispatchable;
    use SerializesModels;

    /**
     * Create a new event instance.
     *
     * @param Site   $site
     * @param string $packageSlug The Package slug.
     */
    public function __construct(
        public readonly Site $site,
        public readonly string $packageSlug = ''
    ) {}
}
