<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                "status" => 0,
                "message" => "Unauthorized",
            ], 401);
        }

        $events = Event::where('user_id', $user->id)->get();

        return response()->json([
            "status" => 1,
            "message" => "Events retrieved successfully",
            "data" => $events
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                "status" => 0,
                "message" => "Unauthorized",
            ], 401);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'location' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:Planning,Confirmed,Cancelled,Completed',
            'type' => 'nullable|string|max:255',
            'expected_attendees' => 'integer|min:0',
            'additional_data' => 'nullable|array'
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => 0,
                "message" => "Validation failed",
                "data" => $validator->errors()->all(),
            ], 422);
        }

        try {
            $event = Event::create([
                'user_id' => $user->id,
                ...$request->only([
                    'name', 'start_date', 'end_date', 'location', 'description',
                    'status', 'type', 'expected_attendees', 'additional_data'
                ])
            ]);

            return response()->json([
                "status" => 1,
                "message" => "Event created successfully",
                "data" => $event
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                "status" => 0,
                "message" => "Failed to create event",
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                "status" => 0,
                "message" => "Unauthorized",
            ], 401);
        }

        $event = Event::where('user_id', $user->id)->find($id);

        if (!$event) {
            return response()->json([
                "status" => 0,
                "message" => "Event not found",
            ], 404);
        }

        return response()->json([
            "status" => 1,
            "message" => "Event retrieved successfully",
            "data" => $event
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                "status" => 0,
                "message" => "Unauthorized",
            ], 401);
        }

        $event = Event::where('user_id', $user->id)->find($id);

        if (!$event) {
            return response()->json([
                "status" => 0,
                "message" => "Event not found",
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'start_date' => 'date',
            'end_date' => 'nullable|date',
            'location' => 'string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:Planning,Confirmed,Cancelled,Completed',
            'type' => 'nullable|string|max:255',
            'expected_attendees' => 'integer|min:0',
            'tickets_sold' => 'integer|min:0',
            'revenue' => 'numeric|min:0',
            'additional_data' => 'nullable|array'
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => 0,
                "message" => "Validation failed",
                "data" => $validator->errors()->all(),
            ], 422);
        }

        try {
            $event->update($request->only([
                'name', 'start_date', 'end_date', 'location', 'description',
                'status', 'type', 'expected_attendees', 'tickets_sold', 'revenue', 'additional_data'
            ]));

            return response()->json([
                "status" => 1,
                "message" => "Event updated successfully",
                "data" => $event
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => 0,
                "message" => "Failed to update event",
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                "status" => 0,
                "message" => "Unauthorized",
            ], 401);
        }

        $event = Event::where('user_id', $user->id)->find($id);

        if (!$event) {
            return response()->json([
                "status" => 0,
                "message" => "Event not found",
            ], 404);
        }

        try {
            $event->delete();

            return response()->json([
                "status" => 1,
                "message" => "Event deleted successfully",
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => 0,
                "message" => "Failed to delete event",
            ], 500);
        }
    }
}
