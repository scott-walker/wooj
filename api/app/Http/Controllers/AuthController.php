<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Auth\AuthenticationException;
use App\Http\Requests\RegisterUserRequest;
use App\Http\Requests\LoginUserRequest;
use App\Models\User;
use App\Services\UserService;

/**
 * Контроллер авторизации
 * @property UserService $userSerivce
 */
class AuthController extends Controller
{
    /**
     * Инициализировать контроллер
     * @param UserService $userSerivce
     */
    public function __construct(
        private UserService $userSerivce,
    ) {}

    /**
     * Регистрация пользователя
     * @param \App\Http\Requests\RegisterUserRequest $request
     * @return User
     */
    public function register(RegisterUserRequest $request): JsonResponse
    {
        $user = $this->userSerivce->register($request->email, $request->password);

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
        try {
            $user = $this->userSerivce->login($request->email, $request->password);
            $token = $this->userSerivce->createToken();

            return response()->json([
                'user' => $user,
                'token' => $token
            ]);
        } catch (AuthenticationException) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    }

    /**
     * Выйти из системы
     * @return void
     */
    public function logout(): JsonResponse
    {
        $user = $this->userSerivce->logout();

        return response()->json([
            'user' => $user
        ]);
    }
}
