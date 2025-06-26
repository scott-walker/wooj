/**
 * Отложенный таймер
 */
export default class DeferredTimer {
  /**
   * Init
   */
  constructor() {
    this.timer = null
  }

  /**
   * Запустить
   * @param {Number} timeout
   * @param {Function} cb
   */
  start(timeout, cb) {
    if (!timeout) {
      throw "DeferredTimer: Set timeout"
    }
    if (!cb) {
      throw "DeferredTimer: Set callback funciton"
    }

    this.timer && clearTimeout(this.timer)
    this.timer = setTimeout(cb, timeout)
  }
}
