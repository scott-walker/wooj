<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;
use App\Http\Requests\RegisterUserRequest;
use App\Http\Requests\LoginUserRequest;
use App\Models\User;

/**
 * Контроллер авторизации
 */
class AuthController extends Controller
{
    /**
     * Регистрация пользователя
     * @param \App\Http\Requests\RegisterUserRequest $request
     * @return User
     */
    public function register(RegisterUserRequest $request): JsonResponse
    {
        $user = User::create($request->all());

        return response()->json([
            'user' => $user,
        ]);
    }

    /**
     * Войти в систему
     * @param \App\Http\Requests\LoginUserRequest $request
     * @return void
     */
    public function login(LoginUserRequest $request): JsonResponse
    {
        $credentials = $request->only(['email', 'password']);

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        /**
         * @var User
         */
        $user = Auth::user();
        $user->tokens()->delete();
        $token = $user->createToken('')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    /**
     * Выйти из системы
     * @return void
     */
    public function logout(): JsonResponse
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

        return response()->json([
            'user' => $user
        ]);
    }
}
