<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ticket extends Model
{
    protected $fillable = [
        'event_id',
        'name',
        'description',
        'price',
        'quantity_available',
        'quantity_sold',
        'sale_start_date',
        'sale_end_date',
        'status',
        'additional_data'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'quantity_available' => 'integer',
        'quantity_sold' => 'integer',
        'sale_start_date' => 'datetime',
        'sale_end_date' => 'datetime',
        'additional_data' => 'array'
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }
}
