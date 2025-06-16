@props([
    'note',
    // 'title',
    // 'content',
])

<div class="note p-3 bg-orange-50 rounded-lg">
    <div class="note__title">
        <a 
            class="font-bold text-slate-900" 
            href="{{ route('notes.show', ['note' => $note]) }}">
            {{ $note->title }}
        </a>
    </div>
    <div class="note__content">
        {{ $note->content }}
    </div>
    <div class="note__category mt-2 font-bold">
        {{ $note->category->name }}
    </div>
</div>
