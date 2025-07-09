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

/**
 * Модель топика
 * @property int $id
 * @property string $name
 * @property int $author_id
 */
class Topic extends Model
{
    public const int ID_TOPIC_ALL = 1;
    public const int ID_TOPIC_PINNED = 2;
    public const int ID_TOPIC_PUBLIC = 3;

    protected $fillable = ['id', 'name', 'author_id'];

    use HasFactory;

    /**
     * Автор
     * @return BelongsTo
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(related: User::class);
    }

    /**
     * Вуджы
     * @return BelongsToMany
     */
    public function woojs(): BelongsToMany
    {
        return $this->belongsToMany(Wooj::class, 'woojs_topics');
    }

    /**
     * Получить по автору
     */
    public function scopeByAuthor()
    {
        return $this->where('author_id', Auth::user()->id);
    }

    /**
     * Получить только пользовательские топики
     */
    public function scopeCustomTopics()
    {
        return $this->whereNotIn('id', [
            self::ID_TOPIC_ALL,
            self::ID_TOPIC_PINNED,
            self::ID_TOPIC_PUBLIC,
        ]);
    }

    /**
     * Получить позиции вуджей в топике
     */
    public function getWoojPositionsAttribute()
    {
        return WoojTopic::where('topic_id', $this->id)
            ->orderBy('position')
            ->pluck('wooj_id')
            ->toArray();
    }

    /**
     * Сортировать вуджи в топике
     * @param array $positions
     * @return Topic
     */
    public function sortWoojs(array $positions): Topic
    {
        /**
         * @var WoojTopic[]
         */
        $woojTopics = WoojTopic::where('topic_id', $this->id)
            ->get()
            ->keyBy('wooj_id');

        foreach ($positions as $position => $woojId) {
            $woojTopic = $woojTopics[$woojId];
            $woojTopic->update(['position' => $position]);
        }

        return $this;
    }
}
