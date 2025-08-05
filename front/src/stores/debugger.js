import { ref } from "vue"
import { defineStore } from "pinia"

/**
 * Стор для отладки
 */
export const useDebuggerStore = defineStore("debugger", () => {
  const records = ref([])

  /**
   * Добавить запись
   * @param {Object}
   * @returns {void}
   */
  const push = (data) => {
    records.value.push(data)
  }

  /**
   * Очистить записи
   * @returns {void}
   */
  const clear = () => {
    records.value = []
  }

  return {
    records,
    push,
    clear,
  }
})
