<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Topic;

/**
 * Модель вуджа
 */
class Wooj extends Model
{
    /** @use HasFactory<\Database\Factories\WoojFactory> */
    use HasFactory, SoftDeletes;

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
     * Получить по автору
     * @return Wooj
     */
    public function scopeByAuthor(): Wooj
    {
        return $this->where('author_id', Auth::user()->id);
    }
}
