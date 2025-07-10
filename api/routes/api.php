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
        // Woojs
        Route::get('/woojs/trash', [WoojController::class, 'trash']);
        Route::delete('/woojs/trash', [WoojController::class, 'destroyTrashed']);
        Route::put('/woojs/{wooj}/restore', [WoojController::class, 'restore'])->withTrashed();
        Route::get('/woojs/pinned', [WoojController::class, 'pinned']);
        Route::put('/woojs/{wooj}/pin', [WoojController::class, 'pin']);
        Route::put('/woojs/{wooj}/unpin', [WoojController::class, 'unpin']);
        Route::apiResource('/woojs', WoojController::class);

        // Topics
        Route::put('/topics/all/sort', [TopicController::class, 'sortAll']);
        Route::put('/topics/pinned/sort', [TopicController::class, 'sortPinned']);
        Route::put('/topics/public/sort', [TopicController::class, 'sortPublic']);
        Route::put('/topics/{topic}/sort', [TopicController::class, 'sort']);
        Route::apiResource('/topics', TopicController::class);

        // Auth
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});
