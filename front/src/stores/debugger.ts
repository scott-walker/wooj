import { ref } from "vue"
import { defineStore } from "pinia"

export interface DebugRecord {
  id: string
  timestamp: number
  type: "info" | "warning" | "error" | "debug"
  message: string
  data?: any
}

/**
 * Стор для отладки
 */
export const useDebuggerStore = defineStore("debugger", () => {
  const records = ref<DebugRecord[]>([])

  /**
   * Добавить запись
   */
  const push = (data: Partial<DebugRecord>): void => {
    const record: DebugRecord = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      type: "debug",
      message: "",
      ...data,
    }

    records.value.push(record)
  }

  /**
   * Добавить информационную запись
   */
  const info = (message: string, data?: any): void => {
    push({ type: "info", message, data })
  }

  /**
   * Добавить предупреждение
   */
  const warning = (message: string, data?: any): void => {
    push({ type: "warning", message, data })
  }

  /**
   * Добавить ошибку
   */
  const error = (message: string, data?: any): void => {
    push({ type: "error", message, data })
  }

  /**
   * Очистить записи
   */
  const clear = (): void => {
    records.value = []
  }

  return {
    records,
    push,
    info,
    warning,
    error,
    clear,
  }
})
