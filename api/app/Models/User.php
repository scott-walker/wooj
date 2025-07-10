<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * Модель пользователя
 * @param int $name
 * @param int $email
 * @param int $password
 * @param \App\Models\Settings $settings
 * @param int $topicAllId
 * @param int $topicPinnedId
 * @param int $topicPublicId
 **/
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    public const int SCOTT_ID = 2;

    protected $with = ['settings'];

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Настроки
     * @return HasOne
     */
    public function settings(): HasOne
    {
        return $this->hasOne(Settings::class);
    }

    public function getTopicAllIdAttribute(): int
    {
        return $this->settings->topic_all_id;
    }

    public function getTopicPinnedIdAttribute(): int
    {
        return $this->settings->topic_pinned_id;
    }

    public function getTopicPublicIdAttribute(): int
    {
        return $this->settings->topic_public_id;
    }
}
