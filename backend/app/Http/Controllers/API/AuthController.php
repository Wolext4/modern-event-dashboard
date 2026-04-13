<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => "required",
            "email" => "required|email|unique:users,email",
            "password" => "required|string|min:8|confirmed",
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => 0,
                "message" => "Validation failed",
                "data" => $validator->errors()->all(),
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'theme' => 'system',
        ]);

        // Create initial form data for new user
        $user->formData()->create([
            'page' => 'user_status',
            'form_key' => 'is_new_user',
            'form_data' => ['is_new' => true],
            'is_completed' => false,
            'last_updated' => now()
        ]);

        // Sanctum personal access token with 1 hour expiration
        $token = $user->createToken('auth_token', ['*'], now()->addHours(1))->plainTextToken;

        return response()->json([
            "status" => 1,
            "message" => "User registered successfully",
            "data" => [
                "user" => $user,
                "token" => $token
            ]
        ]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "email" => "required|email",
            "password" => "required|string",
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => 0,
                "message" => "Validation failed",
                "data" => $validator->errors()->all(),
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                "status" => 0,
                "message" => "Invalid credentials",
            ], 401);
        }

        // Revoke previous tokens and issue fresh token with 1 hour expiration
        $user->tokens()->delete();
        $token = $user->createToken('auth_token', ['*'], now()->addHours(1))->plainTextToken;

        return response()->json([
            "status" => 1,
            "message" => "Login successful",
            "data" => [
                "user" => $user,
                "token" => $token
            ]
        ]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                "status" => 0,
                "message" => "Unauthorized",
            ], 401);
        }

        $token = $request->user()->currentAccessToken();
        if ($token) {
            $token->delete();
        }

        return response()->json([
            "status" => 1,
            "message" => "Logged out successfully",
        ]);
    }

    public function me(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                "status" => 0,
                "message" => "Unauthorized",
            ], 401);
        }

        return response()->json([
            "status" => 1,
            "message" => "User data retrieved successfully",
            "data" => $user
        ]);
    }
}
