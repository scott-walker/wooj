@props([
    'type' => 'primary'
])

<a @class(['btn', $type]) href="{{ $attributes->get('url') }}">{{ $slot }}</a>
