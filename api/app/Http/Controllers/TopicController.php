<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Topic\StoreRequest;
use App\Http\Requests\Topic\UpdateRequest;
use App\Http\Requests\Topic\GetRequest;
use App\Http\Resources\TopicResource;
use App\Models\Topic;

/**
 * Контроллер для работы с топиками
 */
class TopicController extends Controller
{
    /**
     * Количество записей на странице
     * @var int
     */
    protected const int ITEMS_PER_PAGE = 100;

    /**
     * Получить список всех кастомных топиков
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
     * Сохранить топик
     */
    public function store(StoreRequest $request)
    {
        $topic = Topic::create([
            'name' => $request->name,
            'author_id' => Auth::user()->id,
        ]);

        return new TopicResource($topic);
    }

    /**
     * Показать топик
     */
    public function show(GetRequest $request, Topic $topic)
    {
        return new TopicResource($topic);
    }

    /**
     * Обновить топик
     */
    public function update(UpdateRequest $request, Topic $topic)
    {
        $topic->update($request->all());

        return new TopicResource($topic);
    }

    /**
     * Удалить топик
     */
    public function destroy(GetRequest $request, Topic $topic)
    {
        $topic->delete();

        return new TopicResource($topic);
    }

    /**
     * Сортировка вуджей
     */
    public function sort(GetRequest $request, Topic $topic)
    {
        $topic->sortWoojs($request->positions);

        return new TopicResource($topic);
    }
}
