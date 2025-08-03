import { computed, watch } from "vue"
import { useRouter, onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router"

import { useWoojsStore } from "@stores/woojs"

export const useWoojs = () => {
  const router = useRouter()
  const woojStore = useWoojsStore()

  /**
   * Редактировать вудж
   * @param {Object} wooj
   * @returns {void}
   */
  const edit = (wooj) => {
    router.push({ name: "Wooj", params: { woojId: wooj.id } })
  }

  /**
   * Создать вудж
   * @returns {Promise}
   */
  const createWooj = async () => {
    const wooj = await woojStore.createWooj()

    edit(wooj)
  }

  /**
   * Создать топик
   * @param {Object} fields
   * @returns {Promise}
   */
  const createTopic = async (fields) => {
    const topic = await woojStore.createTopic(fields)

    router.push({ name: "Topic", params: { topicId: topic.id } })
  }

  /**
   * Удалить топик
   * @param {Number} topicId
   * @returns {Promise}
   */
  const deleteTopic = async (topicId) => {
    router.push({ name: "Index" })

    await woojStore.deleteTopic(topicId)
  }

  /**
   * Событие "все ресурсы загружены"
   * @param {Function} cb
   * @returns {void}
   */
  const onLoaded = (cb) => {
    watch(
      () => woojStore.isLoaded,
      () => woojStore.isLoaded && cb(),
    )
  }

  /**
   * Установить слушателей за событиями роутера
   * @returns {void}
   */
  const setRouteListeners = () => {
    onBeforeRouteUpdate(() => {
      woojStore.isNeedUpdate && woojStore.fetchAll()
    })

    onBeforeRouteLeave(() => {
      woojStore.isNeedUpdate && woojStore.fetchAll()
    })
  }

  const topicParamsMap = computed(() => {
    return {
      all: {
        id: "all",
        title: "Все вуджи",
        woojs: woojStore.allWoojs,
        isLoaded: woojStore.isLoaded,
        sort: (positions) => woojStore.sort("all", positions),
        togglePin: woojStore.togglePin,
        remove: woojStore.remove,
        edit,
      },
      pinned: {
        id: "pinned",
        title: "Закрепленные",
        woojs: woojStore.pinnedWoojs,
        isLoaded: woojStore.isLoaded,
        sort: (positions) => woojStore.sort("pinned", positions),
        togglePin: woojStore.togglePin,
        remove: woojStore.remove,
        edit,
      },
      published: {
        id: "published",
        title: "Опубликованные",
        woojs: woojStore.publishedWoojs,
        isLoaded: woojStore.isLoaded,
        sort: (positions) => woojStore.sort("published", positions),
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
        sort: (positions) => woojStore.sort(woojStore.activeTopic?.id, positions),
        togglePin: woojStore.togglePin,
        remove: woojStore.remove,
        edit,
        update: (fields) => woojStore.updateTopic(woojStore.activeTopic?.id, fields),
        delete: () => deleteTopic(woojStore.activeTopic?.id),
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
