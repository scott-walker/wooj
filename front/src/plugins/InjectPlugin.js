/**
 * Плагин для внедрения зависимостей
 */
export default {
  /**
   * Установить
   * @param {Object} app
   * @param {Object} options
   */
  install: (app, options) => {
    options = options || {}

    app.provide("utils", options.utils || {})
    app.provide("services", options.services || {})
  },
}
