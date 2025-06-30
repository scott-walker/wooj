import { ref, computed, inject } from "vue"
import { defineStore } from "pinia"

/**
 * Стор вуджей
 */
export const useWoojStore = defineStore("wooj", () => {
  const { woojService, topicService } = inject("services")

  const topics = ref([])
  const woojs = ref([])
  const activeTopicId = ref(null)
  const activeWoojId = ref(null)
  const activeTopic = computed(() => topics.value.find(({ id }) => id === activeTopicId.value))
  const activeWooj = computed(() => woojs.value.find(({ id }) => id === activeWoojId.value))

  /**
   * Получить список топиков
   */
  async function getTopics() {
    try {
      topics.value = await topicService.getAll()
    } catch (message) {
      alert(message)
    }
  }

  /**
   * Получить список вуджей
   */
  async function getWoojs() {
    try {
      woojs.value = await woojService.getAll()
    } catch (message) {
      alert(message)
    }
  }

  /**
   * Получить вудж по ID
   * @param {Number} id
   */
  async function get(id) {
    try {
      return await woojService.get(id)
    } catch (message) {
      alert(message)
    }
  }

  /**
   * Активировать топик
   * @param {Number} topicId
   */
  function activateTopic(topicId) {
    activeTopicId.value = Number(topicId)
  }

  /**
   * Активировать вудж
   * @param {Number} woojId
   */
  function activateWooj(woojId) {
    activeWoojId.value = Number(woojId)
  }

  /**
   * Деактивировать топик
   */
  function deactivateTopic() {
    activateTopic(null)
  }

  /**
   * Деактивировать вудж
   */
  function deactivateWooj() {
    activateWooj(null)
  }

  /**
   * Инициализация
   */
  async function init() {
    await getTopics()
    await getWoojs()
  }

  // Инициализировать
  init()

  return {
    topics,
    woojs,
    activeTopicId,
    activeWoojId,
    activeTopic,
    activeWooj,
    activateTopic,
    activateWooj,
    deactivateTopic,
    deactivateWooj,
    get,
  }
})
