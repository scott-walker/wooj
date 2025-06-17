<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Js;

Route::get('/', function () {
    return Js::encode([
        'message' => 'API 1.0'
    ]);
})->name('index');

// Notes
// Route::get('/notes', [NoteController::class, 'index'])->name('notes');
// Route::get('/notes/create', [NoteController::class, 'create'])->name('notes.create');
// Route::post('/notes/store', [NoteController::class, 'store'])->name('notes.store');
// Route::get('/notes/{note}', [NoteController::class, 'show'])->name('notes.show');
// Route::get('/notes/{note}/edit', [NoteController::class, 'edit'])->name('notes.edit');
// Route::put('/notes/{note}', [NoteController::class, 'update'])->name('notes.update');
// Route::delete('/notes/{note}', [NoteController::class, 'destroy'])->name('notes.destroy');
