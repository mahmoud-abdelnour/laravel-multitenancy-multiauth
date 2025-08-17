<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
      /**
     * Handle an incoming request.
     */
    public function handle($request, Closure $next, ...$guards): Response
    {
        $this->authenticate($request, $guards);

        return $next($request);
    }

    /**
     * Get the path the user should be redirected to when not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        // Check if the request is for the member guard
        if ($request->is('member/*') || in_array('member', $request->route()->middleware()) || $request->is('member')) {
            return route('member.login');
        }


        // Default redirect for other guards (e.g., 'web')
        return route('login');
    }
}
