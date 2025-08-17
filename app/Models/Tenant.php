<?php

namespace App\Models;

use Stancl\Tenancy\Database\Models\Tenant as BaseTenant;
use Stancl\Tenancy\Contracts\TenantWithDatabase;
use Stancl\Tenancy\Database\Concerns\HasDatabase;
use Stancl\Tenancy\Database\Concerns\HasDomains;

class Tenant extends BaseTenant implements TenantWithDatabase
{
    use HasDatabase, HasDomains;

    protected $fillable = [
        'id',
        'name',
        'email',
        'plan',
        'data',
    ];

    protected $casts = [
        'data' => 'array',
    ];

    public static function getCustomColumns(): array
    {
        return [
            'id',
            'name',
            'email',
            'plan',
            'data',
        ];
    }



    public function getIncrementing()
    {
        return false;
    }

    public function getKeyType()
    {
        return 'string';
    }

    public function getSetting($key, $default = null)
    {
        return data_get($this->data, "settings.{$key}", $default);
    }

    public function setSetting($key, $value)
    {
        $data = $this->data ?? [];
        data_set($data, "settings.{$key}", $value);
        $this->update(['data' => $data]);
    }

    public function hasFeature($feature)
    {
        $features = data_get($this->data, 'features', []);
        return in_array($feature, $features);
    }

    public function getMaxUsers()
    {
        return match ($this->plan) {
            'basic' => 10,
            'premium' => 50,
            'enterprise' => 999,
            default => 10,
        };
    }
}