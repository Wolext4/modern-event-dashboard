<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ThemeController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/api/auth/register', [AuthController::class, 'register']);
Route::post('/api/auth/login', [AuthController::class, 'login']);
Route::post('/api/auth/logout', [AuthController::class, 'logout']);
Route::get('/api/auth/me', [AuthController::class, 'me']);

Route::get('/api/user/theme', [ThemeController::class, 'show']);
Route::post('/api/user/theme', [ThemeController::class, 'update']);
