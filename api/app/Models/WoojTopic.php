<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Wooj;
use App\Models\Topic;

class WoojTopic extends Model
{
    public $timestamps = false;
    protected $table = 'woojs_topics';
    protected $fillable = ['wooj_id', 'topic_id'];

    use HasFactory;

    public function topic(): HasOne
    {
        return $this->hasOne(Topic::class, 'id', 'topic_id');
    }

    public function wooj(): HasOne
    {
        return $this->hasOne(Wooj::class, 'id', 'wooj_id');
    }
}
