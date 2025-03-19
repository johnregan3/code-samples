<?php

namespace App\Http\Resources;

use App\Enums\QuotaType;
use App\Models\BackupSetting;
use App\Models\UserQuota;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BackupSettingResource extends JsonResource
{
    /** @var BackupSetting */
    public $resource;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $quota = UserQuota::where('user_id', $this->resource->site->user_id)
            ->where('type', QuotaType::Backups)
            ->isValid()
            ->first();

        return [
            'site_id' => $this->resource->site_id,
            'retention' => (int) $this->resource->retention,
            'excluded_files' => $this->resource->excluded_files,
            'transfer_speed' => $this->resource->transfer_speed,
            'integrity_mode' => $this->resource->integrity_mode,
            'connection_status' => $this->resource->connection_status->value,
            'connection_error' => $this->resource->connection_error,
            'size' => $this->resource->size,
            'usage' => $this->resource->usage,
            'total_space_available' => $quota->quota ?? 0,
            'created_at' => $this->resource->created_at,
            'updated_at' => $this->resource->updated_at,
            'deleted_at' => $this->resource->deleted_at,
        ];
    }
}
