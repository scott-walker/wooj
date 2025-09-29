import DeferredTimer from "@utils/DeferredTimer"
import type { App } from "vue"

/**
 * Плагин отложенного таймера
 */
export default {
  install: (app: App) => {
    const createDeferredTimer = () => new DeferredTimer()

    app.provide("createDeferredTimer", createDeferredTimer)
  },
}
