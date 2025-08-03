import HttpClient from "./HttpClient"
import Storage from "./Storage"
import MediaDetector from "./MediaDetector"

/**
 * Инициализировать утилиты
 * @param {Object} config конфигурация
 */
export default (config) => {
  config = config || {}

  const httpClient = new HttpClient(config.httpClient || {})
  const storage = new Storage(config.storage || {})
  const mediaDetector = new MediaDetector(config.mediaDetector || {})

  return {
    httpClient,
    storage,
    mediaDetector,
  }
}
