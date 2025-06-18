<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWoojRequest;
use App\Http\Requests\UpdateWoojRequest;
use App\Models\Wooj;
use Database\Factories\WoojFactory;

class WoojController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Wooj::with('topic')
            ->whereNotNull('topic_id')
            ->orderByDesc('id')
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWoojRequest $request)
    {
        return Wooj::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Wooj $wooj)
    {
        return Wooj::findOrFail($wooj->id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWoojRequest $request, Wooj $wooj)
    {
        $wooj->update($request->all());

        return $wooj;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Wooj $wooj)
    {
        $wooj->delete();

        return $wooj;
    }
}
