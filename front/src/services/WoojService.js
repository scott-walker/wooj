/**
 * Сервис для работы с вуджами
 * @property {Object} httpClient
 */
export default class WoojService {
  /**
   * HTTP клиент
   * @param {Object} httpClient
   */
  constructor(httpClient) {
    this.http = httpClient
  }

  /**
   * Получить вуджи
   * @returns {Array} список вуджей
   */
  async getAll() {
    try {
      const { data } = await this.http.get("woojs")

      return data
    } catch {
      throw "Не удалось получить вуджи"
    }
  }

  /**
   * Получить вудж по ID
   * @param {Number} id
   * @returns {Object} вудж
   */
  async get(id) {
    try {
      const { data } = await this.http.get(`woojs/${id}`)

      return data
    } catch {
      throw "Не удалось получить вудж"
    }
  }
}
