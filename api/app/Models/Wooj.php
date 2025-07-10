<?php

namespace App\Models;

// use Awobaz\Compoships\Compoships;
use Illuminate\Support\Facades\Auth;
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
        return $this->belongsTo(related: User::class);
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
     * Получить по автору
     */
    public function scopeByAuthor()
    {
        return $this->where('author_id', Auth::user()->id);
    }

    /**
     * Сортировать по позициям в топике
     */
    public function scopeOrderByTopicPositions($query, $topicId, string $direction = 'asc')
    {
        $subQuery = WoojTopic::select('position')
            ->whereColumn('wooj_id', 'woojs.id')
            ->where('topic_id', $topicId)
            ->take(1);

        return $query->orderBy($subQuery, $direction);
    }

    /**
     * Получить вуджи по топику 
     */
    public function scopeTopic(int $topicId)
    {
        return $this->whereHas('woojTopics', function ($q) use ($topicId) {
            $q->where('topic_id', $topicId);
        });
    }

    /**
     * Получить вуджи по топику "все"
     */
    public function scopeTopicAll()
    {
        return $this->scopeTopic(Auth::user()->topicAllId);
    }

    /**
     * Получить вуджи по топику "закрепленные"
     */
    public function scopeTopicPinned()
    {
        return $this->scopeTopic(Auth::user()->topicPinnedId);
    }

    /**
     * Получить вуджи по топику "публичные"
     */
    public function scopeTopicPublic()
    {
        return $this->scopeTopic(Auth::user()->topicPublicId);
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
     * Позиции в топиках
     * @return array
     */
    // public function getPositionsAttribute()
    // {
    //     return $this->woojTopics->mapWithKeys(fn(WoojTopic $item) => [$item->topic_id => $item->position])->all();
    // }

    /**
     * Закрепленный / открепленный
     * @return bool
     */
    public function getIsPinnedAttribute(): bool
    {
        return in_array(Auth::user()->topicPinnedId, $this->topicIds);
    }
}
