<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // 'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:6', 'max:255'],
        ];
    }

    public function attributes(): array
    {
        return [
            'email' => 'Email',
            'password' => 'Пароль',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'email.required' => ':attribute обязателен для заполнения',
            'email.string' => ':attribute должен быть строкой',
            'email.email' => ':attribute должен быть в корректном формате',
            'email.max' => ':attribute не должен содержать более :max символов',

            'password.required' => ':attribute обязателен для заполнения',
            'password.string' => ':attribute должен быть строкой',
            'password.min' => ':attribute не должен содержать менее :min символов',
            'password.max' => ':attribute не должен содержать более :max символов',
        ];
    }
}
