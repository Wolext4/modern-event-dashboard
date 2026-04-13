<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'start_date',
        'end_date',
        'location',
        'description',
        'status',
        'type',
        'expected_attendees',
        'tickets_sold',
        'revenue',
        'additional_data'
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'additional_data' => 'array',
        'expected_attendees' => 'integer',
        'tickets_sold' => 'integer',
        'revenue' => 'decimal:2'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    public function attendees()
    {
        return $this->hasMany(Attendee::class);
    }
}
