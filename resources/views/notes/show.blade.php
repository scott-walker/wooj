@extends('layouts.common')

@section('title', "Note: {$note->title}")

@section('panel')
    <x-ui.button :url="route('notes')">Back to list</x-ui.button>
    <x-ui.button :url="route('notes.edit', ['note' => $note])">
        Edit
    </x-ui.button>

    <form :action="route('notes.destroy', ['note' => $note])" method="POST">
        @csrf
        @method('DELETE')

        <button class="btn danger" type="sumbit">Delete</button>
    </form>
@endsection

@section('content')
    <div class="view-create-note">
        <x-note :note="$note" />
    </div>
@endsection
