<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\Wooj\StoreRequest;
use App\Http\Requests\Wooj\UpdateRequest;
use App\Http\Requests\Wooj\GetRequest;
use App\Http\Resources\WoojResource;
use App\Models\Wooj;
use App\Models\Like;

/**
 * Контроллер для работы с вуджами
 */
class WoojController extends Controller
{
    // Количество записей на странице
    protected const int ITEMS_PER_PAGE = 100;

    /**
     * Получить список вуджей
     */
    public function index()
    {
        $woojs = DB::table('woojs as w')
            ->leftJoin('likes as l', function ($join) {
                $join->on('l.wooj_id', '=', 'w.id');
                $join->on('l.user_id', '=', 'w.author_id');
            })
            ->select(['w.*', 'l.id as like_id'])
            ->where('w.author_id', Auth::user()->id)
            ->whereNull('w.deleted_at')
            ->orderBy('l.created_at', 'asc')
            ->orderBy('w.created_at', 'desc')
            ->paginate(self::ITEMS_PER_PAGE);

        return WoojResource::collection($woojs);
    }

    /**
     * Получить список любимых вуджей
     */
    public function likes()
    {
        $woojs = DB::table('woojs as w')
            ->join('likes as l', function ($join) {
                $join->on('l.wooj_id', '=', 'w.id');
                $join->on('l.user_id', '=', 'w.author_id');
            })
            ->select(['w.*', 'l.id as like_id'])
            ->where('w.author_id', Auth::user()->id)
            ->whereNull('w.deleted_at')
            ->orderBy('l.created_at', 'asc')
            ->orderBy('w.created_at', 'desc')
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
     * Поставить лайк вуджу
     */
    public function setLike(GetRequest $request, Wooj $wooj)
    {
        Like::create([
            'wooj_id' => $wooj->id,
            'user_id' => Auth::user()->id,
        ]);

        return new WoojResource($wooj);
    }

    /**
     * Снять лайк с вуджа
     */
    public function unsetLike(GetRequest $request, Wooj $wooj)
    {
        // $wooj = Wooj::with('ownLike')->liked()->findOrFail($wooj->id);
        $wooj->ownLike()->delete();

        return new WoojResource($wooj);
    }
}
