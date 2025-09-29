import { reactive } from "vue"
import { defineStore } from "pinia"
import type { Toast, ToastType, ToastOptions } from "@types"

/**
 * Стор для работы с нотификациями (тостами)
 */
export const useToastsStore = defineStore("toasts", () => {
  const toasts = reactive<Toast[]>([])

  /**
   * Добавить уведомление
   */
  const add = ({ type = "info", message, duration = 3 }: ToastOptions): void => {
    const id = Date.now() + Math.random()
    const durationMs = duration * 1000

    toasts.push({ id, type, message })

    setTimeout(() => remove(id), durationMs)
  }

  /**
   * Добавить тревожное уведомление
   */
  const alert = (message: string, errors?: string[], duration?: number): void => {
    let finalMessage = message

    if (errors && errors.length) {
      finalMessage = `<b>${message}:</b><br /> - ${errors.join("<br /> - ")}`
    }

    add({ type: "alert", message: finalMessage, duration })
  }

  /**
   * Добавить информационное уведомление
   */
  const info = (message: string, duration?: number): void => {
    add({ type: "info", message, duration })
  }

  /**
   * Добавить успешное уведомление
   */
  const success = (message: string, duration?: number): void => {
    add({ type: "success", message, duration })
  }

  /**
   * Удалить уведомление
   */
  const remove = (id: number): void => {
    const index = toasts.findIndex((t) => t.id === id)

    if (index !== -1) {
      toasts.splice(index, 1)
    }
  }

  return {
    toasts,
    alert,
    info,
    success,
    add,
    remove,
  }
})
