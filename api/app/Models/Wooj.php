<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Topic;

class Wooj extends Model
{
    protected $fillable = ['title', 'content', 'topic_id'];

    /** @use HasFactory<\Database\Factories\WoojFactory> */
    use HasFactory;

    public function topic(): BelongsTo
    {
        return $this->belongsTo(Topic::class);
    }
}
