import type { Wooj, Topic, TopicType } from "./entities"
import type { WoojCreateOptions, WoojUpdateOptions } from "./api"

/**
 * Сервисы
 *
 * @property {any} userService - Сервис пользователя
 * @property {any} woojService - Сервис вуджа
 * @property {any} topicService - Сервис топика
 */
export interface Services {
  userService: any // TODO: типизировать сервисы отдельно
  woojService: WoojService
  topicService: TopicService
}

/**
 * Сервис вуджа
 *
 * @property {any} getAll - Получить все вуджи
 * @property {any} create - Создать вудж
 * @property {any} update - Обновить вудж
 * @property {any} delete - Удалить вудж
 * @property {any} restore - Восстановить вудж
 * @property {any} pin - Закрепить вудж
 * @property {any} unpin - Открепить вудж
 * @property {any} setTopics - Установить топики для вуджа
 * @property {any} clearTrash - Очистить корзину
 */
interface WoojService {
  getAll(): Promise<Wooj[]>
  create(fields: WoojCreateOptions): Promise<Wooj>
  update(woojId: number, fields: WoojUpdateOptions): Promise<Wooj>
  delete(woojId: number): Promise<void>
  restore(woojId: number): Promise<void>
  pin(woojId: number): Promise<void>
  unpin(woojId: number): Promise<void>
  setTopics(woojId: number, topicsMap: Record<number, number>): Promise<Wooj>
  clearTrash(): Promise<void>
}

/**
 * Сервис топика
 *
 * @property {any} getAll - Получить все топики
 * @property {any} create - Создать топик
 * @property {any} update - Обновить топик
 * @property {any} delete - Удалить топик
 * @property {any} sort - Сортировать топик
 */
interface TopicService {
  getAll(): Promise<Topic[]>
  create(fields: { name: string; type: TopicType }): Promise<Topic>
  update(topicId: number, fields: { name?: string }): Promise<Topic>
  delete(topicId: number): Promise<void>
  sort(topic: string | number, positions: number[]): Promise<void>
}
