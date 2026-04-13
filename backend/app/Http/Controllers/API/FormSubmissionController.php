<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\FormSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FormSubmissionController extends Controller
{
    /**
     * Log a form submission
     */
    public function submit(Request $request)
    {
        try {
            $validated = $request->validate([
                'form_type' => 'required|string|max:50',
                'form_name' => 'required|string|max:100',
                'submitted_data' => 'required|array',
            ]);

            $user = Auth::user();

            $submission = FormSubmission::create([
                'user_id' => $user?->id,
                'form_type' => $validated['form_type'],
                'form_name' => $validated['form_name'],
                'submitted_data' => $validated['submitted_data'],
                'status' => 'completed',
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            return response()->json([
                'status' => 1,
                'message' => 'Form submission logged successfully',
                'data' => $submission,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 0,
                'message' => 'Failed to log form submission',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Get all submissions for authenticated user
     */
    public function getUserSubmissions(Request $request)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json([
                    'status' => 0,
                    'message' => 'Unauthorized',
                ], 401);
            }

            $submissions = FormSubmission::getByUser($user->id)->paginate(50);

            return response()->json([
                'status' => 1,
                'message' => 'User submissions retrieved successfully',
                'data' => $submissions,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 0,
                'message' => 'Failed to retrieve submissions',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Get submissions by form type for authenticated user
     */
    public function getSubmissionsByType(Request $request, string $formType)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json([
                    'status' => 0,
                    'message' => 'Unauthorized',
                ], 401);
            }

            $submissions = FormSubmission::getByFormType($formType, $user->id)->paginate(50);

            return response()->json([
                'status' => 1,
                'message' => 'Submissions retrieved successfully',
                'data' => $submissions,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 0,
                'message' => 'Failed to retrieve submissions',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Get submission summary for authenticated user
     */
    public function getSummary(Request $request)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json([
                    'status' => 0,
                    'message' => 'Unauthorized',
                ], 401);
            }

            $summary = FormSubmission::getSummary($user->id);

            return response()->json([
                'status' => 1,
                'message' => 'Summary retrieved successfully',
                'data' => $summary,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 0,
                'message' => 'Failed to retrieve summary',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Get a specific submission
     */
    public function show(Request $request, int $id)
    {
        try {
            $user = Auth::user();

            $submission = FormSubmission::findOrFail($id);

            // Ensure user can only view their own submissions
            if ($submission->user_id !== $user?->id) {
                return response()->json([
                    'status' => 0,
                    'message' => 'Unauthorized',
                ], 403);
            }

            return response()->json([
                'status' => 1,
                'message' => 'Submission retrieved successfully',
                'data' => $submission,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 0,
                'message' => 'Failed to retrieve submission',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Delete a submission
     */
    public function destroy(Request $request, int $id)
    {
        try {
            $user = Auth::user();

            $submission = FormSubmission::findOrFail($id);

            // Ensure user can only delete their own submissions
            if ($submission->user_id !== $user?->id) {
                return response()->json([
                    'status' => 0,
                    'message' => 'Unauthorized',
                ], 403);
            }

            $submission->delete();

            return response()->json([
                'status' => 1,
                'message' => 'Submission deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 0,
                'message' => 'Failed to delete submission',
                'error' => $e->getMessage(),
            ], 400);
        }
    }
}
