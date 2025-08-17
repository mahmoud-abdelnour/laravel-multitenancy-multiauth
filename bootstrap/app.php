<?php

use Illuminate\Foundation\Application;
use App\Http\Middleware\CheckSomething;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\RedirectIfAuthenticated;

use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;


return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up'
     
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);


        $middleware->alias([
            'guest.member' => RedirectIfAuthenticated::class,
            'auth' => \App\Http\Middleware\Authenticate::class, // Override default 'auth'
        ]);

        $middleware->group('universal', []);

    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
