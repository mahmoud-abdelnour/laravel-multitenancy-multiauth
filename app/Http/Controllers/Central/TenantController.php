<?php

namespace App\Http\Controllers\Central;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use App\Models\Domain;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class TenantController extends Controller
{
    public function index()
    {
        $tenants = Tenant::with('domains')->paginate(10);
        
        return inertia('central/tenants/index', [
            'tenants' => $tenants,
        ]);
    }

    public function create()
    {
        return inertia('central/tenants/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:tenants',
            'domain' => 'required|string|unique:domains|regex:/^[a-zA-Z0-9-]+$/',
            'plan' => 'required|string|in:basic,premium,enterprise',
        ]);

        $tenant = Tenant::create([
            'id' => Str::uuid(),
            'name' => $request->name,
            'email' => $request->email,
            'plan' => $request->plan,
            'data' => [
                'created_by' => auth()->id(),
                'settings' => [
                    'max_users' => $request->plan === 'basic' ? 10 : ($request->plan === 'premium' ? 50 : 999),
                ]
            ]
        ]);

        $tenant->domains()->create([
            'domain' => $request->domain . '.' . config('app.url'),
        ]);

        
        $tenant->run(function () {
            if (class_exists('Database\Seeders\TenantSeeder')) {
                \Artisan::call('db:seed', [
                    '--database' => 'tenant',
                    '--class' => 'Database\Seeders\TenantSeeder',
                    '--force' => true,
                ]);
            }
        });


        return redirect()->route('tenants.index')->with('success', 'Tenant created successfully!');
    }

    public function show(Tenant $tenant)
    {
        return inertia('Central/Tenants/Show', [
            'tenant' => $tenant->load('domains'),
        ]);
    }

    public function edit(Tenant $tenant)
    {
        $tenant->load('domains');

        return inertia('central/tenants/edit', [
            'tenant' => $tenant,
            'tenant' => $tenant,
        ]);
    }

    public function update(Request $request, Tenant $tenant)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:tenants,email,' . $tenant->id,
            'plan' => 'required|string|in:basic,premium,enterprise',
        ]);

        $tenant->update([
            'name' => $request->name,
            'email' => $request->email,
            'plan' => $request->plan,
        ]);

        return redirect()->route('tenants.index')->with('success', 'Tenant updated successfully!');
    }

    public function destroy(Tenant $tenant)
    {
        $tenant->delete();
        
        return redirect()->route('tenants.index')->with('success', 'Tenant deleted successfully!');
    }
}