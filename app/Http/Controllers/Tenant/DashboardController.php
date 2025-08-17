<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Member;

class DashboardController extends Controller
{
    public function index()
    {
        if (!tenant()) {
            return redirect('/');
        }

        return inertia('Tenant/Welcome', [
            'tenant' => tenant(),
        ]);
    }

    public function dashboard()
    {
       
        $stats = [
            'users_count' => Member::count(),
            'tenant_info' => tenant(),
            'plan' => tenant('plan'),
        ];

        return inertia('Tenant/Dashboard', [
            'stats' => $stats,
        ]);
    }
}