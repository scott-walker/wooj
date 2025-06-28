<?php

namespace App\Models;

use Awobaz\Compoships\Compoships;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Wooj;

/**
 * Модель лайка вуджа
 */
class Like extends Model
{
    /** @use HasFactory<\Database\Factories\WoojFactory> */
    use HasFactory, Compoships;

    protected $fillable = [
        'wooj_id',
        'user_id'
    ];

    /**
     * Вудж
     * @return BelongsTo<User, Wooj>
     */
    public function wooj(): BelongsTo
    {
        return $this->belongsTo(related: Wooj::class);
    }

    /**
     * Пользователь
     * @return BelongsTo<User, Wooj>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(related: User::class);
    }
}
