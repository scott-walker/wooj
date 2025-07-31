<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\AuthenticationException;
use App\Http\Requests\RegisterUserRequest;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\VerifyUserRequest;
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
     * Проверить авторизацию
     * @return JsonResponse
     */
    public function check(): JsonResponse
    {
        $user = $this->userSerivce->getCurrentUser();

        return response()->json([
            'user' => $user ? $this->userSerivce->wrap($user) : null,
        ]);
    }

    /**
     * Регистрация пользователя
     * @param \App\Http\Requests\RegisterUserRequest $request
     * @return JsonResponse
     */
    public function register(RegisterUserRequest $request): JsonResponse
    {
        $user = $this->userSerivce->register($request->email, $request->password);
        $token = $this->userSerivce->createToken($user);

        $this->userSerivce->sendVerifyMail($user);

        return response()->json([
            'user' => $this->userSerivce->wrap($user),
            'token' => $token
        ]);
    }

    /**
     * Войти в систему
     * @param \App\Http\Requests\LoginUserRequest $request
     * @return JsonResponse
     */
    public function login(LoginUserRequest $request): JsonResponse
    {
        try {
            $user = $this->userSerivce->login($request->email, $request->password);
            $token = $this->userSerivce->createToken($user);

            return response()->json([
                'user' => $this->userSerivce->wrap($user),
                'token' => $token
            ]);
        } catch (AuthenticationException) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    }

    /**
     * Выйти из системы
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        $user = $this->userSerivce->logout();

        return response()->json([
            'user' => $this->userSerivce->wrap($user),
        ]);
    }

    /**
     * Отправить сообщение с подтверждением email заново
     * @return JsonResponse
     */
    public function resend(): JsonResponse
    {
        $user = $this->userSerivce->getCurrentUser();
        $this->userSerivce->sendVerifyMail($user);

        return response()->json([
            'user' => $this->userSerivce->wrap($user),
        ]);
    }

    /**
     * Верифицировать email
     * @param \App\Http\Requests\VerifyUserRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function verify(VerifyUserRequest $request, int $id): RedirectResponse
    {
        $user = User::findOrFail($id);
        $user->markEmailAsVerified();

        return redirect(config('app.front_url'));
    }
}
