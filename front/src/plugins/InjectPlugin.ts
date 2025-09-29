import type { App } from "vue"

/**
 * Плагин для внедрения зависимостей
 */
export default {
  install: (app: App, options: Record<string, unknown>) => {
    options = options || {}

    app.provide("utils", options.utils || {})
    app.provide("services", options.services || {})

    for (const [name, directive] of Object.entries(options.directives || {})) {
      app.directive(name, directive)
    }
  },
}
