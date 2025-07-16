<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WoojController;
use App\Http\Controllers\TopicController;

Route::middleware(['throttle:api'])->group(function () {
    Route::get('/version', [IndexController::class, 'version']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware(['auth:sanctum'])->group(function () {
        // Woojs
        Route::get('/woojs/trash', [WoojController::class, 'trash']);
        Route::delete('/woojs/trash', [WoojController::class, 'destroyTrashed']);
        Route::get('/woojs/pinned', [WoojController::class, 'pinned']);
        Route::get('/woojs/topic/{topic}', [WoojController::class, 'topic']);
        Route::put('/woojs/{wooj}/restore', [WoojController::class, 'restore'])->withTrashed();
        Route::put('/woojs/{wooj}/pin', [WoojController::class, 'pin']);
        Route::put('/woojs/{wooj}/unpin', [WoojController::class, 'unpin']);
        Route::put('/woojs/{wooj}/set-topics', [WoojController::class, 'setTopics']);
        Route::apiResource('/woojs', WoojController::class);

        // Topics
        Route::put('/topics/{topic}/sort', [TopicController::class, 'sort']);
        Route::apiResource('/topics', TopicController::class);

        // User
        // Route::get('/user/avatar/{file}', [UserController::class, 'avatar']);
        // Route::get('/user/avatar', [UserController::class, 'avatar']);
        Route::post('/user/avatar', [UserController::class, 'uploadAvatar']);

        // Auth
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});
