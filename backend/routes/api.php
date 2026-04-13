<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ThemeController;
use App\Http\Controllers\API\FormDataController;
use App\Http\Controllers\API\FormSubmissionController;

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

    // Form submission routes (protected)
    Route::post('/form-submissions', [FormSubmissionController::class, 'submit']);
    Route::get('/form-submissions', [FormSubmissionController::class, 'getUserSubmissions']);
    Route::get('/form-submissions/type/{formType}', [FormSubmissionController::class, 'getSubmissionsByType']);
    Route::get('/form-submissions/summary', [FormSubmissionController::class, 'getSummary']);
    Route::get('/form-submissions/{id}', [FormSubmissionController::class, 'show']);
    Route::delete('/form-submissions/{id}', [FormSubmissionController::class, 'destroy']);
});