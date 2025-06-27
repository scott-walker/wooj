<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;
use App\Models\Wooj;

class RouterServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Route::middleware()
        // Route::bind('trashed_wooj', function ($id) {
        //     return Wooj::onlyTrashed()->findOrFail($id);
        // });
    }
}
