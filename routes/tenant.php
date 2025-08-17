<?php

declare(strict_types=1);
use Inertia\Inertia;

use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;
use App\Http\Controllers\Tenant\DashboardController as TenantDashboardController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\Member\AuthController;
use App\Http\Controllers\Member\DashboardController;
use App\Http\Controllers\Member\PostController;


/*
|--------------------------------------------------------------------------
| Tenant Routes
|--------------------------------------------------------------------------
|
| Here you can register the tenant routes for your application.
| These routes are loaded by the TenantRouteServiceProvider.
|
| Feel free to customize them however you want. Good luck!
|
*/

Route::middleware([
    'web',
    InitializeTenancyByDomain::class,
    PreventAccessFromCentralDomains::class,
])->group(function () {

    Route::middleware(['auth', 'verified'])->group(function () {

        Route::get('/', [TenantDashboardController::class, 'dashboard'])->name('home');
        Route::get('/dashboard', [TenantDashboardController::class, 'dashboard'])->name('dashboard');
        Route::resource('members', MemberController::class)->except(['show']);

    });


    // Member Routes
    Route::prefix('member')->group(function () {

        // Authentication
        Route::get('login', [AuthController::class, 'create'])->name('member.login')->middleware("guest.member");
        Route::post('login', [AuthController::class, 'store'])->middleware("guest.member");
        Route::post('logout', [AuthController::class, 'destroy'])->name('member.logout')->middleware("auth:member");
        
        // Protected Routes
        Route::middleware('auth:member')->group(function () {

            Route::get('/', function () {
                return Inertia::render('Member/Dashboard');
            })->name('member.home');

            Route::get('/dashboard', [DashboardController::class, 'index'])->name('member.dashboard');

            // Posts routes
            Route::resource('posts', PostController::class, [
                'names' => [
                    'index' => 'member.posts.index',
                    'create' => 'member.posts.create',
                    'store' => 'member.posts.store',
                    'show' => 'member.posts.show',
                    'edit' => 'member.posts.edit',
                    'update' => 'member.posts.update',
                    'destroy' => 'member.posts.destroy',
                ]
            ]);
        });

    });


});


