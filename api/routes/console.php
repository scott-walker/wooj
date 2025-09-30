<?php

// use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use App\Services\UserService;

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

Artisan::command('app:genpass', function () {
    echo Hash::make("longtime") . "\n";
})->purpose('Generate password');

Artisan::command('app:verify', function () {
    $service = new UserService();
    $user = User::findOrFail(User::SCOTT_ID);
    $res = $service->sendVerifyMail($user);
    // $user->sendEmailVerificationNotification();

    print_r($res);
    echo "{$user->name}\n";
})->purpose('Test verify user email');
