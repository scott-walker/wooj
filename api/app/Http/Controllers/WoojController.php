<?php

namespace App\Http\Controllers;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Wooj\StoreRequest;
use App\Http\Requests\Wooj\UpdateRequest;
use App\Http\Requests\Wooj\GetRequest;
use App\Http\Resources\WoojResource;
use App\Models\Topic;
use App\Models\Wooj;
use App\Services\WoojService;

/**
 * Контроллер для работы с вуджами
 * @property WoojService $woojSerivce
 */
class WoojController extends Controller
{
    /**
     * Инициализировать контроллер
     * @param WoojService $woojSerivce
     */
    public function __construct(
        private WoojService $woojSerivce,
    ) {}

    /**
     * Получить список вуджей
     * @return ResourceCollection
     */
    public function index(): ResourceCollection
    {
        $woojs = $this->woojSerivce->getWoojsByAuthor(Auth::user()->id);

        return $this->woojSerivce->wrapCollection($woojs);
    }

    /**
     * Получить список закрепленных вуджей
     * @return ResourceCollection
     */
    public function pinned(): ResourceCollection
    {
        $woojs = $this->woojSerivce->getWoojs([
            'type' => Topic::TYPE_PINNED,
            'author_id' => Auth::user()->id,
        ]);

        return $this->woojSerivce->wrapCollection($woojs);
    }

    /**
     * Получить удаленные вуджи
     * @return ResourceCollection
     */
    public function trash(): ResourceCollection
    {
        $woojs = $this->woojSerivce->getTrashed([
            'author_id' => Auth::user()->id,
        ]);

        return $this->woojSerivce->wrapCollection($woojs);
    }

    /**
     * Получить список вуджей в топике
     * @param GetRequest $request
     * @param Topic $topic
     * @return ResourceCollection
     */
    public function topic(Topic $topic): ResourceCollection
    {
        $woojs = $this->woojSerivce->getWoojs([
            'topic_id' => $topic->id,
            'author_id' => Auth::user()->id,
        ]);

        return $this->woojSerivce->wrapCollection($woojs);
    }

    /**
     * Сохранить вудж
     * @param StoreRequest $request
     * @return WoojResource
     */
    public function store(StoreRequest $request): WoojResource
    {
        $wooj = $this->woojSerivce->create([
            'title' => $request->title,
            'content' => $request->content,
            'author_id' => Auth::user()->id,
        ]);

        return $this->woojSerivce->wrap($wooj);
    }

    /**
     * Показать вудж
     * @param GetRequest $request
     * @param Wooj $wooj
     * @return WoojResource
     */
    public function show(GetRequest $request, Wooj $wooj): WoojResource
    {
        return $this->woojSerivce->wrap($wooj);
    }

    /**
     * Обновить вудж
     * @param UpdateRequest $request
     * @param Wooj $wooj
     * @return WoojResource
     */
    public function update(UpdateRequest $request, Wooj $wooj): WoojResource
    {
        $wooj = $this->woojSerivce->update($wooj, $request->all());

        return $this->woojSerivce->wrap($wooj);
    }

    /**
     * Отправить вудж в корзину
     * @param GetRequest $request
     * @param Wooj $wooj
     * @return WoojResource
     */
    public function destroy(GetRequest $request, Wooj $wooj): WoojResource
    {
        $wooj = $this->woojSerivce->remove($wooj);

        return $this->woojSerivce->wrap($wooj);
    }

    /**
     * Восстановить вудж из корзины
     * @param GetRequest $request
     * @param Wooj $wooj
     * @return WoojResource
     */
    public function restore(GetRequest $request, Wooj $wooj): WoojResource
    {
        $wooj = $this->woojSerivce->restore($wooj);

        return $this->woojSerivce->wrap($wooj);
    }

    /**
     * Очистить корзину
     * @return JsonResponse
     */
    public function destroyTrashed(): JsonResponse
    {
        $this->woojSerivce->destroyTrashed(Auth::user()->id);

        return response()->json(['message' => 'success']);
    }

    /**
     * Закрепить вудж
     * @param GetRequest $request
     * @param Wooj $wooj
     * @return WoojResource
     */
    public function pin(GetRequest $request, Wooj $wooj): WoojResource
    {
        $wooj = $this->woojSerivce->pin($wooj);

        return $this->woojSerivce->wrap($wooj);
    }

    /**
     * Открепить вудж
     * @param GetRequest $request
     * @param Wooj $wooj
     * @return WoojResource
     */
    public function unpin(GetRequest $request, Wooj $wooj): WoojResource
    {
        $wooj = $this->woojSerivce->unpin($wooj);

        return $this->woojSerivce->wrap($wooj);
    }

    /**
     * Установить топики для вуджа
     * @param GetRequest $request
     * @param Wooj $wooj
     * @return WoojResource
     */
    public function setTopics(GetRequest $request, Wooj $wooj): WoojResource
    {
        $wooj = $this->woojSerivce->setTopicsByMap($wooj, $request->map);

        return $this->woojSerivce->wrap($wooj);
    }
}
