import type { HttpClient, TopicService as ITopicService, Topic, PaginatedResponse, ItemResponse } from "@types"

/**
 * Сервис для работы с топиками
 */
export default class TopicService implements ITopicService {
  http: HttpClient

  /**
   * HTTP клиент
   */
  constructor(httpClient: HttpClient) {
    this.http = httpClient
  }

  /**
   * Получить топики
   */
  async getAll() {
    try {
      const { data } = await this.http.get<PaginatedResponse<Topic>>("topics")

      return data
    } catch {
      throw "Не удалось получить топики"
    }
  }

  /**
   * Получить топик по ID
   */
  async get(id: number) {
    try {
      const { data } = await this.http.get<ItemResponse<Topic>>(`topics/${id}`)

      return data
    } catch {
      throw "Не удалось получить топик"
    }
  }

  /**
   * Создать топик
   */
  async create({ name }: { name: string }) {
    try {
      const { data } = await this.http.post<ItemResponse<Topic>>("topics", { name })

      return data
    } catch {
      throw "Не удалось создать топик"
    }
  }

  /**
   * Обновить топик
   */
  async update(id: number, { name }: { name: string }) {
    try {
      const { data } = await this.http.put<ItemResponse<Topic>>(`topics/${id}`, { name })

      return data
    } catch {
      throw "Не удалось обновить топик"
    }
  }

  /**
   * Удалить топик
   */
  async delete(id: number) {
    try {
      const { data } = await this.http.delete<ItemResponse<Topic>>(`topics/${id}`)

      return data
    } catch {
      throw "Не удалось удалить топик"
    }
  }

  /**
   * Обновить позиции вуджей в топике
   */
  async sort(topic: string | number, positions: number[]) {
    try {
      const { data } = await this.http.put<ItemResponse<Topic>>(`topics/${topic}/sort`, { positions })

      return data
    } catch {
      throw "Не удалось обновить позиции вуджей в топике"
    }
  }

  /**
   * Обновить позиции вуджей в топике "все"
   */
  async sortAll(positions: number[]) {
    return this.sort("all", positions)
  }

  /**
   * Обновить позиции вуджей в топике "все"
   */
  async sortPinned(positions: number[]) {
    return this.sort("pinned", positions)
  }
}
