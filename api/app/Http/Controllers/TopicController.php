<?php

namespace App\Http\Controllers;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Topic\StoreRequest;
use App\Http\Requests\Topic\UpdateRequest;
use App\Http\Requests\Topic\SortRequest;
use App\Http\Requests\Topic\GetRequest;
use App\Http\Resources\TopicResource;
use App\Models\Topic;
use App\Services\TopicService;

/**
 * Контроллер для работы с топиками
 * @property TopicService $topicService
 */
class TopicController extends Controller
{
    /**
     * Инициализировать контроллер
     * @param TopicService $topicService
     */
    public function __construct(
        private TopicService $topicService,
    ) {}

    /**
     * Получить список всех кастомных топиков
     * @return ResourceCollection
     */
    public function index(): ResourceCollection
    {
        $topics = $this->topicService->getCustomTopics([
            'author_id' => Auth::user()->id,
        ]);

        return $this->topicService->wrapCollection($topics);
    }

    /**
     * Сохранить топик
     * @param StoreRequest $request
     * @return TopicResource
     */
    public function store(StoreRequest $request): TopicResource
    {
        $topic = $this->topicService->create([
            'name' => $request->name,
            'author_id' => Auth::user()->id,
        ]);

        return $this->topicService->wrap($topic);
    }

    /**
     * Показать топик
     * @param GetRequest $request
     * @param Topic $topic
     * @return TopicResource
     */
    public function show(GetRequest $request, Topic $topic): TopicResource
    {
        return $this->topicService->wrap($topic);
    }

    /**
     * Обновить топик
     * @param UpdateRequest $request
     * @param Topic $topic
     * @return TopicResource
     */
    public function update(UpdateRequest $request, Topic $topic): TopicResource
    {
        $topic = $this->topicService->update($topic, $request->all());

        return $this->topicService->wrap($topic);
    }

    /**
     * Удалить топик
     * @param GetRequest $request
     * @param Topic $topic
     * @return TopicResource
     */
    public function destroy(GetRequest $request, Topic $topic): TopicResource
    {
        $topic = $this->topicService->delete($topic);

        return $this->topicService->wrap($topic);
    }

    /**
     * Сортировка вуджей
     * @param SortRequest $request
     * @param Topic $topic
     * @return TopicResource
     */
    public function sort(SortRequest $request, Topic $topic): TopicResource
    {
        $topic = $this->topicService->sortWoojs($topic, $request->positions);

        return $this->topicService->wrap($topic);
    }
}
