<?php

namespace App\Http\Requests\Wooj;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:60'],
            'content' => ['required', 'string'],
        ];
    }

    public function attributes(): array
    {
        return [
            'title' => 'Заголовок вуджа',
            'content' => 'Содержимое вуджа',
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
            'title.required' => ':attribute обязателен для заполнения',
            'title.string' => ':attribute должен быть строкой',
            'title.max' => ':attribute не должен содержать более :max символов',

            'content.required' => ':attribute обязательно для заполнения',
            'content.string' => ':attribute должно быть строкой',
        ];
    }
}
