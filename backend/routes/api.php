<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ThemeController;
use App\Http\Controllers\API\FormDataController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Auth routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);

    // Theme routes (protected)
    Route::get('/user/theme', [ThemeController::class, 'show']);
    Route::post('/user/theme', [ThemeController::class, 'update']);

    // Form data routes (protected)
    Route::post('/form-data', [FormDataController::class, 'save']);
    Route::get('/form-data', [FormDataController::class, 'get']);
    Route::delete('/form-data', [FormDataController::class, 'delete']);
});