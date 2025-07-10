<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Models\Topic;

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
        // Получить топик пользователя по типу или по ID
        Route::bind('topic', function (string|int $key) {
            $column = Topic::isTypeExists($key) ? 'type' : 'id';

            return Topic::where('author_id', Auth::user()->id)
                ->where($column, $key)
                ->firstOrFail();
        });
    }
}
