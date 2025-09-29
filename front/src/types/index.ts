/**
 * Пользователь
 *
 * @property {number} id - ID
 * @property {string} name - Имя
 * @property {string} email - Email
 * @property {string} avatar - Аватар (путь к файлу)
 * @property {boolean} is_verified - Флаг верификации (почта подтверждена)
 * @property {string} email_verified_at - Дата подтверждения email
 */
export interface User {
  id: number
  name: string
  email: string
  avatar?: string | null
  is_verified: boolean
  email_verified_at?: string | null
}

/**
 * Вудж
 *
 * @property {number} id - ID
 * @property {string} title - Заголовок
 * @property {string} content - Контент
 * @property {number} author_id - ID автора
 * @property {boolean} is_pinned - Флаг закрепления
 * @property {boolean} is_deleted - Флаг удаления
 * @property {number[]} topic_ids - ID топиков
 * @property {string} created_at - Дата создания
 * @property {string} updated_at - Дата обновления
 * @property {string} deleted_at - Дата удаления
 */
export interface Wooj {
  id: number
  title: string
  content: string
  author_id: number
  is_pinned: boolean
  is_deleted: boolean
  topic_ids: number[]
  created_at: string
  updated_at: string
  deleted_at?: string | null
}

/**
 * Топик
 *
 * @property {number} id - ID
 * @property {string} type - Тип
 * @property {string} name - Название
 * @property {number} author_id - ID автора
 * @property {number[]} wooj_positions - Позиции вуджей
 * @property {string} created_at - Дата создания
 * @property {string} updated_at - Дата обновления
 */
export interface Topic {
  id: number
  type: TopicType
  name: string
  author_id: number
  wooj_positions: number[]
  created_at: string
  updated_at: string
}

/**
 * Тип топика
 */
export type TopicType = "all" | "pinned" | "public" | "custom"

/**
 * Связь вуджа с топиком
 *
 * @property {number} id - ID
 * @property {number} wooj_id - ID вуджа
 * @property {number} topic_id - ID топика
 * @property {number} position - Позиция
 */
export interface WoojTopic {
  id: number
  wooj_id: number
  topic_id: number
  position: number
}

/**
 * Тост
 *
 * @property {number} id - ID
 * @property {string} type - Тип
 * @property {string} message - Сообщение
 */
export interface Toast {
  id: number
  type: ToastType
  message: string
}

/**
 * Тип тоста
 */
export type ToastType = "info" | "success" | "alert"

/**
 * Медиа точки
 *
 * @property {number} mobile - Мобильная
 * @property {number} tablet - Планшет
 * @property {number} desktop - Десктоп
 * @property {number} widescreen - widescreen
 * @property {number} fullhd - fullhd
 */
export interface MediaBreakpoints {
  mobile: number
  tablet: number
  desktop: number
  widescreen: number
  fullhd: number
}

/**
 * Состояние макета
 *
 * @property {boolean} isSidebarOpen - Флаг открытия sidebar
 * @property {string} activeSection - Активная секция
 * @property {number} screenWidth - Ширина экрана
 * @property {number} screenHeight - Высота экрана
 * @property {string} breakpoint - Медиа точка
 */
export interface LayoutState {
  isSidebarOpen: boolean
  activeSection: string | null
  screenWidth: number
  screenHeight: number
  breakpoint: string
}

/**
 * API ответ
 *
 * @property {T} data - Данные
 * @property {string} message - Сообщение
 * @property {string[]} errors - Ошибки
 */
export interface ApiResponse<T = any> {
  data: T
  message?: string
  errors?: string[]
}

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
  current_page: number
  last_page: number
  per_page: number
  total: number
}

/**
 * Логин
 *
 * @property {string} email - Email
 * @property {string} password - Пароль
 */
export interface LoginForm {
  email: string
  password: string
}

/**
 * Регистрация
 *
 * @property {string} email - Email
 * @property {string} password - Пароль
 * @property {string} password_confirmation - Подтверждение пароля
 */
export interface RegisterForm {
  name: string
  email: string
  password: string
  password_confirmation: string
}

/**
 * Вудж
 *
 * @property {string} title - Заголовок
 * @property {string} content - Контент
 * @property {number[]} topic_ids - ID топиков
 */
export interface WoojForm {
  title: string
  content: string
  topic_ids?: number[]
}

/**
 * Топик
 *
 * @property {string} name - Название
 * @property {string} type - Тип
 */
export interface TopicForm {
  name: string
  type: TopicType
}

