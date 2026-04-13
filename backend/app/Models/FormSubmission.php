<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FormSubmission extends Model
{
    protected $fillable = [
        'user_id',
        'form_type',
        'form_name',
        'submitted_data',
        'status',
        'error_message',
        'ip_address',
        'user_agent',
    ];

    protected $casts = [
        'submitted_data' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get submissions for a specific form type
     */
    public static function getByFormType(string $formType, ?int $userId = null)
    {
        $query = self::where('form_type', $formType);

        if ($userId) {
            $query->where('user_id', $userId);
        }

        return $query->orderBy('created_at', 'desc');
    }

    /**
     * Get all submissions for a user
     */
    public static function getByUser(int $userId)
    {
        return self::where('user_id', $userId)->orderBy('created_at', 'desc');
    }

    /**
     * Get submission summary grouped by form type
     */
    public static function getSummary(?int $userId = null)
    {
        $query = self::query();

        if ($userId) {
            $query->where('user_id', $userId);
        }

        return $query->selectRaw('form_type, form_name, COUNT(*) as count, MAX(created_at) as last_submitted')
            ->groupBy('form_type', 'form_name')
            ->orderBy('last_submitted', 'desc')
            ->get();
    }
}
