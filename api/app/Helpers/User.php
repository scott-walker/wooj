<?php

namespace App\Helpers;

use Illuminate\Support\Str;
use Illuminate\Support\Stringable;

/**
 * Помощник для работы с пользователем
 */
class User
{
    /**
     * Преобразовать email в имя пользователя
     * @param string $email
     * @return Stringable
     */
    public static function emailToName(string $email): Stringable
    {
        return Str::of($email)
            ->replaceMatches('/@.*$/', '')
            ->replaceMatches('/[^A-Za-z0-9]+/', ' ')
            ->title();
    }
}
