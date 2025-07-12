<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Wooj;
use App\Models\WoojTopic;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Модель топика
 * @property int $id
 * @property string $type
 * @property string $name
 * @property int $author_id
 */
class Topic extends Model
{
    public const string TYPE_ALL = 'all';
    public const string TYPE_PINNED = 'pinned';
    public const string TYPE_PUBLIC = 'public';
    public const string TYPE_CUSTOM = 'custom';

    protected $fillable = ['id', 'type', 'name', 'author_id'];

    use HasFactory;

    /**
     * Проверить тип топика на существующий
     * @param mixed $type
     * @return bool
     */
    public static function isTypeExists($type): bool
    {
        return in_array($type, [
            self::TYPE_ALL,
            self::TYPE_PINNED,
            self::TYPE_PUBLIC,
            self::TYPE_CUSTOM,
        ]);
    }

    /**
     * Автор
     * @return BelongsTo
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(related: User::class);
    }

    /**
     * Связь с вуджами
     * @return BelongsToMany
     */
    public function woojs(): BelongsToMany
    {
        return $this->belongsToMany(Wooj::class, 'woojs_topics');
    }

    /**
     * Связь с вуджами
     * @return HasMany
     */
    public function woojTopics(): HasMany
    {
        return $this->hasMany(WoojTopic::class, 'topic_id')
            ->orderBy('position', 'asc');
    }

    /**
     * Получить по автору
     */
    public function scopeByAuthor()
    {
        return $this->where('author_id', Auth::user()->id);
    }

    /**
     * Получить позиции вуджей в топике
     */
    public function getWoojPositionsAttribute()
    {
        return $this->woojTopics->pluck('wooj_id')->toArray();
    }
}
