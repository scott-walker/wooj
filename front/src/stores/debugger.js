import { reactive } from "vue"
import { defineStore } from "pinia"

/**
 * Стор для отладки
 */
export const useDebuggerStore = defineStore("debugger", () => {
  const records = reactive([])

  /**
   * Добавить
   * @param {Object}
   * @returns {void}
   */
  const push = (data) => {
    records.push(data)
  }

  return {
    records,
    push,
  }
})
