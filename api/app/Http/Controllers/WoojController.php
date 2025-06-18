<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWoojRequest;
use App\Http\Requests\UpdateWoojRequest;
use App\Models\Wooj;

class WoojController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Wooj::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWoojRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Wooj $note)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWoojRequest $request, Wooj $note)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Wooj $note)
    {
        //
    }
}
