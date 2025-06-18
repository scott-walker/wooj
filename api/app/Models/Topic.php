<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Wooj;

class Topic extends Model
{
    protected $fillable = ['name'];

    /** @use HasFactory<\Database\Factories\TopicFactory> */
    use HasFactory;

    public function woojs(): HasMany
    {
        return $this->hasMany(Wooj::class);
    }
}
