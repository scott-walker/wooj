<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

/**
 * Установки пользователя
 * @param int $user_id
 * @param int $topic_all_id
 * @param int $topic_pinned_id
 * @param int $topic_public_id
 */
class Settings extends Model
{
    use HasFactory;

    public $timestamps = false;
    public $table = 'settings';
    public $primaryKey = 'user_id';

    protected $fillable = [
        'user_id',
        'topic_all_id',
        'topic_pinned_id',
        'topic_public_id',
    ];

    /**
     * Пользователь
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(related: User::class);
    }
}
