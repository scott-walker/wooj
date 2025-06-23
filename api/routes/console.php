<?php

// use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Str;

Artisan::command('app:test', function () {
    $email = 'Scott.walker.new-york.new12@gmail.com';
    // $name = Str::of($email)
    //     ->replaceMatches('/@.*$/', '')
    //     ->replaceMatches('/[^A-Za-z0-9]+/', ' ')
    //     ->title();

    $name = \App\Helpers\User::emailToName($email);

    print_r([
        'email' => $email,
        'name' => (string) $name
    ]);
})->purpose('Test helpers');
