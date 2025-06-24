import { ref, computed, inject } from "vue"
import { defineStore } from "pinia"

/**
 * Стор вуджей
 */
export const useWoojStore = defineStore("wooj", () => {
  const { wooj: woojService } = inject("services")

  const woojs = ref([])
  const activeId = ref(null)
  const activeWooj = computed(() => woojs.value.find(({ id }) => id === activeId.value))
  const hasActiveWooj = computed(() => !!activeWooj.value)

  /**
   * Получить список вуджей
   */
  async function getAll() {
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
   * Активировать вудж
   * @param {Number} woojId
   */
  function activateWooj(woojId) {
    activeId.value = Number(woojId)

    // console.log({
    //   activeId: activeId.value,
    //   activeWooj: activeWooj.value,
    // })
  }

  /**
   * Деактивировать вудж
   */
  function deactivateWooj() {
    activeId.value = null
  }

  /**
   * Инициализация
   */
  async function init() {
    await getAll()
  }

  // Инициализировать
  init()

  return {
    woojs,
    activeId,
    activeWooj,
    hasActiveWooj,
    activateWooj,
    deactivateWooj,
    get,
    getAll,
  }
})
