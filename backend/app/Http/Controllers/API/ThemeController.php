<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ThemeController extends Controller
{
    public function show(Request $request)
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
            "message" => "Theme retrieved successfully",
            "data" => [
                "theme" => $user->theme ?? 'system'
            ]
        ]);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                "status" => 0,
                "message" => "Unauthorized",
            ], 401);
        }

        $validator = Validator::make($request->all(), [
            'theme' => 'required|in:light,dark,system',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => 0,
                "message" => "Validation failed",
                "data" => $validator->errors()->all(),
            ], 422);
        }

        $user->theme = $request->theme;
        $user->save();

        return response()->json([
            "status" => 1,
            "message" => "Theme updated successfully",
            "data" => [
                "theme" => $user->theme
            ]
        ]);
    }
}