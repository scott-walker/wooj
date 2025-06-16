@extends('layouts.common')

@section('title', 'Notes')

@section('panel')
    <x-ui.button :url="route('notes.create')">Create note</x-ui.button>
@endsection

@section('content')
    <div class="view-notes">
        <x-notes :notes="$notes" />

        <div class="pagination">
            {{ $notes->links() }}
        </div>
    </div>
@endsection
