<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\AuthenticationException;
use Laravel\Sanctum\PersonalAccessToken;
use App\Helpers\User as UserHelper;
use App\Models\User;
use App\Models\Settings;
use App\Models\Topic;

class UserService
{
    public function __construct() {}

    public function register(string $email, string $password): User|null
    {
        $user = null;

        DB::transaction(function () use (&$user, $email, $password) {
            $user = User::create([
                'name' => UserHelper::emailToName($email),
                'email' => $email,
                'password' => $password,
            ]);

            $settings = [
                'user_id' => $user->id,
            ];
            $baseTopics = [
                ['name' => 'Все', 'param' => 'topic_all_id'],
                ['name' => 'Закрепленные', 'param' => 'topic_pinned_id'],
                ['name' => 'Опубликованные', 'param' => 'topic_public_id'],
            ];

            foreach ($baseTopics as $item) {
                $topic = new Topic();
                $topic->name = $item['name'];
                $topic->author_id = $user->id;
                $topic->save();

                $settings[$item['param']] = $topic->id;
            }

            Settings::create($settings);
        });

        return $user;
    }

    public function login(string $email, string $password)
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

    public function createToken()
    {
        /**
         * @var User
         */
        $user = Auth::user();

        return $user->createToken('')->plainTextToken;
    }
}
