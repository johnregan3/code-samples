<?php

namespace App\Enums;

enum TimelineType: string
{
    case None = '';

    // Software timeline types
    case SoftwareInstall = 'software.install';
    case SoftwareUninstall = 'software.uninstall';
    case SoftwareActivate = 'software.activate';
    case SoftwareDeactivate = 'software.deactivate';
    case SoftwareUpdate = 'software.update';

    // Site timeline types
    case SiteConnect = 'site.connect';
    case SiteDelete = 'site.delete';

    // Backups timeline types
    case BackupCreate = 'backup.create';
    case BackupRestore = 'backup.restore';

    // Vulnerability timeline types
    case VulnerabilityResolve = 'vulnerability.resolve';
    case VulnerabilityUnmute = 'vulnerability.unmute';
    case VulnerabilityFound = 'vulnerability.found';
    case VulnerabilityScan = 'vulnerability.scan';

    // Deployment timeline types
    case Deployment = 'deployment';
    case Migration = 'migration';

    /**
     * Some Timeline Items run a series of Site Actions / Jobs in a chain. When this
     * is the case, each Job in the chain should not be run until the previous Job
     * in the chain has completed _and_ the Site Action has been fulfilled.
     *
     * If so, any Jobs associated with this Timeline Item will be automatically
     * released back onto the Queue, if their preceding Site Actions have not been
     * fulfilled.
     *
     * @return bool True if this Timeline Item uses this chaining feature.
     */
    public function isChained(): bool
    {
        return match ($this) {
            self::Deployment => true,
            default => false,
        };
    }
}