/**
 * HTTP клиент
 *
 * @property {string} baseUrl - Базовый URL
 * @property {string} token - Токен
 * @property {function} get - GET запрос
 * @property {function} post - POST запрос
 * @property {function} put - PUT запрос
 * @property {function} delete - DELETE запрос
 */
export interface HttpClient {
  baseUrl: string
  token?: string | null
  get<T = any>(url: string, config?: any): Promise<T>
  post<T = any>(url: string, data?: any, config?: any): Promise<T>
  put<T = any>(url: string, data?: any, config?: any): Promise<T>
  delete<T = any>(url: string, config?: any): Promise<T>
}

/**
 * Хранилище
 *
 * @property {function} get - GET запрос
 * @property {function} set - SET запрос
 * @property {function} remove - REMOVE запрос
 * @property {function} clear - CLEAR запрос
 */
export interface Storage {
  get<T = any>(key: string, defaultValue?: T): T
  set<T = any>(key: string, value: T): T
  remove(key: string): void
  clear(): void
}

/**
 * Утилиты
 *
 * @property {HttpClient} httpClient - HTTP клиент
 * @property {Storage} storage - Хранилище
 */
export interface Utils {
  httpClient: HttpClient
  storage: Storage
}

/**
 * Сервисы
 *
 * @property {any} userService - Сервис пользователя
 * @property {any} woojService - Сервис вуджа
 * @property {any} topicService - Сервис топика
 */
export interface Services {
  userService: any // TODO: типизировать сервисы отдельно
  woojService: any
  topicService: any
}

/**
 * Состояние пользователя
 *
 * @property {string} token - Токен
 * @property {User} user - Пользователь
 * @property {number} resendTimer - Таймер отправки
 */
export interface UserStoreState {
  token: string | null
  user: User | Record<string, never>
  resendTimer: number | null
}

/**
 * Состояние вуджей
 *
 * @property {Topic[]} topics - Топики
 * @property {Wooj[]} woojs - Вуджи
 * @property {Record<number, boolean>} pinnedWoojsMap - Карта закрепленных вуджей
 * @property {Record<number, boolean>} removedWoojsMap - Карта удаленных вуджей
 * @property {number} activeTopicId - Активный топик
 * @property {number} activeWoojId - Активный вудж
 * @property {boolean} isNeedUpdate - Флаг необходимости обновления
 * @property {boolean} isLoadedTopics - Флаг загрузки топиков
 * @property {boolean} isLoaded - Флаг загрузки
 */
export interface WoojsStoreState {
  topics: Topic[]
  woojs: Wooj[]
  pinnedWoojsMap: Record<number, boolean>
  removedWoojsMap: Record<number, boolean>
  activeTopicId: number | null
  activeWoojId: number | null
  isNeedUpdate: boolean
  isLoadedTopics: boolean
  isLoaded: boolean
  isCreatingTopic: boolean
  isCreatingWooj: boolean
  isUpdatingTopic: boolean
  isUpdatingWooj: boolean
}

/**
 * Состояние тостов
 *
 * @property {Toast[]} toasts - Тосты
 */
export interface ToastsStoreState {
  toasts: Toast[]
}

/**
 * Состояние макета
 *
 * @property {boolean} isOpen - Флаг открытия sidebar
 * @property {boolean} isCollapsed - Флаг свернутости sidebar
 * @property {number} width - Ширина экрана
 * @property {number} height - Высота экрана
 * @property {string} breakpoint - Медиа точка
 */
export interface LayoutStoreState {
  sidebar: {
    isOpen: boolean
    isCollapsed: boolean
  }
  screen: {
    width: number
    height: number
    breakpoint: string
  }
  theme: string
}

/**
 * Состояние медиа
 *
 * @property {MediaBreakpoints} breakpoints - Медиа точки
 * @property {number} width - Ширина экрана
 * @property {number} height - Высота экрана
 * @property {string} breakpoint - Медиа точка
 * @property {boolean} isMobile - Флаг мобильного устройства
 * @property {boolean} isTablet - Флаг планшетного устройства
 * @property {boolean} isDesktop - Флаг десктопного устройства
 */
export interface MediaStoreState {
  breakpoints: MediaBreakpoints
  screen: {
    width: number
    height: number
  }
  breakpoint: string
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

/**
 * Опции тоста
 *
 * @property {ToastType} type - Тип тоста
 * @property {string} message - Сообщение
 * @property {number} duration - Длительность
 */
export interface ToastOptions {
  type?: ToastType
  message: string
  duration?: number
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
