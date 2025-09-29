/**
 * Тост
 *
 * @property {number} id - ID
 * @property {string} type - Тип
 * @property {string} message - Сообщение
 */
export interface Toast {
  id: number
  type: ToastType
  message: string
}

/**
 * Тип тоста
 */
export type ToastType = "info" | "success" | "alert"

/**
 * Опции тоста
 *
 * @property {ToastType} type - Тип тоста
 * @property {string} message - Сообщение
 * @property {number} duration - Длительность
 */
export interface ToastOptions {
  type?: ToastType
  message: string
  duration?: number
}
