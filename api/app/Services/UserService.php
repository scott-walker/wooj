<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\AuthenticationException;
use Laravel\Sanctum\PersonalAccessToken;
use App\Helpers\User as UserHelper;
use App\Models\User;
use App\Models\Topic;

/**
 * Сервис для работы с пользователем
 */
class UserService
{
    /**
     * Зарегистрировать пользователя
     * @param string $email
     * @param string $password
     * @return User|null
     */
    public function register(string $email, string $password): User|null
    {
        $user = null;

        DB::transaction(function () use (&$user, $email, $password) {
            // Создать пользователя
            $user = User::create([
                'name' => UserHelper::emailToName($email),
                'email' => $email,
                'password' => $password,
            ]);

            // Создать базовые топики пользователя
            $baseTopics = [
                ['name' => 'Все', 'type' => Topic::TYPE_ALL],
                ['name' => 'Закрепленные', 'type' => Topic::TYPE_PINNED],
                ['name' => 'Опубликованные', 'type' => Topic::TYPE_PUBLIC],
            ];

            foreach ($baseTopics as $item) {
                $topic = new Topic();
                $topic->type = $item['type'];
                $topic->name = $item['name'];
                $topic->author_id = $user->id;
                $topic->save();
            }
        });

        return $user;
    }


    /**
     * Залогинить пользователя
     * @param string $email
     * @param string $password
     * @return User
     */
    public function login(string $email, string $password): User
    {
        $credentials = [
            'email' => $email,
            'password' => $password,
        ];

        if (!Auth::attempt($credentials)) {
            throw new AuthenticationException();
        }

        return Auth::user();
    }

    /**
     * Разлогинить пользователя
     * @return User
     */
    public function logout(): User
    {
        /**
         * @var User
         */
        $user = Auth::user();
        /**
         * @var PersonalAccessToken
         */
        $token = $user->currentAccessToken();
        $token->delete();

        return $user;
    }

    /**
     * Создать токен
     * @return string
     */
    public function createToken(): string
    {
        /**
         * @var User
         */
        $user = Auth::user();

        return $user->createToken('')->plainTextToken;
    }
}
