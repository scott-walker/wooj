<?php

namespace App\Http\Requests\Topic;

class SortRequest extends GetRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'positions' => ['list'],
        ];
    }
}
