<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Wooj;
use App\Models\User;

class Topic extends Model
{
    protected $fillable = ['name', 'author_id'];

    /** @use HasFactory<\Database\Factories\TopicFactory> */
    use HasFactory;

    public function author(): BelongsTo
    {
        return $this->belongsTo(related: User::class);
    }

    public function woojs(): BelongsToMany
    {
        return $this->belongsToMany(Wooj::class, 'woojs_topics');
    }
}
