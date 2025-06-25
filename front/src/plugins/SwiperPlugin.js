import { register } from "swiper/element/bundle"
import Swiper from "@ui/Swiper.vue"

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

    register()

    app.component("Swiper", Swiper)
  },
}
