<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\User;

class VerifyUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        $user = User::findOrFail($this->id);

        if (!hash_equals($this->hash, $user->getEmailHash())) {
            return false;
        }

        return true;
    }
}
