import { computed, watch, type ComputedRef } from "vue"
import { useRouter, onBeforeRouteLeave, type Router } from "vue-router"
import { useWoojsStore } from "@stores/woojs"
import type { Wooj, Topic } from "@types"

/**
 * Параметры топика
 */
interface TopicParams {
  id: string
  title: string
  woojs: Wooj[]
  isLoaded: boolean
  sort?: (positions: number[]) => Promise<void>
  togglePin?: (wooj: Wooj) => Promise<void>
  remove?: (wooj: Wooj) => Promise<void>
  edit?: (wooj: Wooj) => void
  restore?: (wooj: Wooj) => Promise<void>
  clearTrash?: () => Promise<void>
  update?: (fields: { name?: string }) => Promise<Topic | null>
  delete?: () => Promise<void>
}

/**
 * Карта параметров топиков
 */
interface TopicParamsMap {
  all: TopicParams
  pinned: TopicParams
  published: TopicParams
  trash: TopicParams
  custom: TopicParams
}

/**
 * Composable для работы с вуджами
 */
interface WoojsComposable {
  woojStore: ReturnType<typeof useWoojsStore>
  onLoaded: (cb: () => void) => void
  setRouteListeners: () => void
  topicParamsMap: ComputedRef<TopicParamsMap>
  createTopic: (fields: { name: string }) => Promise<void>
  createWooj: () => Promise<void>
}

/**
 * Composable для работы с вуджами
 */
export const useWoojs = (): WoojsComposable => {
  const router: Router = useRouter()
  const woojStore = useWoojsStore()

  /**
   * Редактировать вудж
   */
  const edit = (wooj: Wooj): void => {
    router.push({ name: "Wooj", params: { woojId: wooj.id.toString() } })
  }

  /**
   * Создать вудж
   */
  const createWooj = async (): Promise<void> => {
    const wooj = await woojStore.createWooj({ title: "", content: "" })

    if (wooj) {
      edit(wooj)
    }
  }

  /**
   * Создать топик
   */
  const createTopic = async (fields: { name: string }): Promise<void> => {
    const topic = await woojStore.createTopic(fields)

    if (topic) {
      router.push({ name: "Topic", params: { topicId: topic.id.toString() } })
    }
  }

  /**
   * Удалить топик
   */
  const deleteTopic = async (topicId: number): Promise<void> => {
    router.push({ name: "Index" })

    await woojStore.deleteTopic(topicId)
  }

  /**
   * Событие "все ресурсы загружены"
   */
  const onLoaded = (cb: () => void): void => {
    watch(
      () => woojStore.isLoaded,
      () => woojStore.isLoaded && cb(),
    )
  }

  /**
   * Установить слушателей за событиями роутера
   */
  const setRouteListeners = (): void => {
    onBeforeRouteLeave(() => {
      if (woojStore.isNeedUpdate) {
        woojStore.fetchAll()
      }
    })
  }

  const topicParamsMap = computed((): TopicParamsMap => {
    return {
      all: {
        id: "all",
        title: "Все вуджи",
        woojs: woojStore.allWoojs,
        isLoaded: woojStore.isLoaded,
        sort: (positions: number[]) => woojStore.sort("all", positions),
        togglePin: woojStore.togglePin,
        remove: woojStore.remove,
        edit,
      },
      pinned: {
        id: "pinned",
        title: "Закрепленные",
        woojs: woojStore.pinnedWoojs,
        isLoaded: woojStore.isLoaded,
        sort: (positions: number[]) => woojStore.sort("pinned", positions),
        togglePin: woojStore.togglePin,
        remove: woojStore.remove,
        edit,
      },
      published: {
        id: "published",
        title: "Опубликованные",
        woojs: woojStore.publishedWoojs,
        isLoaded: woojStore.isLoaded,
        sort: (positions: number[]) => woojStore.sort("published", positions),
        togglePin: woojStore.togglePin,
        remove: woojStore.remove,
        edit,
      },
      trash: {
        id: "trash",
        title: "Корзина",
        woojs: woojStore.removedWoojs,
        isLoaded: woojStore.isLoaded,
        restore: woojStore.restore,
        clearTrash: woojStore.clearTrash,
      },
      custom: {
        id: `woojs-${woojStore.activeTopic?.id || "custom"}`,
        title: woojStore.activeTopic?.name || "",
        woojs: woojStore.activeWoojs,
        isLoaded: woojStore.isLoaded,
        sort: (positions: number[]) => woojStore.sort(woojStore.activeTopic?.id || 0, positions),
        togglePin: woojStore.togglePin,
        remove: woojStore.remove,
        edit,
        update: (fields: { name?: string }) => woojStore.updateTopic(woojStore.activeTopic?.id || 0, fields),
        delete: () => deleteTopic(woojStore.activeTopic?.id || 0),
      },
    }
  })

  return {
    woojStore,

    onLoaded,
    setRouteListeners,

    topicParamsMap,
    createTopic,
    createWooj,
  }
}
