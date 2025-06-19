<?php

// use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DefaultController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\WoojController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::middleware(['throttle:api'])->group(function () {
    Route::get('/', [DefaultController::class, 'index']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::apiResource('/woojs', WoojController::class);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});
