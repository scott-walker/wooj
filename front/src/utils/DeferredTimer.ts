import type { DeferredTimer as IDeferredTimer } from "@/types/utils"

/**
 * Отложенный таймер
 */
export default class DeferredTimer implements IDeferredTimer {
  timer: NodeJS.Timeout | null

  /**
   * Инициализировать
   */
  constructor() {
    this.timer = null
  }

  /**
   * Запустить
   * @param {Number} timeout
   * @param {Function} cb
   */
  start(timeout: number, cb: () => void): void {
    if (!timeout) {
      throw new Error("DeferredTimer: Set timeout")
    }
    if (!cb) {
      throw new Error("DeferredTimer: Set callback function")
    }

    this.stop()
    this.timer = setTimeout(cb, timeout)
  }

  /**
   * Остановить таймер
   */
  stop(): void {
    this.timer && clearTimeout(this.timer)
  }
}
