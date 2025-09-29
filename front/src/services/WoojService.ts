import type { HttpClient, ItemResponse, WoojService as IWoojService, PaginatedResponse, Wooj } from "@types"

/**
 * Сервис для работы с вуджами
 */
export default class WoojService implements IWoojService {
  http: HttpClient

  /**
   * HTTP клиент
   */
  constructor(httpClient: HttpClient) {
    this.http = httpClient
  }

  /**
   * Получить вуджи
   */
  async getAll() {
    try {
      const { data } = await this.http.get<PaginatedResponse<Wooj>>("woojs")

      return data
    } catch {
      throw "Не удалось получить вуджи"
    }
  }

  /**
   * Получить вудж по ID
   */
  async get(id: number) {
    try {
      const { data } = await this.http.get<ItemResponse<Wooj>>(`woojs/${id}`)

      return data
    } catch {
      throw "Не удалось получить вудж"
    }
  }

  /**
   * Получить вуджи из корзины
   */
  async getTrash() {
    try {
      const { data } = await this.http.get<ItemResponse<Wooj[]>>(`woojs/trash`)

      return data
    } catch {
      throw "Не удалось получить вуджи из корзины"
    }
  }

  /**
   * Получить закрепленные вуджи
   */
  async getPinned() {
    try {
      const { data } = await this.http.get<ItemResponse<Wooj[]>>(`woojs/pinned`)

      return data
    } catch {
      throw "Не удалось получить закрепленные вуджи"
    }
  }

  /**
   * Получить вуджи по топику
   */
  async getByTopic(id: number) {
    try {
      const { data } = await this.http.get<ItemResponse<Wooj[]>>(`woojs/topic/${id}`)

      return data
    } catch {
      throw "Не удалось получить вуджи по топику"
    }
  }

  /**
   * Создать вудж
   */
  async create({ title, content }: { title: string; content: string }) {
    title = title || ""
    content = content || ""

    try {
      const { data } = await this.http.post<ItemResponse<Wooj>>("woojs", { title, content })

      return data
    } catch {
      throw "Не удалось создать вудж"
    }
  }

  /**
   * Обновить вудж
   */
  async update(id: number, { title, content }: { title: string; content: string }) {
    try {
      const { data } = await this.http.put<ItemResponse<Wooj>>(`woojs/${id}`, { title, content })

      return data
    } catch {
      throw "Не удалось обновить вудж"
    }
  }

  /**
   * Отправить вудж в корзину
   */
  async delete(id: number) {
    try {
      const { data } = await this.http.delete<ItemResponse<Wooj>>(`woojs/${id}`)

      return data
    } catch {
      throw "Не удалось удалить вудж"
    }
  }

  /**
   * Восстановить вудж из корзины
   */
  async restore(id: number) {
    try {
      const { data } = await this.http.put<ItemResponse<Wooj>>(`woojs/${id}/restore`)

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
   */
  async pin(id: number) {
    try {
      const { data } = await this.http.put<ItemResponse<Wooj>>(`woojs/${id}/pin`)

      return data
    } catch {
      throw "Не удалось закрепить вудж"
    }
  }

  /**
   * Открепить вудж
   */
  async unpin(id: number) {
    try {
      const { data } = await this.http.put<ItemResponse<Wooj>>(`woojs/${id}/unpin`)

      return data
    } catch {
      throw "Не удалось открепить вудж"
    }
  }

  /**
   * Установить топики для вуджа
   */
  async setTopics(id: number, map: Record<number, number>) {
    try {
      const { data } = await this.http.put<ItemResponse<Wooj>>(`woojs/${id}/set-topics`, { map })

      return data
    } catch {
      throw "Не удалось установить топики для вуджа"
    }
  }
}
