/**
 * Сервис для работы с топиками
 * @property {Object} httpClient
 */
export default class TopicService {
  /**
   * HTTP клиент
   * @param {Object} httpClient
   */
  constructor(httpClient) {
    this.http = httpClient
  }

  /**
   * Получить топики
   * @returns {Array} список топиков
   */
  async getAll() {
    try {
      const { data } = await this.http.get("topics")

      return data
    } catch {
      throw "Не удалось получить топики"
    }
  }

  /**
   * Получить топик по ID
   * @param {Number} id
   * @returns {Object} топик
   */
  async get(id) {
    try {
      const { data } = await this.http.get(`topics/${id}`)

      return data
    } catch {
      throw "Не удалось получить топик"
    }
  }
}
