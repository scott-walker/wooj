<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\User\UpdateRequest;
use App\Http\Requests\User\UploadAvatarRequest;
use App\Services\UserService;

/**
 * Контроллер для работы с пользователем
 * @property UserService $userSerivce
 */
class UserController extends Controller
{
    /**
     * Инициализировать контроллер
     * @param UserService $userSerivce
     */
    public function __construct(
        private UserService $userSerivce,
    ) {}

    // /**
    //  * Показать аватар
    //  * @return string
    //  */
    // public function avatar()
    // {
    //     $path = storage_path("app/public/" . Auth::user()->avatar);

    //     // $path = Storage::disk("public")->(Auth::user()->avatar);
    //     // $path = '/var/www/storage/app/public/avatar/NxKFTHWgYgx71bRCZ7ePSt1hMYOop845BrqoDzBG.png';

    //     // // $path = Storage::get("app/public/avatar/NxKFTHWgYgx71bRCZ7ePSt1hMYOop845BrqoDzBG.png");

    //     // // return $path;

    //     return response()->file($path, [
    //         'Content-Type' => 'image/png'
    //     ]);
    // }

    /**
     * Обновить пользователя
     * @param UpdateRequest $request
     * @return JsonResponse
     */
    public function update(UpdateRequest $request): JsonResponse
    {
        $user = $this->userSerivce->update(
            Auth::user(),
            $request->all()
        );

        return response()->json([
            'user' => $user
        ]);
    }

    /**
     * Загрузить аватар
     * @param UploadAvatarRequest $request
     * @return JsonResponse
     */
    public function uploadAvatar(UploadAvatarRequest $request): JsonResponse
    {
        $user = $this->userSerivce->changeAvatar(
            Auth::user(),
            $request->file("avatar")
        );

        return response()->json([
            'user' => $user
        ]);
    }
}
