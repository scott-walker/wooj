<?php

namespace App\Services;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\WoojResource;
use App\Models\Wooj;
use App\Models\WoojTopic;

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
     * Получить все вуджи
     * @return ResourceCollection
     */
    public function getAll(): ResourceCollection
    {
        $woojs = Wooj::byAuthor()
            ->with('woojTopics')
            ->topicAll()
            ->orderByTopicPositions(Auth::user()->topicAllId)
            ->paginate(self::ITEMS_PER_PAGE);

        return WoojResource::collection($woojs);
    }

    /**
     * Получить закрепленные вуджи
     * @return ResourceCollection
     */
    public function getPinned(): ResourceCollection
    {
        $woojs = Wooj::byAuthor()
            ->with('woojTopics')
            ->topicPinned()
            ->orderByTopicPositions(Auth::user()->topicPinnedId)
            ->paginate(self::ITEMS_PER_PAGE);

        return WoojResource::collection($woojs);
    }

    /**
     * Получить вуджи в корзине
     * @return ResourceCollection
     */
    public function getTrashed(): ResourceCollection
    {
        $woojs = Wooj::byAuthor()
            ->onlyTrashed()
            ->orderByDesc('deleted_at')
            ->paginate(self::ITEMS_PER_PAGE);

        return WoojResource::collection($woojs);
    }

    /**
     * Создать вудж
     * @param array $fields
     * @return WoojResource
     */
    public function create(array $fields): WoojResource
    {
        $wooj = Wooj::create([
            'title' => $fields['title'] ?? '',
            'content' => $fields['content'] ?? '',
            'author_id' => $fields['author_id'],
        ]);

        // Установить топик "все" для вуджа
        $this->setTopic($wooj, $wooj->author->topicAllId);

        return new WoojResource($wooj);
    }

    /**
     * Обновить вудж
     * @param Wooj $wooj
     * @param array $fields
     * @return WoojResource
     */
    public function update(Wooj $wooj, array $fields): WoojResource
    {
        $wooj->update($fields);

        return new WoojResource($wooj);
    }

    /**
     * Отправить вудж в корзину
     * @param Wooj $wooj
     * @return WoojResource
     */
    public function remove(Wooj $wooj): WoojResource
    {
        $wooj->delete();

        return new WoojResource($wooj);
    }

    /**
     * Восстановить вудж из корзины
     * @param Wooj $wooj
     * @return WoojResource
     */
    public function restore(Wooj $wooj): WoojResource
    {
        $wooj->restore();

        return new WoojResource($wooj);
    }

    /**
     * Очистить корзину
     * @return void
     */
    public function destroyTrashed(): void
    {
        Wooj::byAuthor()->onlyTrashed()->forceDelete();
    }

    /**
     * Установить топик для вуджа
     * @param Wooj $wooj
     * @param int $topicId
     * @return WoojResource
     */
    public function setTopic(Wooj $wooj, int $topicId): WoojResource
    {
        WoojTopic::create([
            'wooj_id' => $wooj->id,
            'topic_id' => $topicId,
        ]);

        return new WoojResource($wooj);
    }

    /**
     * Снять топик с вуджа
     * @param Wooj $wooj
     * @param int $topicId
     * @return WoojResource
     */
    public function unsetTopic(Wooj $wooj, int $topicId): WoojResource
    {
        $woojTopic = WoojTopic::where([
            'wooj_id' => $wooj->id,
            'topic_id' => $topicId,
        ]);
        $woojTopic->delete();

        return new WoojResource($wooj);
    }

    /**
     * Закрепить вудж
     * @param Wooj $wooj
     * @return WoojResource
     */
    public function pin(Wooj $wooj): WoojResource
    {
        return $this->setTopic($wooj, $wooj->author->topicPinnedId);
    }

    /**
     * Открепить вудж
     * @param Wooj $wooj
     * @return WoojResource
     */
    public function unpin(Wooj $wooj): WoojResource
    {
        return $this->unsetTopic($wooj, $wooj->author->topicPinnedId);
    }
}
