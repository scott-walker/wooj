<?php

namespace App\Models;

use Awobaz\Compoships\Compoships;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Topic;
use App\Models\Like;

/**
 * Модель вуджа
 */
class Wooj extends Model
{
    /** @use HasFactory<\Database\Factories\WoojFactory> */
    use HasFactory, SoftDeletes, Compoships;

    protected $fillable = [
        'title',
        'content',
        'author_id'
    ];

    /**
     * Автор
     * @return BelongsTo<User, Wooj>
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(related: User::class);
    }

    /**
     * Топики
     * @return BelongsToMany<Topic, Wooj, \Illuminate\Database\Eloquent\Relations\Pivot>
     */
    public function topics(): BelongsToMany
    {
        return $this->belongsToMany(Topic::class, 'woojs_topics');
    }

    /**
     * Лайк владельца
     * @return HasOne<Wooj, Like>
     */
    public function ownLike(): HasOne
    {
        return $this->hasOne(Like::class, ['wooj_id', 'user_id'], ['id', 'author_id']);
    }

    /**
     * Получить по автору
     */
    public function scopeByAuthor()
    {
        return $this->where('author_id', Auth::user()->id);
    }

    /**
     * Получить любимые вуджи
     */
    public function scopeLiked()
    {
        return $this->has('ownLike');
    }
}
