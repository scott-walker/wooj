import type { Wooj, Topic, TopicType, User } from "./entities"
import type { AuthResponse, PaginatedResponse, WoojCreateOptions, WoojUpdateOptions } from "./api"

/**
 * Сервисы
 *
 * @property {UserService} userService - Сервис пользователя
 * @property {WoojService} woojService - Сервис вуджа
 * @property {TopicService} topicService - Сервис топика
 */
export interface Services {
  userService: UserService
  woojService: WoojService
  topicService: TopicService
}

/**
 * Сервис пользователя
 *
 * @property {function} setToken - Установить токен
 * @property {function} check - Проверить авторизацию
 * @property {function} register - Зарегистрировать пользователя
 * @property {function} login - Войти в систему
 * @property {function} logout - Выйти из системы
 * @property {function} changeAvatar - Поменять аватар
 * @property {function} update - Обновить данные пользователя
 * @property {function} resend - Отправить сообщение с подтверждением email заново
 */
export interface UserService {
  setToken(token: string | null): void
  check(): Promise<User>
  register(email: string, password: string): Promise<AuthResponse>
  login(email: string, password: string): Promise<AuthResponse>
  logout(): Promise<void>
  changeAvatar(avatar: File): Promise<User>
  update(fields: Partial<User>): Promise<User>
  resend(): Promise<void>
}

/**
 * Сервис вуджа
 *
 * @property {function} getAll - Получить все вуджи
 * @property {function} create - Создать вудж
 * @property {function} update - Обновить вудж
 * @property {function} delete - Удалить вудж
 * @property {function} restore - Восстановить вудж
 * @property {function} pin - Закрепить вудж
 * @property {function} unpin - Открепить вудж
 * @property {function} setTopics - Установить топики для вуджа
 * @property {function} clearTrash - Очистить корзину
 */
export interface WoojService {
  getAll(): Promise<Wooj[]>
  create(fields: WoojCreateOptions): Promise<Wooj>
  update(woojId: number, fields: WoojUpdateOptions): Promise<Wooj>
  delete(woojId: number): Promise<Wooj>
  restore(woojId: number): Promise<Wooj>
  pin(woojId: number): Promise<Wooj>
  unpin(woojId: number): Promise<Wooj>
  setTopics(woojId: number, topicsMap: Record<number, number>): Promise<Wooj>
  clearTrash(): Promise<void>
}

/**
 * Сервис топика
 *
 * @property {function} getAll - Получить все топики
 * @property {function} create - Создать топик
 * @property {function} update - Обновить топик
 * @property {function} delete - Удалить топик
 * @property {function} sort - Сортировать топик
 * @property {function} sortAll - Сортировать топик "все"
 * @property {function} sortPinned - Сортировать топик "избранное"
 */
export interface TopicService {
  getAll(): Promise<Topic[]>
  create(fields: { name: string; type: TopicType }): Promise<Topic>
  update(topicId: number, fields: { name?: string }): Promise<Topic>
  delete(topicId: number): Promise<Topic>
  sort(topic: string | number, positions: number[]): Promise<Topic>
  sortAll(positions: number[]): Promise<Topic>
  sortPinned(positions: number[]): Promise<Topic>
}
