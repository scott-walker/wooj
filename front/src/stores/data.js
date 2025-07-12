import { ref, computed, inject } from "vue"
import { defineStore } from "pinia"
import { useRouter } from "vue-router"

/**
 * Стор вуджей
 */
export default defineStore("data", () => {
  const { woojService, topicService } = inject("services")
  const router = useRouter()

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
  const topicPublic = computed(() => topics.value.find((topic) => topic.type === TOPIC_TYPE_PUBLIC))
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
  // const pinnedWoojs = computed(() => visibleWoojs.value.filter((wooj) => wooj.is_pinned))
  const removedWoojs = computed(() => normalizedWoojs.value.filter((wooj) => wooj.is_deleted))

  const isLoadedTopics = ref(false)
  const isLoadedWoojs = ref(false)
  const isLoaded = computed(() => isLoadedTopics.value && isLoadedWoojs.value)

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

    await fetchTopics(options)
    await fetchWoojs(options)
  }

  /**
   * Создать топик
   */
  // async function createTopic({ name }) {
  //   try {
  //     topics.value = await topicService.create({ name })

  //     await fetchAll()
  //   } catch (message) {
  //     alert(message)
  //   }
  // }

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
    await fetchAll({ quiet: true })
  }

  /**
   * Открепить вудж
   * @param {Object} wooj
   * @returns {Promise}
   */
  const unpin = async (wooj) => {
    pinnedWoojsMap.value[wooj.id] = false

    await woojService.unpin(wooj.id)
    await fetchAll({ quiet: true })
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
    // await fetchWoojs({ quiet: true })
  }

  /**
   * Восстановить из корзины
   * @param {Object} wooj
   * @returns {Promise}
   */
  const restore = async (wooj) => {
    removedWoojsMap.value[wooj.id] = false

    await woojService.restore(wooj.id)
    // await fetchWoojs({ quiet: true })
  }

  /**
   * Очистить корзину
   * @returns {Promise}
   */
  const clearTrash = async () => {
    await woojService.clearTrash()
    await fetchAll({ quiet: true })
  }

  /**
   * Применить сортировку вуджей в топике
   * @param {String|Number} topic
   * @param {Array} positions
   * @returns {Promise}
   */
  const sort = async (topic, positions) => {
    await topicService.sort(topic, positions)
    await fetchAll({ quiet: true })
  }

  /**
   * Редактировать вудж
   * @param {Object} wooj
   * @returns {void}
   */
  const edit = (wooj) => {
    router.push({ name: "Wooj", params: { woojId: wooj.id } })
  }

  // Собрать все
  // fetchAll()

  return {
    topics,
    woojs,

    topicAll,
    topicPinned,
    topicPublic,
    customTopics,

    activeTopicId,
    activeWoojId,
    activeTopic,
    activeWooj,
    activeWoojs,
    allWoojs,
    pinnedWoojs,
    removedWoojs,

    isLoadedTopics,
    isLoadedWoojs,
    isLoaded,

    fetchAll,
    fetchTopics,
    fetchWoojs,

    activateTopic,
    activateWooj,
    deactivateTopic,
    deactivateWooj,

    // createTopic,

    pin,
    unpin,
    togglePin,
    remove,
    restore,
    clearTrash,
    sort,
    edit,
  }
})
