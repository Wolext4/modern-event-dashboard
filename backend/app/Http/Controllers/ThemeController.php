<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ThemeController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $user = $request->user() ?? User::first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json(['theme' => $user->theme ?? 'system']);
    }

    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'theme' => 'required|in:light,dark,system',
        ]);

        $user = $request->user() ?? User::first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->theme = $validated['theme'];
        $user->save();

        return response()->json(['theme' => $user->theme]);
    }
}
