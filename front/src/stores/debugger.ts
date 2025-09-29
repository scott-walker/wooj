import { ref } from "vue"
import { defineStore } from "pinia"
import type { DebugRecord } from "@types"

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
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
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
  const info = (message: string, data?: unknown): void => {
    push({ type: "info", message, data })
  }

  /**
   * Добавить предупреждение
   */
  const warning = (message: string, data?: unknown): void => {
    push({ type: "warning", message, data })
  }

  /**
   * Добавить ошибку
   */
  const error = (message: string, data?: unknown): void => {
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
