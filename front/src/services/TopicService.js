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

  /**
   * Создать топик
   * @param {Object} data
   * @returns {Object} топик
   */
  async create({ name }) {
    try {
      const { data } = await this.http.post("topics", { name })

      return data
    } catch {
      throw "Не удалось создать топик"
    }
  }

  /**
   * Обновить топик
   * @param {Number} id
   * @param {Object} data
   * @returns {Object} топик
   */
  async update(id, { name }) {
    try {
      const { data } = await this.http.put(`topics/${id}`, { name })

      return data
    } catch {
      throw "Не удалось обновить топик"
    }
  }

  /**
   * Обновить позиции вуджей в топике
   * @param {Number} id
   * @param {Array} positions
   * @returns {Object} топик
   */
  async sort(id, positions) {
    try {
      const { data } = await this.http.put(`topics/${id}/sort`, { positions })

      return data
    } catch {
      throw "Не удалось обновить позиции вуджей в топике"
    }
  }
}
