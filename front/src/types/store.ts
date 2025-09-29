import type { MediaBreakpoints } from "."
import type { Topic, User, Wooj } from "./entities"
import type { Toast } from "./toasts"

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
