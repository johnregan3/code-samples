<?php

namespace App\Models;

use App\Enums\BackupConnectionStatus;
use App\Enums\BackupIntegrityMode;
use App\Enums\BackupTransferSpeed;
use App\Events\Backups\SettingForceDeleted;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * The backup setting model.
 *
 * @property int                    $id                The backup setting ID.
 * @property int                    $site_id           The site ID.
 * @property int                    $retention         The retention period.
 * @property array                  $excluded_files    The excluded files.
 * @property BackupTransferSpeed    $transfer_speed    The selected transfer speed.
 * @property BackupIntegrityMode    $integrity_mode    The selected integrity mode.
 * @property BackupConnectionStatus $connection_status The connection status.
 * @property string                 $connection_error  The error encountered while connecting to the site.
 * @property int                    $size              The estimated site size in bytes.
 * @property int                    $usage             The estimated site store usage in bytes.
 * @property array                  $last_notified_for When a user was last notified for particular events.
 * @property \Carbon\Carbon         $created_at        The created timestamp.
 * @property \Carbon\Carbon         $updated_at        The updated timestamp.
 * @property \Carbon\Carbon|null    $deleted_at        The date the model was soft deleted.
 */
class BackupSetting extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $casts = [
        'excluded_files' => 'array',
        'connection_status' => BackupConnectionStatus::class,
        'transfer_speed' => BackupTransferSpeed::class,
        'integrity_mode' => BackupIntegrityMode::class,
        'last_notified_for' => 'json',
    ];

    protected $fillable = [
        'site_id',
        'retention',
        'excluded_files',
        'transfer_speed',
        'integrity_mode',
        'connection_status',
        'connection_error',
        'size',
        'usage',
    ];

    protected $hidden = [
        // The frontend uses the `site_id` for identification.
        'id',
    ];

    protected $attributes = [
        'excluded_files' => '[]',
        'connection_status' => BackupConnectionStatus::Disconnected->value,
        'size' => 0,
        'usage' => 0,
        'last_notified_for' => '{}',
    ];

    /**
     * @var array<string, class-string>
     */
    protected $dispatchesEvents = [
        'forceDeleted' => SettingForceDeleted::class,
    ];

    public function site()
    {
        return $this->belongsTo(Site::class);
    }

    /**
     * Checks if the user was last notified about a specific connection status change.
     *
     * @param BackupConnectionStatus $status
     *
     * @return bool
     */
    public function wasLastNotifiedForConnectionStatus(BackupConnectionStatus $status): bool
    {
        return ($this->last_notified_for['connection_status']['status'] ?? '') === $status->value;
    }

    public function recordLastNotifiedForConnectionStatus(BackupConnectionStatus $status): void
    {
        $last_notified = $this->last_notified_for;
        $last_notified['connection_status']['status'] = $status->value;
        $this->last_notified_for = $last_notified;
    }
}
