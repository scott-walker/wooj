import type { User } from "./entities"

/**
 * Авторизация
 *
 * @property {string} token - Токен
 * @property {User} user - Пользователь
 */
export interface AuthResponse {
  token: string
  user: User
}

/**
 * Пагинированный ответ
 *
 * @property {T[]} data - Данные
 * @property {number} current_page - Текущая страница
 * @property {number} last_page - Последняя страница
 * @property {number} per_page - Количество элементов на странице
 * @property {number} total - Общее количество элементов
 */
export interface PaginatedResponse<T> {
  data: T[]
  links: Record<string, string>
  meta: {
    current_page: number
    last_page: number
    per_page: number
    from: number
    to: number
    total: number
  }
}

/**
 * Ответ на получение одного элемента
 *
 * @property {T} data - Данные
 */
export interface ItemResponse<T> {
  data: T
}

/**
 * Ответ на проверку авторизации
 *
 * @property {User} user - Пользователь
 */
export interface CheckResponse {
  user: User
}

/**
 * Ответ на изменение аватара
 *
 * @property {User} user - Пользователь
 */
export interface ChangeAvatarResponse {
  user: User
}

/**
 * Ответ на обновление пользователя
 *
 * @property {User} user - Пользователь
 */
export interface UpdateUserResponse {
  user: User
}

/**
 * Опции вуджа
 *
 * @property {string} title - Заголовок
 * @property {string} content - Контент
 * @property {number[]} topic_ids - ID топиков
 */
export interface WoojCreateOptions {
  title: string
  content: string
  topic_ids?: number[]
}

/**
 * Опции вуджа
 *
 * @property {string} title - Заголовок
 * @property {string} content - Контент
 * @property {number[]} topic_ids - ID топиков
 */
export interface WoojUpdateOptions {
  title?: string
  content?: string
  topic_ids?: number[]
}

/**
 * Опции топика
 *
 * @property {string} topic - Топик
 * @property {number} position - Позиция
 */
export interface TopicSortOptions {
  topic: string | number
  positions: number[]
}
