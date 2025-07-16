<?php

namespace App\Services;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\TopicResource;
use App\Models\Topic;
use App\Models\WoojTopic;

/**
 * Сервис для работы с топиками
 */
class TopicService
{
    /**
     * Количество записей на странице
     * @var int
     */
    protected const int ITEMS_PER_PAGE = 100;

    /**
     * Обернуть топик
     * @param Topic $topic
     * @return TopicResource
     */
    public function wrap(Topic $topic): TopicResource
    {
        return new TopicResource($topic);
    }

    /**
     * Обернуть коллекцию топиков
     * @param mixed $topic
     * @return ResourceCollection
     */
    public function wrapCollection(mixed $topics): ResourceCollection
    {
        return TopicResource::collection($topics);
    }

    /**
     * Получить топик
     * @param int $id
     * @return Topic
     */
    public function getTopic(int $id): Topic
    {
        return Topic::findOrFail($id);
    }

    /**
     * Получить топики
     * @return LengthAwarePaginator
     */
    public function getTopics(array $params): LengthAwarePaginator
    {
        $type = $params['type'] ?? null;
        $authorId = $params['author_id'] ?? null;

        return Topic::where('type', $type)
            ->where('author_id', $authorId)
            ->orderByDesc('created_at')
            ->paginate(self::ITEMS_PER_PAGE);
    }

    /**
     * Получить топики по автору
     * @param int $authorId
     * @return LengthAwarePaginator
     */
    public function getTopicsByAuthor(int $authorId): LengthAwarePaginator
    {
        return Topic::where('author_id', $authorId)
            ->with("woojTopics")
            ->orderBy('id')
            ->paginate(self::ITEMS_PER_PAGE);
    }

    /**
     * Получить пользовательские топики
     * @param array $params
     * @return LengthAwarePaginator
     */
    public function getCustomTopics(array $params): LengthAwarePaginator
    {
        $params['type'] = Topic::TYPE_CUSTOM;

        return $this->getTopics($params);
    }

    /**
     * Создать топик
     * @param array $fields
     * @return Topic
     */
    public function create(array $fields): Topic
    {
        return Topic::create([
            'name' => $fields['name'],
            'author_id' => $fields['author_id'],
        ]);
    }

    /**
     * Обновить топик
     * @param Topic $topic
     * @param array $fields
     * @return Topic
     */
    public function update(Topic $topic, array $fields): Topic
    {
        $topic->update($fields);

        return $topic;
    }

    /**
     * Удалить топик
     * @param Topic $topic
     * @return Topic
     */
    public function delete(Topic $topic): Topic
    {
        $topic->delete();

        return $topic;
    }

    /**
     * Сортировать вуджи в топике
     * @param Topic $topic
     * @param array $positions
     * @return Topic
     */
    public function sortWoojs(Topic $topic, array $positions): Topic
    {
        /**
         * @var WoojTopic[]
         */
        $woojTopics = WoojTopic::where('topic_id', $topic->id)
            ->get()
            ->keyBy('wooj_id');

        DB::transaction(function () use (&$woojTopics, &$positions) {
            foreach ($positions as $position => $woojId) {
                $woojTopic = $woojTopics[$woojId];
                $woojTopic->update(['position' => $position]);
            }
        });

        return $topic;
    }
}
