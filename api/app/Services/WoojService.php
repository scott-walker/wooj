<?php

namespace App\Services;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\WoojResource;
use App\Models\Wooj;
use App\Models\WoojTopic;
use App\Models\Topic;

/**
 * Сервис для работы с вуджами
 */
class WoojService
{
    /**
     * Количество записей на странице
     * @var int
     */
    protected const int ITEMS_PER_PAGE = 100;

    /**
     * Обернуть топик
     * @param Wooj $wooj
     * @return WoojResource
     */
    public function wrap(Wooj $wooj): WoojResource
    {
        return new WoojResource($wooj);
    }

    /**
     * Обернуть коллекцию топиков
     * @param mixed $woojs
     * @return ResourceCollection
     */
    public function wrapCollection(mixed $woojs): ResourceCollection
    {
        return WoojResource::collection($woojs);
    }

    /**
     * Получить все вуджи
     * @param array $params
     * @param callable|null $params
     * @return LengthAwarePaginator
     */
    public function getWoojs(array $params = [], ?callable $cb = null): LengthAwarePaginator
    {
        $type = $params['type'] ?? null;
        $authorId = $params['author_id'] ?? null;

        $query = Wooj::select('woojs.*')
            ->join('woojs_topics', 'woojs_topics.wooj_id', '=', 'woojs.id')
            ->join('topics', 'topics.id', '=', 'woojs_topics.topic_id');

        if ($type !== null) {
            $query->where('topics.type', $type);
        }
        if ($authorId !== null) {
            $query
                ->where('woojs.author_id', $authorId)
                ->where('topics.author_id', $authorId);
        }
        if (is_callable($cb)) {
            $cb($query);
        }

        return $query
            ->orderBy('woojs_topics.position')
            ->paginate(self::ITEMS_PER_PAGE);
    }

    /**
     * Получить вуджи в корзине
     * @param array $params
     * @return LengthAwarePaginator
     */
    public function getTrashed(array $params = []): LengthAwarePaginator
    {
        return $this->getWoojs($params, fn($q) => $q->onlyTrashed());
    }

    /**
     * Создать вудж
     * @param array $fields
     * @return Wooj|null
     */
    public function create(array $fields): Wooj|null
    {
        $wooj = null;

        DB::transaction(function () use (&$wooj, $fields) {
            $wooj = Wooj::create([
                'title' => $fields['title'] ?? '',
                'content' => $fields['content'] ?? '',
                'author_id' => $fields['author_id'],
            ]);

            $topic = Topic::where([
                'type' => Topic::TYPE_ALL,
                'author_id' => $wooj->author->id
            ])->firstOrFail();

            // Установить топик "все" для вуджа
            $this->setTopic($wooj, $topic->id);
        });

        return $wooj;
    }

    /**
     * Обновить вудж
     * @param Wooj $wooj
     * @param array $fields
     * @return Wooj
     */
    public function update(Wooj $wooj, array $fields): Wooj
    {
        $wooj->update($fields);

        return $wooj;
    }

    /**
     * Отправить вудж в корзину
     * @param Wooj $wooj
     * @return Wooj
     */
    public function remove(Wooj $wooj): Wooj
    {
        $wooj->delete();

        return $wooj;
    }

    /**
     * Восстановить вудж из корзины
     * @param Wooj $wooj
     * @return Wooj
     */
    public function restore(Wooj $wooj): Wooj
    {
        $wooj->restore();

        return $wooj;
    }

    /**
     * Очистить корзину
     * @param int $authorId
     * @return void
     */
    public function destroyTrashed(int $authorId): void
    {
        Wooj::onlyTrashed()->where('author_id', $authorId)->forceDelete();
    }

    /**
     * Установить топик для вуджа
     * @param Wooj $wooj
     * @param int $topicId
     * @return Wooj
     */
    public function setTopic(Wooj $wooj, int $topicId): Wooj
    {
        WoojTopic::create([
            'wooj_id' => $wooj->id,
            'topic_id' => $topicId,
        ]);

        return $wooj;
    }

    /**
     * Снять топик с вуджа
     * @param Wooj $wooj
     * @param int $topicId
     * @return Wooj
     */
    public function unsetTopic(Wooj $wooj, int $topicId): Wooj
    {
        $woojTopic = WoojTopic::where([
            'wooj_id' => $wooj->id,
            'topic_id' => $topicId,
        ]);
        $woojTopic->delete();

        return $wooj;
    }

    /**
     * Закрепить вудж
     * @param Wooj $wooj
     * @return Wooj
     */
    public function pin(Wooj $wooj): Wooj
    {
        $topic = Topic::where([
            'type' => Topic::TYPE_PINNED,
            'author_id' => $wooj->author->id
        ])->firstOrFail();

        return $this->setTopic($wooj, $topic->id);
    }

    /**
     * Открепить вудж
     * @param Wooj $wooj
     * @return Wooj
     */
    public function unpin(Wooj $wooj): Wooj
    {
        $topic = Topic::where([
            'type' => Topic::TYPE_PINNED,
            'author_id' => $wooj->author->id
        ])->firstOrFail();

        return $this->unsetTopic($wooj, $topic->id);
    }

    /**
     * Установить топики по карте topicId => set/unset
     * @param Wooj $wooj
     * @param array $topicsMap
     * @return Wooj
     */
    public function setTopicsByMap(Wooj $wooj, array $topicsMap): Wooj
    {
        WoojTopic::where('wooj_id', $wooj->id)
            ->whereIn('topic_id', array_keys($topicsMap))
            ->delete();

        foreach ($topicsMap as $topicId => $value) {
            if ($value) {
                $this->setTopic($wooj, $topicId);
            }
        }

        return $wooj;
    }
}
