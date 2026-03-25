<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\FormData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FormDataController extends Controller
{
    /**
     * Save form data
     */
    public function save(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                "status" => 0,
                "message" => "Unauthorized",
            ], 401);
        }

        $validator = Validator::make($request->all(), [
            'page' => 'required|string|max:255',
            'form_key' => 'required|string|max:255',
            'form_data' => 'required|array',
            'is_completed' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => 0,
                "message" => "Validation failed",
                "data" => $validator->errors()->all(),
            ], 422);
        }

        try {
            $formData = FormData::saveFormData(
                $user->id,
                $request->page,
                $request->form_key,
                $request->form_data,
                $request->is_completed ?? false
            );

            return response()->json([
                "status" => 1,
                "message" => "Form data saved successfully",
                "data" => [
                    "id" => $formData->id,
                    "last_updated" => $formData->last_updated
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => 0,
                "message" => "Failed to save form data",
            ], 500);
        }
    }

    /**
     * Get form data
     */
    public function get(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                "status" => 0,
                "message" => "Unauthorized",
            ], 401);
        }

        $validator = Validator::make($request->all(), [
            'page' => 'required|string|max:255',
            'form_key' => 'nullable|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => 0,
                "message" => "Validation failed",
                "data" => $validator->errors()->all(),
            ], 422);
        }

        try {
            if ($request->has('form_key')) {
                // Get specific form data
                $formData = FormData::getFormData(
                    $user->id,
                    $request->page,
                    $request->form_key
                );

                return response()->json([
                    "status" => 1,
                    "message" => "Form data retrieved successfully",
                    "data" => $formData ?? []
                ]);
            } else {
                // Get all form data for the page
                $pageData = FormData::getPageFormData(
                    $user->id,
                    $request->page
                );

                return response()->json([
                    "status" => 1,
                    "message" => "Page form data retrieved successfully",
                    "data" => $pageData
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                "status" => 0,
                "message" => "Failed to retrieve form data",
            ], 500);
        }
    }

    /**
     * Delete form data
     */
    public function delete(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                "status" => 0,
                "message" => "Unauthorized",
            ], 401);
        }

        $validator = Validator::make($request->all(), [
            'page' => 'required|string|max:255',
            'form_key' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => 0,
                "message" => "Validation failed",
                "data" => $validator->errors()->all(),
            ], 422);
        }

        try {
            $deleted = FormData::where('user_id', $user->id)
                ->where('page', $request->page)
                ->where('form_key', $request->form_key)
                ->delete();

            return response()->json([
                "status" => 1,
                "message" => "Form data deleted successfully",
                "data" => [
                    "deleted" => $deleted > 0
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => 0,
                "message" => "Failed to delete form data",
            ], 500);
        }
    }
}
