import { ref, computed, inject } from "vue"
import { defineStore } from "pinia"
import { useToastsStore } from "@stores/toasts"
import type { Wooj, Topic, TopicType, WoojCreateOptions, WoojUpdateOptions, Services } from "@types"

/**
 * Стор вуджей
 */
export const useWoojsStore = defineStore("woojs", () => {
  const { woojService, topicService } = inject<Services>("services")!
  const toastsStore = useToastsStore()

  const TOPIC_TYPE_ALL: TopicType = "all"
  const TOPIC_TYPE_PINNED: TopicType = "pinned"
  const TOPIC_TYPE_PUBLIC: TopicType = "public"
  const TOPIC_TYPE_CUSTOM: TopicType = "custom"

  const topics = ref<Topic[]>([])
  const woojs = ref<Wooj[]>([])

  const pinnedWoojsMap = ref<Record<number, boolean>>({})
  const removedWoojsMap = ref<Record<number, boolean>>({})

  const topicAll = computed((): Topic | undefined => topics.value.find((topic) => topic.type === TOPIC_TYPE_ALL))
  const topicPinned = computed((): Topic | undefined => topics.value.find((topic) => topic.type === TOPIC_TYPE_PINNED))
  const topicPublished = computed((): Topic | undefined =>
    topics.value.find((topic) => topic.type === TOPIC_TYPE_PUBLIC),
  )
  const customTopics = computed((): Topic[] => topics.value.filter((topic) => topic.type === TOPIC_TYPE_CUSTOM))

  // Нормализованные вуджи
  const normalizedWoojs = computed((): Wooj[] => {
    const isPinned = (wooj: Wooj): boolean => {
      return pinnedWoojsMap.value[wooj.id] !== undefined ? !!pinnedWoojsMap.value[wooj.id] : wooj.is_pinned
    }
    const isRemoved = (wooj: Wooj): boolean => {
      return removedWoojsMap.value[wooj.id] !== undefined ? !!removedWoojsMap.value[wooj.id] : wooj.is_deleted
    }

    return woojs.value.map((wooj) => ({
      ...wooj,
      is_pinned: isPinned(wooj),
      is_deleted: isRemoved(wooj),
    }))
  })

  // Видимые вуджи (не удаленные)
  const visibleWoojs = computed((): Wooj[] => normalizedWoojs.value.filter((wooj) => !wooj.is_deleted))

  // Карта wooj.id => wooj
  const woojsMap = computed((): Record<number, Wooj> => {
    return visibleWoojs.value.reduce(
      (map, wooj) => {
        map[wooj.id] = wooj
        return map
      },
      {} as Record<number, Wooj>,
    )
  })

  // Карта topic.id => woojs
  const topicWoojsMap = computed((): Record<number, Wooj[]> => {
    return topics.value.reduce(
      (map, topic) => {
        const topicWoojs: Wooj[] = []

        for (const woojId of topic.wooj_positions) {
          if (woojsMap.value[woojId]) {
            topicWoojs.push(woojsMap.value[woojId])
          }
        }

        map[topic.id] = topicWoojs
        return map
      },
      {} as Record<number, Wooj[]>,
    )
  })

  const activeTopicId = ref<number | null>(null)
  const activeWoojId = ref<number | null>(null)

  const activeTopic = computed((): Topic | undefined => topics.value.find(({ id }) => id === activeTopicId.value))
  const activeWooj = computed((): Wooj | undefined =>
    activeWoojId.value ? woojsMap.value[activeWoojId.value] : undefined,
  )
  const activeWoojs = computed((): Wooj[] =>
    activeTopicId.value ? topicWoojsMap.value[activeTopicId.value] || [] : [],
  )
  const allWoojs = computed((): Wooj[] => (topicAll.value ? topicWoojsMap.value[topicAll.value.id] || [] : []))
  const pinnedWoojs = computed((): Wooj[] => {
    const woojs = topicPinned.value ? topicWoojsMap.value[topicPinned.value.id] || [] : []
    return woojs.filter((wooj) => wooj.is_pinned)
  })
  const publishedWoojs = computed((): Wooj[] =>
    topicPublished.value ? topicWoojsMap.value[topicPublished.value.id] || [] : [],
  )
  const removedWoojs = computed((): Wooj[] => normalizedWoojs.value.filter((wooj) => wooj.is_deleted))

  const hasActiveTopic = computed((): boolean => !!activeTopic.value?.id)
  const hasActiveWooj = computed((): boolean => !!activeWooj.value?.id)

  // Требуется ли обновление списка вуджей и топиков
  const isNeedUpdate = ref<boolean>(false)

  const isLoadedTopics = ref<boolean>(false)
  const isLoaded = ref<boolean>(false)

  const isCreatingTopic = ref<boolean>(false)
  const isCreatingWooj = ref<boolean>(false)
  const isUpdatingTopic = ref<boolean>(false)
  const isUpdatingWooj = ref<boolean>(false)

  /**
   * Собрать топики и вуджы
   */
  async function fetchAll(): Promise<void> {
    isLoaded.value = false

    try {
      const data = await Promise.all([topicService.getAll(), woojService.getAll()])

      topics.value = data[0]
      woojs.value = data[1]
    } catch (message: any) {
      toastsStore.alert(message)
    }

    isNeedUpdate.value = false
    isLoaded.value = true
    isLoadedTopics.value = true
  }

  /**
   * Создать топик
   */
  async function createTopic(fields: { name: string }): Promise<Topic | null> {
    isCreatingTopic.value = true
    isLoadedTopics.value = false

    let topic: Topic | null = null

    try {
      topic = await topicService.create({ ...fields, type: TOPIC_TYPE_CUSTOM })
      toastsStore.success("Вы создали новый топик 🙌🔥")

      await fetchAll()
    } catch (message: any) {
      toastsStore.alert(message)
    }

    isLoadedTopics.value = true
    isCreatingTopic.value = false

    return topic
  }

  /**
   * Обновить топик
   */
  const updateTopic = async (topicId: number, fields: { name?: string }): Promise<Topic | null> => {
    isUpdatingTopic.value = true
    isLoadedTopics.value = false

    let topic: Topic | null = null

    try {
      topic = await topicService.update(topicId, fields)
      toastsStore.info("Топик обновлен")

      await fetchAll()
    } catch (message: any) {
      toastsStore.alert(message)
    }

    isLoadedTopics.value = true
    isUpdatingTopic.value = false

    return topic
  }

  /**
   * Удалить топик
   */
  const deleteTopic = async (topicId: number): Promise<void> => {
    isUpdatingTopic.value = true
    isLoadedTopics.value = false

    try {
      await topicService.delete(topicId)
      toastsStore.info("Топик удален")

      await fetchAll()
    } catch (message: any) {
      toastsStore.alert(message)
    }

    isLoadedTopics.value = true
    isUpdatingTopic.value = false
  }

  /**
   * Создать вудж
   */
  const createWooj = async (fields: WoojCreateOptions): Promise<Wooj | null> => {
    isCreatingWooj.value = true

    let wooj: Wooj | null = null

    try {
      wooj = await woojService.create(fields)
      toastsStore.success("Вы создали новый вуууудж 🤠👍")

      await fetchAll()
    } catch (message: any) {
      toastsStore.alert(message)
    }

    isCreatingWooj.value = false

    return wooj
  }

  /**
   * Обновить вудж
   */
  const updateWooj = async (woojId: number, fields: WoojUpdateOptions): Promise<Wooj | null> => {
    isUpdatingWooj.value = true

    let wooj: Wooj | null = null

    try {
      wooj = await woojService.update(woojId, fields)
      isNeedUpdate.value = true
    } catch (message: any) {
      toastsStore.alert(message)
    }

    isUpdatingWooj.value = false

    return wooj
  }

  /**
   * Установка топиков для вуджа
   */
  const setWoojTopics = async (woojId: number, topicsMap: Record<number, number>): Promise<Wooj | null> => {
    isUpdatingWooj.value = true

    let wooj: Wooj | null = null

    try {
      wooj = await woojService.setTopics(woojId, topicsMap)
      isNeedUpdate.value = true
    } catch (message: any) {
      toastsStore.alert(message)
    }

    isUpdatingWooj.value = false

    return wooj
  }

  /**
   * Активировать топик
   */
  function activateTopic(topicId: number | null): void {
    activeTopicId.value = topicId
  }

  /**
   * Активировать вудж
   */
  function activateWooj(woojId: number | null): void {
    activeWoojId.value = woojId
  }

  /**
   * Деактивировать топик
   */
  function deactivateTopic(): void {
    activateTopic(null)
  }

  /**
   * Деактивировать вудж
   */
  function deactivateWooj(): void {
    activateWooj(null)
  }

  /**
   * Закрепить вудж
   */
  const pin = async (wooj: Wooj): Promise<void> => {
    pinnedWoojsMap.value[wooj.id] = true

    try {
      await woojService.pin(wooj.id)
    } catch (message: any) {
      toastsStore.alert(message)
    }

    isNeedUpdate.value = true
  }

  /**
   * Открепить вудж
   */
  const unpin = async (wooj: Wooj): Promise<void> => {
    pinnedWoojsMap.value[wooj.id] = false

    try {
      await woojService.unpin(wooj.id)
    } catch (message: any) {
      toastsStore.alert(message)
    }

    isNeedUpdate.value = true
  }

  /**
   * Закрепить / открепить
   */
  const togglePin = (wooj: Wooj): Promise<void> => (wooj.is_pinned ? unpin(wooj) : pin(wooj))

  /**
   * Переместить в корзину
   */
  const remove = async (wooj: Wooj): Promise<void> => {
    removedWoojsMap.value[wooj.id] = true

    try {
      await woojService.delete(wooj.id)
      toastsStore.info("Вудж отправлен в корзину")
    } catch (message: any) {
      toastsStore.alert(message)
    }
  }

  /**
   * Восстановить из корзины
   */
  const restore = async (wooj: Wooj): Promise<void> => {
    removedWoojsMap.value[wooj.id] = false

    try {
      await woojService.restore(wooj.id)
      toastsStore.info("Вудж восстановлен из корзины")
    } catch (message: any) {
      toastsStore.alert(message)
    }
  }

  /**
   * Применить сортировку вуджей в топике
   */
  const sort = async (topic: string | number, positions: number[]): Promise<void> => {
    try {
      await topicService.sort(topic, positions)
    } catch (message: any) {
      toastsStore.alert(message)
    }

    isNeedUpdate.value = true
  }

  /**
   * Очистить корзину
   */
  const clearTrash = async (): Promise<void> => {
    try {
      await woojService.clearTrash()
      toastsStore.success("Корзины очищена 💩✨")

      await fetchAll()
    } catch (message: any) {
      toastsStore.alert(message)
    }
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
    isLoaded,

    isCreatingTopic,
    isCreatingWooj,
    isUpdatingTopic,
    isUpdatingWooj,

    fetchAll,

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
