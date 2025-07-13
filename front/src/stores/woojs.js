import { ref, computed, inject } from "vue"
import { defineStore } from "pinia"

/**
 * Стор вуджей
 */
export default defineStore("woojs", () => {
  const { woojService, topicService } = inject("services")

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
  const isLoadedWoojs = ref(false)
  const isLoaded = computed(() => isLoadedTopics.value && isLoadedWoojs.value)

  const isCreatingTopic = ref(false)
  const isCreatingWooj = ref(false)
  const isUpdatingTopic = ref(false)
  const isUpdatingWooj = ref(false)

  /**
   * Получить список топиков
   * @param {Object} options
   * @returns {Promise}
   */
  async function fetchTopics(options) {
    options = options || {}

    if (!options.quiet) isLoadedTopics.value = false

    try {
      topics.value = await topicService.getAll()
    } catch (message) {
      alert(message)
    }

    if (!options.quiet) isLoadedTopics.value = true
  }

  /**
   * Получить список вуджей
   * @param {Object} options
   * @returns {Promise}
   */
  async function fetchWoojs(options) {
    options = options || {}

    if (!options.quiet) isLoadedWoojs.value = false

    try {
      woojs.value = await woojService.getAll()
    } catch (message) {
      alert(message)
    }

    if (!options.quiet) isLoadedWoojs.value = true
  }

  /**
   * Собрать топики и вуджы
   * @param {Object} options
   * @returns {Promise}
   */
  async function fetchAll(options) {
    options = options || {}

    try {
      await Promise.all([fetchTopics(options), fetchWoojs(options)])
    } catch (message) {
      console.error(message)
    }

    isNeedUpdate.value = false
  }

  /**
   * Создать топик
   * @param {Object} fields
   * @returns {Promise}
   */
  async function createTopic(fields) {
    fields = fields || {}
    isCreatingTopic.value = true

    try {
      await topicService.create(fields)
      await fetchAll()
    } catch (message) {
      alert(message)
    }

    isCreatingTopic.value = false
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

    try {
      await topicService.update(topicId, fields)
      await fetchAll()
    } catch (message) {
      alert(message)
    }

    isUpdatingTopic.value = false
  }

  /**
   * Создать вудж
   * @param {Object} fields
   * @returns {Promise}
   */
  const createWooj = async (fields) => {
    fields = fields || {}
    isCreatingWooj.value = true

    let wooj = null

    try {
      wooj = await woojService.create(fields)

      // await fetchAll()
      isNeedUpdate.value = true
    } catch (message) {
      alert(message)
    }

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

      // await fetchAll()
      isNeedUpdate.value = true
    } catch (message) {
      alert(message)
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
      alert(message)
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

    await woojService.pin(wooj.id)

    isNeedUpdate.value = true
  }

  /**
   * Открепить вудж
   * @param {Object} wooj
   * @returns {Promise}
   */
  const unpin = async (wooj) => {
    pinnedWoojsMap.value[wooj.id] = false

    await woojService.unpin(wooj.id)

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

    await woojService.delete(wooj.id)
  }

  /**
   * Восстановить из корзины
   * @param {Object} wooj
   * @returns {Promise}
   */
  const restore = async (wooj) => {
    removedWoojsMap.value[wooj.id] = false

    await woojService.restore(wooj.id)
  }

  /**
   * Очистить корзину
   * @returns {Promise}
   */
  const clearTrash = async () => {
    await woojService.clearTrash()
    await fetchAll()
    // isNeedUpdate.value = true
  }

  /**
   * Применить сортировку вуджей в топике
   * @param {String|Number} topic
   * @param {Array} positions
   * @returns {Promise}
   */
  const sort = async (topic, positions) => {
    await topicService.sort(topic, positions)

    isNeedUpdate.value = true
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
    isLoadedWoojs,
    isLoaded,

    isCreatingTopic,
    isCreatingWooj,
    isUpdatingTopic,
    isUpdatingWooj,

    fetchAll,
    fetchTopics,
    fetchWoojs,

    activateTopic,
    activateWooj,
    deactivateTopic,
    deactivateWooj,

    createTopic,
    updateTopic,
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
