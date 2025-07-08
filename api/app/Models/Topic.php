<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Wooj;
use App\Models\User;

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
}
