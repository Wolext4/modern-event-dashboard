<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FormData extends Model
{
    protected $fillable = [
        'user_id',
        'page',
        'form_key',
        'form_data',
        'is_completed',
        'last_updated'
    ];

    protected $casts = [
        'form_data' => 'array',
        'is_completed' => 'boolean',
        'last_updated' => 'datetime'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Save form data for a specific user, page, and form
     */
    public static function saveFormData(int $userId, string $page, string $formKey, array $formData, bool $isCompleted = false): self
    {
        return self::updateOrCreate(
            [
                'user_id' => $userId,
                'page' => $page,
                'form_key' => $formKey
            ],
            [
                'form_data' => $formData,
                'is_completed' => $isCompleted,
                'last_updated' => now()
            ]
        );
    }

    /**
     * Get form data for a specific user, page, and form
     */
    public static function getFormData(int $userId, string $page, string $formKey): ?array
    {
        $formData = self::where('user_id', $userId)
            ->where('page', $page)
            ->where('form_key', $formKey)
            ->first();

        return $formData?->form_data;
    }

    /**
     * Get all form data for a user on a specific page
     */
    public static function getPageFormData(int $userId, string $page): array
    {
        return self::where('user_id', $userId)
            ->where('page', $page)
            ->get()
            ->mapWithKeys(function ($item) {
                return [$item->form_key => $item->form_data];
            })
            ->toArray();
    }
}
