import type { AxiosInstance, AxiosRequestConfig } from "axios"

/**
 * Утилиты
 *
 * @property {HttpClient} httpClient - HTTP клиент
 * @property {Storage} storage - Хранилище
 * @property {MediaDetector} mediaDetector - Медиа детектор
 */
export interface Utils {
  httpClient: HttpClient
  storage: Storage
  mediaDetector: MediaDetector
}

/**
 * Опции утилит
 *
 * @property {HttpClientOptions} httpClient - Опции HTTP клиента
 * @property {StorageOptions} storage - Опции хранилища
 * @property {MediaDetectorOptions} mediaDetector - Опции медиа детектора
 */
export interface UtilsOptions {
  httpClient: HttpClientOptions
  storage: StorageOptions
  mediaDetector: MediaDetectorOptions
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
  options: StorageOptions
  get<T = unknown>(key: string, defaultValue?: T): T
  set<T = unknown>(key: string, value: T): T
  remove(key: string): void
  clear(): void
}

export interface StorageOptions {
  options: Record<string, unknown>
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
  options: HttpClientOptions
  instance: AxiosInstance
  token?: string | null
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
  put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>
}

/**
 * Ошибка HTTP клиента
 *
 * @property {string} message - Сообщение
 * @property {string[]} errors - Ошибки
 */
export interface HttpClientErrorResponse {
  response: {
    data: {
      message: string
      errors: string[]
    }
  }
}

/**
 * Ошибка HTTP клиента
 *
 * @property {string} message - Сообщение
 * @property {string[]} errors - Ошибки
 */
export interface HttpClientError {
  message: string
  errors: string[]
}

/**
 * Опции HTTP клиента
 *
 * @property {string} baseUrl - Базовый URL
 * @property {string} token - Токен
 */
export interface HttpClientOptions {
  baseUrl: string
  token?: string | null
  headers?: Record<string, string>
  timeout?: number
  credentials?: boolean
}

/**
 * Конфигурация HTTP клиента
 *
 * @property {Record<string, unknown>} headers - Заголовки
 */
export interface HttpClientConfig {
  headers?: Record<string, string>
}

/**
 * Ответ HTTP клиента
 *
 * @property {T} data - Данные
 * @property {number} status - Статус
 * @property {string} statusText - Статус текст
 * @property {Record<string, string>} headers - Заголовки
 */
export interface HttpClientResponse<T = unknown> {
  data: T
  status: number
  statusText: string
  headers: Record<string, string>
}

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
 * Медиа детектор
 *
 * @property {number} width - Ширина
 * @property {number} height - Высота
 * @property {number} viewportWidth - Ширина viewport
 * @property {number} viewportHeight - Высота viewport
 * @property {boolean} isXs - Флаг xs
 * @property {boolean} isSm - Флаг sm
 * @property {boolean} isMd - Флаг md
 * @property {boolean} isLg - Флаг lg
 * @property {boolean} isXl - Флаг xl
 * @property {boolean} isPortrait - Флаг портрет
 * @property {boolean} isLandscape - Флаг ландшафт
 * @property {boolean} isMobileScreen - Флаг мобильный экран
 * @property {boolean} isTabletScreen - Флаг планшетный экран
 * @property {boolean} isDesctopScreen - Флаг десктопный экран
 * @property {boolean} isTouched - Флаг touched
 * @property {function} onResize - Обработчик resize
 * @property {function} onOrientation - Обработчик orientation
 */
export interface MediaDetector {
  width: number
  height: number
  viewportWidth: number
  viewportHeight: number
  isXs(): boolean
  isSm(): boolean
  isMd(): boolean
  isLg(): boolean
  isXl(): boolean
  isPortrait(): boolean
  isLandscape(): boolean
  isMobileScreen(): boolean
  isTabletScreen(): boolean
  isDesctopScreen(): boolean
  isTouched(): boolean
  onResize(key: string, callback: () => void): void
  onOrientation(key: string, callback: () => void): void
}

/**
 * Опции медиа детектора
 *
 * @property {MediaBreakpoints} breakpoints - Медиа точки
 */
export interface MediaDetectorOptions {
  breakpoints: MediaBreakpoints
}
