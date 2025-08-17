<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Central\TenantController;

use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;


use App\Http\Controllers\MemberController;


Route::middleware(['universal', InitializeTenancyByDomain::class])->group(function () {

    Route::middleware(['auth', 'verified'])->group(function () {


    });

    require __DIR__.'/settings.php';
    require __DIR__.'/auth.php';

});




// Central Routes
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/', function () {
        return Inertia::render('dashboard');
    })->name('home');

    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('central')->group(function () {
        Route::resource('tenants', TenantController::class);
    });

});

                                                                                         





