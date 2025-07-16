<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
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
     * @param User $user
     * @return string
     */
    public function createToken(User $user): string
    {
        return $user->createToken('')->plainTextToken;
    }

    /**
     * Поменять автар пльзователя
     * @param User $user
     * @param UploadedFile $file
     * @return User
     */
    public function changeAvatar(User $user, UploadedFile $file): User
    {
        Storage::disk('public')->delete($user->avatar);
        $avatar = $file->store('avatar', 'public');

        return $this->update($user, ["avatar" => $avatar]);
    }

    /**
     * Обновить данные пользователя
     * @param User $user
     * @param array $fields
     * @return User
     */
    public function update(User $user, array $fields): User
    {
        $user = User::find($user->id);
        $user->update($fields);

        return $user;
    }
}
