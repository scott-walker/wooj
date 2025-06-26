import DeferredTimer from "@utils/DeferredTimer"

/**
 * Плагин отложенного таймера
 */
export default {
  /**
   * Установить
   * @param {Object} app
   * @param {Object} options
   */
  install: (app, options) => {
    options = options || {}

    const createDeferredTimer = () => new DeferredTimer()

    app.provide("createDeferredTimer", createDeferredTimer)
  },
}
