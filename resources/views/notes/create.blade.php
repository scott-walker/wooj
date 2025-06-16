@extends('layouts.common')

@section('title', 'Create note')

@section('panel')
    <x-ui.button :url="route('notes')">Back to list</x-ui.button>
@endsection

@section('content')
    <div class="view-create-note">
        <x-note-form 
            :action="route('notes.store')" 
            :categories="$categories"
            :data="[
                'title' => old('title'),
                'content' => old('content'),
                'category_id' => old('category_id'),
            ]"
            :errors="$errors"
        />
    </div>
@endsection
