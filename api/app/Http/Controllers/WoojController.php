<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWoojRequest;
use App\Http\Requests\UpdateWoojRequest;
use App\Http\Resources\WoojResource;
use App\Models\Wooj;

class WoojController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $woojs = Wooj::with('topic')
            ->whereNotNull('topic_id')
            ->orderByDesc('id')
            ->paginate(5);

        return WoojResource::collection($woojs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWoojRequest $request)
    {
        $wooj = Wooj::create($request->all());

        return new WoojResource($wooj);
    }

    /**
     * Display the specified resource.
     */
    public function show(Wooj $wooj)
    {
        return new WoojResource($wooj);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWoojRequest $request, Wooj $wooj)
    {
        $wooj->update($request->all());

        return new WoojResource($wooj);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Wooj $wooj)
    {
        $wooj->delete();

        return new WoojResource($wooj);
    }
}
