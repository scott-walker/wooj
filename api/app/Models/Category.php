<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Note;

class Category extends Model
{
    protected $fillable = ['name'];
    
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

    public function notes(): HasMany
    {
        return $this->hasMany(Note::class);
    }
}
