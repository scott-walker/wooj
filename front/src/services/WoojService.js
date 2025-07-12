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

  /**
   * Получить вуджи из корзины
   * @returns {Array} список вуджей
   */
  async getTrash() {
    try {
      const { data } = await this.http.get("woojs/trash")

      return data
    } catch {
      throw "Не удалось получить вуджи из корзины"
    }
  }

  /**
   * Получить закрепленные вуджи
   * @returns {Array} список вуджей
   */
  async getPinned() {
    try {
      const { data } = await this.http.get("woojs/pinned")

      return data
    } catch {
      throw "Не удалось получить закрепленные вуджи"
    }
  }

  /**
   * Создать вудж
   * @param {Object} data
   * @returns {Object} вудж
   */
  async create({ title, content }) {
    title = title || ""
    content = content || ""

    try {
      const { data } = await this.http.post("woojs", { title, content })

      return data
    } catch {
      throw "Не удалось создать вудж"
    }
  }

  /**
   * Обновить вудж
   * @param {Number} id
   * @param {Object} data
   * @returns {Object} вудж
   */
  async update(id, { title, content }) {
    try {
      const { data } = await this.http.put(`woojs/${id}`, { title, content })

      return data
    } catch {
      throw "Не удалось обновить вудж"
    }
  }

  /**
   * Отправить вудж в корзину
   * @param {Number} id
   * @returns {Object} вудж
   */
  async delete(id) {
    try {
      const { data } = await this.http.delete(`woojs/${id}`)

      return data
    } catch {
      throw "Не удалось удалить вудж"
    }
  }

  /**
   * Восстановить вудж из корзины
   * @param {Number} id
   * @returns {Object} вудж
   */
  async restore(id) {
    try {
      const { data } = await this.http.put(`woojs/${id}/restore`)

      return data
    } catch {
      throw "Не удалось восстановить вудж"
    }
  }

  /**
   * Очистить корзину
   */
  async clearTrash() {
    try {
      await this.http.delete("woojs/trash")
    } catch {
      throw "Не удалось очистить корзину"
    }
  }

  /**
   * Закрепить вудж
   * @param {Number} id
   * @returns {Object} вудж
   */
  async pin(id) {
    try {
      const { data } = await this.http.put(`woojs/${id}/pin`)

      return data
    } catch {
      throw "Не удалось закрепить вудж"
    }
  }

  /**
   * Открепить вудж
   * @param {Number} id
   * @returns {Object} вудж
   */
  async unpin(id) {
    try {
      const { data } = await this.http.put(`woojs/${id}/unpin`)

      return data
    } catch {
      throw "Не удалось открепить вудж"
    }
  }

  /**
   * Установить топики для вуджа
   * @param {Number} id
   * @returns {Object} вудж
   */
  async setTopics(id, map) {
    try {
      const { data } = await this.http.put(`woojs/${id}/set-topics`, { map })

      return data
    } catch {
      throw "Не удалось установить топики для вуджа"
    }
  }
}
