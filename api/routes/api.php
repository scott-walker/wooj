<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\WoojController;
use App\Http\Controllers\TopicController;

Route::middleware(['throttle:api'])->group(function () {
    Route::get('/version', [IndexController::class, 'version']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('/woojs/trash', [WoojController::class, 'trash']);
        Route::delete('/woojs/trash', [WoojController::class, 'destroyTrashed']);
        Route::put('/woojs/{wooj}/restore', [WoojController::class, 'restore'])->withTrashed();
        Route::get('/woojs/likes', [WoojController::class, 'likes']);
        Route::put('/woojs/{wooj}/like', [WoojController::class, 'like']);
        Route::put('/woojs/{wooj}/dislike', [WoojController::class, 'dislike']);
        Route::apiResource('/woojs', WoojController::class);
        Route::apiResource('/topics', TopicController::class);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});
