<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attendee extends Model
{
    protected $fillable = [
        'event_id',
        'ticket_id',
        'user_id',
        'name',
        'email',
        'phone',
        'status',
        'registration_date',
        'additional_data'
    ];

    protected $casts = [
        'registration_date' => 'datetime',
        'additional_data' => 'array'
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function ticket(): BelongsTo
    {
        return $this->belongsTo(Ticket::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
