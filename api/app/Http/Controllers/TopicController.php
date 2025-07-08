<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreTopicRequest;
use App\Http\Requests\UpdateTopicRequest;
use App\Http\Resources\TopicResource;
use App\Models\Topic;

class TopicController extends Controller
{
    protected const int ITEMS_PER_PAGE = 100;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $topics = Topic::byAuthor()
            ->with('woojs')
            ->customTopics()
            ->orderBy('id')
            ->paginate(self::ITEMS_PER_PAGE);

        return TopicResource::collection($topics);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTopicRequest $request)
    {
        $topic = Topic::create([
            'name' => $request->name,
            'author_id' => Auth::user()->id,
        ]);

        return new TopicResource($topic);
    }

    /**
     * Display the specified resource.
     */
    public function show(Topic $topic)
    {
        return new TopicResource($topic);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTopicRequest $request, Topic $topic)
    {
        $topic->update($request->all());

        return new TopicResource($topic);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Topic $topic)
    {
        $topic->delete();

        return new TopicResource($topic);
    }
}
