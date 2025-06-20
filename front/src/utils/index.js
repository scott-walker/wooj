import HttpClient from "./HttpClient"
import Storage from "./Storage"

/**
 * Инициализировать утилиты
 * @param {Object} config конфигурация
 */
export default (config) => {
  config = config || {}

  const httpClient = new HttpClient(config.httpClient || {})
  const storage = new Storage(config.storage || {})

  return {
    httpClient,
    storage,
  }
}
