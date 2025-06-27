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
            // 'topic_id' => ['required', 'exists:topics,id'],
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
            'title.required' => 'Поле title обязательно для заполнения',
            'title.string' => 'Поле title должно быть строкой',
            'title.max' => 'Поле title не должно быть больше 60 символов',

            'content.required' => 'Поле content обязательно для заполнения',
            'content.string' => 'Поле content должно быть строкой',
        ];
    }
}
