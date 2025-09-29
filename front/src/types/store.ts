import type { Topic, User, Wooj } from "./entities"
import type { Toast } from "./toasts"
import type { StatusBar, StatusBarOptions } from "./layout"

/**
 * Состояние пользователя
 *
 * @property {string} token - Токен
 * @property {User} user - Пользователь
 * @property {number} resendTimer - Таймер отправки
 * @property {string} avatar - Аватар
 * @property {boolean} isLogged - Флаг авторизованности
 * @property {boolean} isVerified - Флаг верификации
 * @property {function} check - Проверить авторизацию
 * @property {function} register - Зарегистрировать пользователя
 * @property {function} login - Войти в систему
 * @property {function} logout - Выйти из системы
 * @property {function} changeAvatar - Поменять аватар
 * @property {function} update - Обновить данные пользователя
 * @property {function} resend - Отправить сообщение с подтверждением email заново
 * @property {function} startResendTimer - Запустить таймер переотправки email с верификацией
 */
export interface UserStoreState {
  token: string | null
  user: User | Record<string, never>
  resendTimer: number | null
  avatar: string | null
  isLogged: boolean
  isVerified: boolean
  check: () => Promise<void>
  register: (email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  changeAvatar: (avatar: File) => Promise<void>
  update: (fields: Partial<User>) => Promise<void>
  resend: () => Promise<void>
  startResendTimer: () => void
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
 * @property {number | null} width - Ширина экрана
 * @property {number | null} height - Высота экрана
 * @property {number | null} vpWidth - Ширина viewport
 * @property {number | null} vpHeight - Высота viewport
 * @property {boolean | null} isXs - Флаг размера xs
 * @property {boolean | null} isSmall - Флаг размера small
 * @property {boolean | null} isMiddle - Флаг размера middle
 * @property {boolean | null} isLarge - Флаг размера large
 * @property {boolean | null} isXl - Флаг размера xl
 * @property {boolean | null} isPortrait - Портретная ориентация
 * @property {boolean | null} isLandscape - Ландшафтная ориентация
 * @property {boolean | null} isMobile - Мобильный экран
 * @property {boolean | null} isTablet - Планшетный экран
 * @property {boolean | null} isDesktop - Десктопный экран
 * @property {boolean | null} isTouched - Сенсорный экран
 * @property {function} update - Обновить данные о размерах
 * @property {function} init - Инициализировать
 */
export interface MediaStoreState {
  width: number | null
  height: number | null
  vpWidth: number | null
  vpHeight: number | null
  isXs: boolean | null
  isSmall: boolean | null
  isMiddle: boolean | null
  isLarge: boolean | null
  isXl: boolean | null
  isPortrait: boolean | null
  isLandscape: boolean | null
  isMobile: boolean | null
  isTablet: boolean | null
  isDesktop: boolean | null
  isTouched: boolean | null
  update: () => void
  init: () => void
}

/**
 * Состояние макета
 *
 * @property {HTMLElement | null} contentElement - Элемент контента
 * @property {boolean} isAired - Флаг aired
 * @property {boolean} isHoveredSidebar - Флаг hovered sidebar
 * @property {boolean} isHoveredBars - Флаг hovered bars
 * @property {StatusBar | null} statusBar - Статус бар
 * @property {function} setStatusBar - Установить статус бар
 * @property {function} unsetStatusBar - Снять статус бар
 * @property {function} onOverSidebar - Наведение курсора на сайдбар
 * @property {function} onLeaveSidebar - Снятие курсора с сайдбара
 * @property {function} onOverBars - Наведение курсора на бургер
 * @property {function} onLeaveBars - Снятие курсора с бургера
 * @property {function} onToggleSidebar - Установить/снять режим скрывающегося сайдбара
 * @property {function} onToggleMobileSidebar - Установить/снять режим скрывающегося сайдбара (поведение для мобильных устройств)
 * @property {function} setContentElement - Установить элемент в котором содержится контент лейаута
 * @property {function} onToggleSidebar - Установить/снять режим скрывающегося сайдбара
 * @property {function} onToggleMobileSidebar - Установить/снять режим скрывающегося сайдбара (поведение для мобильных устройств)
 * @property {function} setContentElement - Установить элемент в котором содержится контент лейаута
 */
export interface LayoutStoreState {
  contentElement: HTMLElement | null
  isAired: boolean
  isHoveredSidebar: boolean
  isHoveredBars: boolean
  statusBar: StatusBar | null
  setStatusBar: (options?: StatusBarOptions) => void
  unsetStatusBar: () => void
  onOverSidebar: () => void
  onLeaveSidebar: () => void
  onOverBars: () => void
  onLeaveBars: () => void
  onToggleSidebar: () => void
  onToggleMobileSidebar: () => void
  setContentElement: (element: HTMLElement | null) => void
}
