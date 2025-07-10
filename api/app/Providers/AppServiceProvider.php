<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
// use App\Services\UserService;

class AppServiceProvider extends ServiceProvider
{
    protected const int REQUEST_LIMIT = 60;

    /**
     * Register any application services.
     */
    public function register(): void {}

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request) {
            $key = $request->user()?->id ?: $request->ip();

            return Limit::perMinute(maxAttempts: self::REQUEST_LIMIT)
                ->by($key)
                ->response(function (Request $request, array $headers) {
                    $data = [
                        'message' => 'Too many attempts'
                    ];

                    return response()->json($data, 429, $headers);
                });
        });
    }
}
