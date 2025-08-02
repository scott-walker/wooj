import MediaDetector from "@utils/MediaDetector"

/**
 * Плагин определяет устройство или размеры/режимы экрана
 */
export default {
  /**
   * Установить
   * @param {Object} app
   * @param {Object} options
   */
  install: (app, options) => {
    options = options || {}

    app.provide("mediaDetector", new MediaDetector())
  },
}
