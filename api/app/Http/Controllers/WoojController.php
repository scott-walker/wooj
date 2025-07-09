<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Wooj\StoreRequest;
use App\Http\Requests\Wooj\UpdateRequest;
use App\Http\Requests\Wooj\GetRequest;
use App\Http\Resources\WoojResource;
use App\Models\Wooj;

/**
 * Контроллер для работы с вуджами
 */
class WoojController extends Controller
{
    /**
     * Количество записей на странице
     * @var int
     */
    protected const int ITEMS_PER_PAGE = 100;

    /**
     * Получить список вуджей
     */
    public function index()
    {
        $woojs = Wooj::byAuthor()
            ->with('woojTopics')
            ->topicAll()
            ->orderByTopicPositions()
            ->paginate(self::ITEMS_PER_PAGE);

        return WoojResource::collection($woojs);
    }

    /**
     * Получить список любимых вуджей
     */
    public function pinned()
    {
        $woojs = Wooj::byAuthor()
            ->with('woojTopics')
            ->topicPinned()
            ->orderByTopicPositions()
            ->paginate(self::ITEMS_PER_PAGE);

        return WoojResource::collection($woojs);
    }

    /**
     * Получить удаленные вуджи
     */
    public function trash()
    {
        $woojs = Wooj::byAuthor()
            ->onlyTrashed()
            ->orderByDesc('deleted_at')
            ->paginate(self::ITEMS_PER_PAGE);

        return WoojResource::collection($woojs);
    }

    /**
     * Сохранить вудж
     */
    public function store(StoreRequest $request)
    {
        $wooj = Wooj::create([
            'title' => $request->title,
            'content' => $request->content,
            'author_id' => Auth::user()->id,
        ]);

        return new WoojResource($wooj);
    }

    /**
     * Показать вудж
     */
    public function show(GetRequest $request, Wooj $wooj)
    {
        return new WoojResource($wooj);
    }

    /**
     * Обновить вудж
     */
    public function update(UpdateRequest $request, Wooj $wooj)
    {
        $wooj->update($request->all());

        return new WoojResource($wooj);
    }

    /**
     * Отправить вудж в корзину
     */
    public function destroy(GetRequest $request, Wooj $wooj)
    {
        $wooj->delete();

        return new WoojResource($wooj);
    }

    /**
     * Восстановить вудж из корзины
     */
    public function restore(GetRequest $request, Wooj $wooj)
    {
        $wooj->restore();

        return new WoojResource($wooj);
    }

    /**
     * Очистить корзину
     */
    public function destroyTrashed()
    {
        Wooj::byAuthor()->onlyTrashed()->forceDelete();

        return response()->json(['message' => 'success']);
    }

    /**
     * Закрепить вудж
     */
    public function pin(GetRequest $request, Wooj $wooj)
    {
        $wooj->pin();

        return new WoojResource($wooj);
    }

    /**
     * Открепить вудж
     */
    public function unpin(GetRequest $request, Wooj $wooj)
    {
        $wooj->unpin();

        return new WoojResource($wooj);
    }
}
