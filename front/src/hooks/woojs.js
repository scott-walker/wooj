import { computed } from "vue"
import { useRouter, onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router"
import useDataStore from "@stores/data"

export default () => {
  const router = useRouter()
  const woojStore = useDataStore()

  /**
   * Редактировать вудж
   * @param {Object} wooj
   * @returns {void}
   */
  const edit = (wooj) => {
    router.push({ name: "Wooj", params: { woojId: wooj.id } })
  }

  /**
   * Установить слушателей за событиями роутера
   * @returns {void}
   */
  const setRouteListeners = () => {
    onBeforeRouteUpdate(() => {
      console.log("onBeforeRouteUpdate")
      woojStore.isNeedUpdate && woojStore.fetchAll()
    })
    onBeforeRouteLeave(() => {
      console.log("onBeforeRouteLeave")
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
        // setListeners: () => setRouteListeners(),
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
        // setListeners: () => setRouteListeners(),
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
        // setListeners: () => setRouteListeners(),
      },
      trash: {
        id: "trash",
        title: "Корзина",
        woojs: woojStore.removedWoojs,
        isLoaded: woojStore.isLoaded,
        restore: woojStore.restore,
        // sort: (positions) => woojStore.sort("published", positions),
        // togglePin: woojStore.togglePin,
        // remove: woojStore.remove,
        // edit,
        // setListeners: () => setRouteListeners(),
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
        // setListeners: () => setRouteListeners(),
      },
    }
  })

  return {
    topicParamsMap,
    setRouteListeners,
  }
}
