<div class="notes grid grid-cols-4 gap-6">
    @foreach ($attributes->get('notes') as $note)
        <x-note :note="$note" />
    @endforeach
</div>
