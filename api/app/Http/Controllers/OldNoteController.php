<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use Illuminate\Contracts\View\View;
// use App\Models\Note;
// use App\Models\Topic;

class OldNoteController extends Controller
{
    // public function index(): View
    // {
    //     $notes = Note::with('category')
    //         ->whereNotNull('topic_id')
    //         ->orderBy('id', 'desc')
    //         ->paginate(5);

    //     return view('notes.index', [
    //         'notes' => $notes
    //     ]);
    // }

    // public function show(Note $note): View
    // {
    //     $note->load('category');

    //     return view('notes.show', [
    //         'note' => $note
    //     ]);
    // }

    // public function edit(Note $note)
    // {
    //     $note->load('category');
    //     $categories = Topic::all();

    //     return view('notes.edit', [
    //         'note' => $note,
    //         'categories' => $categories,
    //     ]);
    // }

    // public function update(Note $note, Request $request)
    // {
    //     $data = $request->validate([
    //         'title' => 'required|string|max:50',
    //         'content' => 'required|string|max:500',
    //         'topic_id' => 'required|exists:categories,id'
    //     ]);

    //     $note->update($data);

    //     return redirect()->route('notes.show', ['note' => $note])->with([
    //         'message' => "Note \"{$note->title}\" is updated",
    //     ]);
    // }

    // public function destroy(Note $note)
    // {
    //     $note->delete();

    //     return redirect()->route('notes')->with([
    //         'message' => "Note \"{$note->title}\" is deleted",
    //     ]);
    // }

    // public function create(): View
    // {
    //     $categories = Topic::all();

    //     return view('notes.create', [
    //         'categories' => $categories
    //     ]);
    // }

    // public function store(Request $request)
    // {
    //     $data = $request->validate([
    //         'title' => 'required|string|max:50',
    //         'content' => 'required|string|max:500',
    //         'topic_id' => 'required|exists:categories,id'
    //     ]);

    //     Note::create($data);

    //     return redirect()->route('notes')->with([
    //         'message' => "Note \"{$data['title']}\" is created",
    //     ]);
    // }
}
