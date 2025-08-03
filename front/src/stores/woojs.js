import { ref, computed, inject } from "vue"
import { defineStore } from "pinia"
import { useToastsStore } from "@stores/toasts"

/**
 * Стор вуджей
 */
export const useWoojsStore = defineStore("woojs", () => {
  const { woojService, topicService } = inject("services")
  const toastsStore = useToastsStore()

  const TOPIC_TYPE_ALL = "all"
  const TOPIC_TYPE_PINNED = "pinned"
  const TOPIC_TYPE_PUBLIC = "public"
  const TOPIC_TYPE_CUSTOM = "custom"

  const topics = ref([])
  const woojs = ref([])

  const pinnedWoojsMap = ref({})
  const removedWoojsMap = ref({})

  const topicAll = computed(() => topics.value.find((topic) => topic.type === TOPIC_TYPE_ALL))
  const topicPinned = computed(() => topics.value.find((topic) => topic.type === TOPIC_TYPE_PINNED))
  const topicPublished = computed(() => topics.value.find((topic) => topic.type === TOPIC_TYPE_PUBLIC))
  const customTopics = computed(() => topics.value.filter((topic) => topic.type === TOPIC_TYPE_CUSTOM))

  // Нормализованные вуджи
  const normalizedWoojs = computed(() => {
    const isPinned = (wooj) => {
      return pinnedWoojsMap.value[wooj.id] !== undefined ? pinnedWoojsMap.value[wooj.id] : wooj.is_pinned
    }
    const isRemoved = (wooj) => {
      return removedWoojsMap.value[wooj.id] !== undefined ? removedWoojsMap.value[wooj.id] : wooj.is_deleted
    }

    return woojs.value.map((wooj) => {
      wooj.is_pinned = isPinned(wooj)
      wooj.is_deleted = isRemoved(wooj)

      return wooj
    })
  })

  // Видимые вуджи (не удаленные)
  const visibleWoojs = computed(() => normalizedWoojs.value.filter((wooj) => !wooj.is_deleted))

  // Карта wooj.id => wooj
  const woojsMap = computed(() => {
    return visibleWoojs.value.reduce((map, wooj) => {
      map[wooj.id] = wooj

      return map
    }, {})
  })

  // Карта topic.id => woojs
  const topicWoojsMap = computed(() => {
    return topics.value.reduce((map, topic) => {
      const woojs = []

      for (const woojId of topic.wooj_positions) {
        woojsMap.value[woojId] && woojs.push(woojsMap.value[woojId])
      }

      map[topic.id] = woojs

      return map
    }, {})
  })

  const activeTopicId = ref(null)
  const activeWoojId = ref(null)

  const activeTopic = computed(() => topics.value.find(({ id }) => id === activeTopicId.value))
  const activeWooj = computed(() => woojsMap.value[activeWoojId.value])
  const activeWoojs = computed(() => topicWoojsMap.value[activeTopicId.value] || [])
  const allWoojs = computed(() => topicWoojsMap.value[topicAll.value?.id] || [])
  const pinnedWoojs = computed(() => {
    const woojs = topicWoojsMap.value[topicPinned.value?.id] || []

    return woojs.filter((wooj) => wooj.is_pinned)
  })
  const publishedWoojs = computed(() => topicWoojsMap.value[topicPublished.value?.id] || [])
  const removedWoojs = computed(() => normalizedWoojs.value.filter((wooj) => wooj.is_deleted))

  const hasActiveTopic = computed(() => !!activeTopic.value?.id)
  const hasActiveWooj = computed(() => !!activeWooj.value?.id)

  // Требуется ли обновление списка вуджей и топиков
  const isNeedUpdate = ref(false)

  const isLoadedTopics = ref(false)
  // const isLoadedWoojs = ref(false)
  // const isLoaded = computed(() => isLoadedTopics.value && isLoadedWoojs.value)
  const isLoaded = ref(false)

  const isCreatingTopic = ref(false)
  const isCreatingWooj = ref(false)
  const isUpdatingTopic = ref(false)
  const isUpdatingWooj = ref(false)

  // /**
  //  * Получить список топиков
  //  * @param {Object} options
  //  * @returns {Promise}
  //  */
  // async function fetchTopics(options) {
  //   options = options || {}

  //   if (!options.quiet) isLoadedTopics.value = false

  //   try {
  //     topics.value = await topicService.getAll()
  //   } catch (message) {
  //     toastsStore.alert(message)
  //   }

  //   if (!options.quiet) isLoadedTopics.value = true
  // }

  // /**
  //  * Получить список вуджей
  //  * @param {Object} options
  //  * @returns {Promise}
  //  */
  // async function fetchWoojs(options) {
  //   options = options || {}

  //   if (!options.quiet) isLoadedWoojs.value = false

  //   try {
  //     woojs.value = await woojService.getAll()
  //   } catch (message) {
  //     toastsStore.alert(message)
  //   }

  //   if (!options.quiet) isLoadedWoojs.value = true
  // }

  /**
   * Собрать топики и вуджы
   * @returns {Promise}
   */
  async function fetchAll() {
    isLoaded.value = false
    // isLoadedTopics.value = false
    // isLoadedWoojs.value = false

    try {
      const data = await Promise.all([topicService.getAll(), woojService.getAll()])

      topics.value = data[0]
      woojs.value = data[1]
    } catch (message) {
      toastsStore.alert(message)
    }

    isNeedUpdate.value = false
    isLoaded.value = true
    isLoadedTopics.value = true
    // isLoadedWoojs.value = true
  }

  /**
   * Создать топик
   * @param {Object} fields
   * @returns {Promise}
   */
  async function createTopic(fields) {
    fields = fields || {}
    isCreatingTopic.value = true
    isLoadedTopics.value = false

    let topic = null

    try {
      topic = await topicService.create(fields)
      toastsStore.success("Вы создали новый топик 🙌🔥")

      await fetchAll()
    } catch (message) {
      toastsStore.alert(message)
    }

    isLoadedTopics.value = true
    isCreatingTopic.value = false

    return topic
  }

  /**
   * Обновить топик
   * @param {Number} topicId
   * @param {Object} fields
   * @returns {Promise}
   */
  const updateTopic = async (topicId, fields) => {
    fields = fields || {}
    isUpdatingTopic.value = true
    isLoadedTopics.value = false

    let topic = null

    try {
      topic = await topicService.update(topicId, fields)
      toastsStore.info("Топик обновлен")

      await fetchAll()
    } catch (message) {
      toastsStore.alert(message)
    }

    isLoadedTopics.value = true
    isUpdatingTopic.value = false

    return topic
  }

  /**
   * Удалить топик
   * @param {Number} topicId
   * @returns {Promise}
   */
  const deleteTopic = async (topicId) => {
    isUpdatingTopic.value = true
    isLoadedTopics.value = false

    let topic = null

    try {
      topic = await topicService.delete(topicId)
      toastsStore.info("Топик удален")

      await fetchAll()
    } catch (message) {
      toastsStore.alert(message)
    }

    isLoadedTopics.value = true
    isUpdatingTopic.value = false

    return topic
  }

  /**
   * Создать вудж
   * @param {Object} fields
   * @returns {Promise}
   */
  const createWooj = async (fields) => {
    fields = fields || {}
    isCreatingWooj.value = true
    // isLoadedWoojs.value = false

    let wooj = null

    try {
      wooj = await woojService.create(fields)
      toastsStore.success("Вы создали новый вуууудж 🤠👍")

      await fetchAll()
    } catch (message) {
      toastsStore.alert(message)
    }

    // isLoadedWoojs.value = true
    isCreatingWooj.value = false

    return wooj
  }

  /**
   * Обновить вудж
   * @param {Number} woojId
   * @param {Object} fields
   * @returns {Promise}
   */
  const updateWooj = async (woojId, fields) => {
    fields = fields || {}
    isUpdatingWooj.value = true

    let wooj = null

    try {
      wooj = await woojService.update(woojId, fields)
      toastsStore.info("Вудж сохранен")

      // await fetchAll()
      isNeedUpdate.value = true
    } catch (message) {
      toastsStore.alert(message)
    }

    isUpdatingWooj.value = false

    return wooj
  }

  /**
   * Установка топиков для вуджа
   * @param {Number} woojId
   * @param {Object} topicsMap
   * @returns {Promise}
   */
  const setWoojTopics = async (woojId, topicsMap) => {
    isUpdatingWooj.value = true

    let wooj = null

    try {
      wooj = await woojService.setTopics(woojId, topicsMap)

      isNeedUpdate.value = true
    } catch (message) {
      toastsStore.alert(message)
    }

    isUpdatingWooj.value = false

    return wooj
  }

  /**
   * Активировать топик
   * @param {Number} topicId
   * @returns {void}
   */
  function activateTopic(topicId) {
    activeTopicId.value = Number(topicId)
  }

  /**
   * Активировать вудж
   * @param {Number} woojId
   * @returns {void}
   */
  function activateWooj(woojId) {
    activeWoojId.value = Number(woojId)
  }

  /**
   * Деактивировать топик
   * @returns {void}
   */
  function deactivateTopic() {
    activateTopic(null)
  }

  /**
   * Деактивировать вудж
   * @returns {void}
   */
  function deactivateWooj() {
    activateWooj(null)
  }

  /**
   * Закрепить вудж
   * @param {Object} wooj
   * @returns {Promise}
   */
  const pin = async (wooj) => {
    pinnedWoojsMap.value[wooj.id] = true

    try {
      await woojService.pin(wooj.id)
      // await fetchAll()
    } catch (message) {
      toastsStore.alert(message)
    }

    isNeedUpdate.value = true
  }

  /**
   * Открепить вудж
   * @param {Object} wooj
   * @returns {Promise}
   */
  const unpin = async (wooj) => {
    pinnedWoojsMap.value[wooj.id] = false

    try {
      await woojService.unpin(wooj.id)
      // await fetchAll()
    } catch (message) {
      toastsStore.alert(message)
    }

    isNeedUpdate.value = true
  }

  /**
   * Закрепить / открепить
   * @param {Object} wooj
   * @returns {void}
   */
  const togglePin = (wooj) => (wooj.is_pinned ? unpin(wooj) : pin(wooj))

  /**
   * Переместить в корзину
   * @param {Object} wooj
   * @returns {Promise}
   */
  const remove = async (wooj) => {
    removedWoojsMap.value[wooj.id] = true

    try {
      await woojService.delete(wooj.id)
      toastsStore.info("Вудж отправлен в корзину")
    } catch (message) {
      toastsStore.alert(message)
    }
  }

  /**
   * Восстановить из корзины
   * @param {Object} wooj
   * @returns {Promise}
   */
  const restore = async (wooj) => {
    removedWoojsMap.value[wooj.id] = false

    try {
      await woojService.restore(wooj.id)
      toastsStore.info("Вудж восстановлен из корзины")
    } catch (message) {
      toastsStore.alert(message)
    }
  }

  /**
   * Применить сортировку вуджей в топике
   * @param {String|Number} topic
   * @param {Array} positions
   * @returns {Promise}
   */
  const sort = async (topic, positions) => {
    try {
      await topicService.sort(topic, positions)
    } catch (message) {
      toastsStore.alert(message)
    }

    isNeedUpdate.value = true
  }

  /**
   * Очистить корзину
   * @returns {Promise}
   */
  const clearTrash = async () => {
    // isLoadedWoojs.value = false

    try {
      await woojService.clearTrash()
      toastsStore.success("Корзины очищена 💩✨")

      await fetchAll()
    } catch (message) {
      toastsStore.alert(message)
    }

    // isLoadedWoojs.value = true
  }

  return {
    topics,
    woojs,

    topicAll,
    topicPinned,
    topicPublished,
    customTopics,

    activeTopicId,
    activeWoojId,
    activeTopic,
    activeWooj,
    activeWoojs,
    allWoojs,
    pinnedWoojs,
    publishedWoojs,
    removedWoojs,

    hasActiveTopic,
    hasActiveWooj,

    isNeedUpdate,

    isLoadedTopics,
    // isLoadedWoojs,
    isLoaded,

    isCreatingTopic,
    isCreatingWooj,
    isUpdatingTopic,
    isUpdatingWooj,

    fetchAll,
    // fetchTopics,
    // fetchWoojs,

    activateTopic,
    activateWooj,
    deactivateTopic,
    deactivateWooj,

    createTopic,
    updateTopic,
    deleteTopic,
    createWooj,
    updateWooj,
    setWoojTopics,

    pin,
    unpin,
    togglePin,
    remove,
    restore,
    clearTrash,
    sort,
  }
})
