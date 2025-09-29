import type { App } from "vue"
import { register } from "swiper/element/bundle"
import Swiper from "@ui/Swiper.vue"

/**
 * Плагин для внедрения зависимостей
 */
export default {
  install: (app: App) => {
    register()

    app.component("Swiper", Swiper)
  },
}
