<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Topic;
use App\Models\WoojTopic;

/**
 * Модель вуджа
 * @property int $id
 * @property string $title
 * @property string $content
 * @property int $author_id
 * @property bool $isPinned
 * @property array $topicIds
 * @property User $author
 */
class Wooj extends Model
{
    // use HasFactory, SoftDeletes, Compoships;
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'content',
        'author_id'
    ];

    /**
     * Автор
     * @return BelongsTo
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Связи с топиками
     * @return HasMany
     */
    public function woojTopics(): HasMany
    {
        return $this->hasMany(WoojTopic::class, 'wooj_id', 'id');
    }

    /**
     * Топики
     * @return BelongsToMany
     */
    public function topics(): BelongsToMany
    {
        return $this->belongsToMany(Topic::class, 'woojs_topics');
    }

    /**
     * ID топиков
     * @return array
     */
    public function getTopicIdsAttribute(): array
    {
        return $this->woojTopics->pluck("topic_id")->toArray();
    }

    /**
     * Закрепленный / открепленный
     * @return bool
     */
    public function getIsPinnedAttribute(): bool
    {
        return (bool) $this->topics->where('type', Topic::TYPE_PINNED)->count();
    }
}
