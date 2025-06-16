<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title', 'Note App')</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    <!-- Resources -->
    @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
        @vite([
            'resources/css/app.css', 
            'resources/js/app.js'
        ])
    @endif
</head>
<body class="flex flex-col">
    <header class="p-4 bg-slate-500 text-white">
        <div class="font-bold">Notes App</div>
    </header>

    @if (session('message'))
        <div class="p-4 text-center bg-blue-100 text-blue-500 font-bold">
            {{ session('message') }}
        </div>
    @endif

    @hasSection('panel')
        <x-panel>@yield('panel')</x-panel>
    @endif

    <main class="grow p-4 bg-white">
        @yield('content', 'Empty')
    </main>
    <footer class="p-4 bg-slate-100">Footer 2025</footer>
</body>
</html>
