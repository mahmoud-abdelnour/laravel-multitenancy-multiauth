<?php

namespace App\Console\Commands;

use App\Models\Tenant;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class CreateTenantCommand extends Command
{
    protected $signature = 'tenant:create {name} {email} {domain} {--plan=basic}';
    protected $description = 'Create a new tenant';

    public function handle()
    {
        $tenant = Tenant::create([
            'id' => Str::uuid(),
            'name' => $this->argument('name'),
            'email' => $this->argument('email'),
            'plan' => $this->option('plan'),
        ]);

        $tenant->domains()->create([
            'domain' => $this->argument('domain'),
        ]);

        $this->info("Tenant created successfully!");
        $this->info("ID: {$tenant->id}");
        $this->info("Domain: {$this->argument('domain')}");

        return 0;
    }
}