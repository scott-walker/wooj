<?php

namespace App\Http\Controllers;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Wooj\StoreRequest;
use App\Http\Requests\Wooj\UpdateRequest;
use App\Http\Requests\Wooj\GetRequest;
use App\Http\Resources\WoojResource;
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
        return $this->woojSerivce->getAll();
    }

    /**
     * Получить список любимых вуджей
     * @return ResourceCollection
     */
    public function pinned(): ResourceCollection
    {
        return $this->woojSerivce->getPinned();
    }

    /**
     * Получить удаленные вуджи
     * @return ResourceCollection
     */
    public function trash(): ResourceCollection
    {
        return $this->woojSerivce->getTrashed();
    }

    /**
     * Сохранить вудж
     * @param StoreRequest $request
     * @return WoojResource
     */
    public function store(StoreRequest $request): WoojResource
    {
        return $this->woojSerivce->create([
            'title' => $request->title,
            'content' => $request->content,
            'author_id' => Auth::user()->id,
        ]);
    }

    /**
     * Показать вудж
     * @param GetRequest $request
     * @param Wooj $wooj
     * @return WoojResource
     */
    public function show(GetRequest $request, Wooj $wooj): WoojResource
    {
        return new WoojResource($wooj);
    }

    /**
     * Обновить вудж
     * @param UpdateRequest $request
     * @param Wooj $wooj
     * @return WoojResource
     */
    public function update(UpdateRequest $request, Wooj $wooj): WoojResource
    {
        return $this->woojSerivce->update($wooj, $request->all());
    }

    /**
     * Отправить вудж в корзину
     * @param GetRequest $request
     * @param Wooj $wooj
     * @return WoojResource
     */
    public function destroy(GetRequest $request, Wooj $wooj): WoojResource
    {
        return $this->woojSerivce->remove($wooj);
    }

    /**
     * Восстановить вудж из корзины
     * @param GetRequest $request
     * @param Wooj $wooj
     * @return WoojResource
     */
    public function restore(GetRequest $request, Wooj $wooj): WoojResource
    {
        return $this->woojSerivce->restore($wooj);
    }

    /**
     * Очистить корзину
     * @return JsonResponse
     */
    public function destroyTrashed(): JsonResponse
    {
        $this->woojSerivce->destroyTrashed();

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
        return $this->woojSerivce->pin($wooj);
    }

    /**
     * Открепить вудж
     * @param GetRequest $request
     * @param Wooj $wooj
     * @return WoojResource
     */
    public function unpin(GetRequest $request, Wooj $wooj): WoojResource
    {
        return $this->woojSerivce->unpin($wooj);
    }
}
