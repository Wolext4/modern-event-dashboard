<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'theme' => 'system',
            'api_token' => Str::random(80),
        ]);

        return response()->json(['user' => $user, 'token' => $user->api_token]);
    }

    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user->api_token = Str::random(80);
        $user->save();

        return response()->json(['user' => $user, 'token' => $user->api_token]);
    }

    public function logout(Request $request): JsonResponse
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['message' => 'Token missing'], 400);
        }

        $user = User::where('api_token', $token)->first();

        if ($user) {
            $user->api_token = null;
            $user->save();
        }

        return response()->json(['message' => 'Logged out']);
    }

    public function me(Request $request): JsonResponse
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['message' => 'Token missing'], 401);
        }

        $user = User::where('api_token', $token)->first();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return response()->json(['user' => $user]);
    }
}
