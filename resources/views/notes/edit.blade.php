@extends('layouts.common')

@section('title', "Update note: {$note->title}")

@section('panel')
    <x-ui.button :url="route('notes')">Back to list</x-ui.button>
@endsection

@section('content')
    <div class="view-edit-note">
        <x-note-form method="PUT" :action="route('notes.update', ['note' => $note])" :categories="$categories" :data="[
            'title' => old('title', $note->title),
            'content' => old('content', $note->content),
            'category_id' => old('category_id', $note->category_id),
        ]" :errors="$errors" />
    </div>
@endsection
