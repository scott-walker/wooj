<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Topic;

class Wooj extends Model
{
    protected $fillable = ['title', 'content', 'author_id'];

    /** @use HasFactory<\Database\Factories\WoojFactory> */
    use HasFactory;

    public function author(): BelongsTo
    {
        return $this->belongsTo(related: User::class);
    }

    public function topics(): BelongsToMany
    {
        return $this->belongsToMany(Topic::class, 'woojs_topics');
    }
}
