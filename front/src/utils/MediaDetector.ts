import type { MediaDetector as IMediaDetector, MediaDetectorOptions } from "@types"

/**
 * Определяет устройство или размеры/режимы экрана
 *
 * @property {Object} resizeListenersMap
 * @property {Object} orientationListenersMap
 * @property {Object} scrollListenersMap
 * @property {Number} width ширина окна
 * @property {Number} height высота окна
 *
 * @property {Number} WIDTH_XS
 * @property {Number} WIDTH_SM
 * @property {Number} WIDTH_MD
 * @property {Number} WIDTH_LG
 * @property {Number} WIDTH_XL
 * @property {Number} WIDTH_XXL
 */
export default class MediaDetector implements IMediaDetector {
  options: MediaDetectorOptions

  resizeListenersMap: Record<string, () => void>
  orientationListenersMap: Record<string, () => void>
  scrollListenersMap: Record<string, () => void>

  WIDTH_XS: number
  WIDTH_SM: number
  WIDTH_MD: number
  WIDTH_LG: number
  WIDTH_XL: number
  WIDTH_XXL: number

  /**
   * Инициализация
   */
  constructor(options: MediaDetectorOptions) {
    this.options = options

    this.resizeListenersMap = {}
    this.orientationListenersMap = {}
    this.scrollListenersMap = {}

    this.WIDTH_XS = 480
    this.WIDTH_SM = 640
    this.WIDTH_MD = 768
    this.WIDTH_LG = 1024
    this.WIDTH_XL = 1280
    this.WIDTH_XXL = 1536
  }

  /**
   * Ширина окна
   */
  get width() {
    return window.innerWidth
  }

  /**
   * Высота окна
   */
  get height() {
    return window.innerHeight
  }

  /**
   * Ширина экрана
   */
  get screenWidth() {
    return screen.width
  }

  /**
   * Высота экрана
   */
  get screenHeight() {
    return screen.height
  }

  /**
   * Ширина видимости экрана
   */
  get viewportWidth() {
    return window.visualViewport?.width || window.innerWidth
  }

  /**
   * Высота видимости экрана
   */
  get viewportHeight() {
    return window.visualViewport?.height || window.innerHeight
  }

  /**
   * Подписаться на изменения размеров окна
   */
  onResize(id: string, cb: () => void): void {
    if (this.resizeListenersMap[id]) {
      throw `ID "${id}" для слушателя изменений размеров окна уже занят`
    }

    this.resizeListenersMap[id] = cb
    window.addEventListener("resize", cb)

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", cb)
    }
  }

  /**
   * Отписаться от изменений размеров окна
   */
  offResize(id: string): void {
    const cb = this.resizeListenersMap[id]

    if (cb) {
      delete this.resizeListenersMap[id]
      window.removeEventListener("resize", cb)

      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", cb)
      }
    } else {
      throw `ID "${id}" для слушателя изменений размеров окна не существует`
    }
  }

  /**
   * Подписаться на изменения ориентации экрана
   */
  onOrientation(id: string, cb: () => void): void {
    if (this.orientationListenersMap[id]) {
      throw `ID "${id}" для слушателя изменений ориентации экрана уже занят`
    }

    this.orientationListenersMap[id] = cb
    screen.orientation.addEventListener("change", cb)
  }

  /**
   * Отписаться от изменений ориентации экрана
   */
  offOrientation(id: string): void {
    const cb = this.orientationListenersMap[id]

    if (cb) {
      delete this.orientationListenersMap[id]
      screen.orientation.removeEventListener("change", cb)
    } else {
      throw `ID "${id}" для слушателя изменений ориентации экрана не существует`
    }
  }

  /**
   * Подписаться на изменения позиции окна (скролл)
   */
  onScroll(id: string, cb: () => void): void {
    if (this.scrollListenersMap[id]) {
      throw `ID "${id}" для слушателя изменений позиции окна уже занят`
    }

    this.scrollListenersMap[id] = cb
    window.addEventListener("scroll", cb)
  }

  /**
   * Отписаться от изменений позиции окна (от скролла)
   */
  offScroll(id: string): void {
    const cb = this.scrollListenersMap[id]

    if (cb) {
      delete this.scrollListenersMap[id]
      window.removeEventListener("scroll", cb)
    } else {
      throw `ID "${id}" для слушателя изменений позиции окна не существует`
    }
  }

  /**
   * Это сенсорный экран
   */
  isTouched(): boolean {
    return window.matchMedia("(pointer: coarse)").matches
  }

  /**
   * Это портретная ориентация
   */
  isPortrait(): boolean {
    return window.matchMedia("(orientation: portrait)").matches
  }

  /**
   * Это ориентация пейзажа
   */
  isLandscape(): boolean {
    return window.matchMedia("(orientation: landscape)").matches
  }

  /**
   * Это UserAgent планшета
   */
  isTabletUserAgent(): boolean {
    return /iPad|Tablet|Nexus 7|Nexus 10|KFAPWI/i.test(navigator.userAgent)
  }

  /**
   * Это UserAgent смартфона
   */
  isMobileUserAgent(): boolean {
    return /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

  /**
   * Это экран планшета
   */
  isTabletScreen(): boolean {
    return this.screenWidth >= this.WIDTH_MD && this.screenWidth <= this.WIDTH_LG
  }

  /**
   * Это экран смартфона
   */
  isMobileScreen(): boolean {
    return this.screenWidth < this.WIDTH_MD
  }

  /**
   * Это экран десктопа
   */
  isDesctopScreen(): boolean {
    return this.screenWidth > this.WIDTH_LG
  }

  /**
   * Это планшет
   */
  isTablet(): boolean {
    return this.isTouched() && (this.isTabletUserAgent() || this.isTabletScreen())
  }

  /**
   * Это смартфон
   */
  isMobile(): boolean {
    return this.isTouched() && (this.isMobileUserAgent() || this.isMobileScreen())
  }

  /**
   * Это десктоп
   */
  isDesctop(): boolean {
    // return !this.isTablet() && !this.isMobile() && this.isDesctopScreen()
    return this.isDesctopScreen()
  }

  /**
   * Размер окна XS
   */
  isXs(): boolean {
    return this.width <= this.WIDTH_XS
  }

  /**
   * Размер окна SM
   */
  isSm(): boolean {
    return this.width <= this.WIDTH_SM
  }

  /**
   * Размер окна MD
   */
  isMd(): boolean {
    return this.width > this.WIDTH_SM && this.width <= this.WIDTH_MD
  }

  /**
   * Размер окна LG
   */
  isLg(): boolean {
    return this.width > this.WIDTH_MD && this.width <= this.WIDTH_LG
  }

  /**
   * Размер окна XL
   */
  isXl(): boolean {
    return this.width > this.WIDTH_LG && this.width <= this.WIDTH_XL
  }

  /**
   * Размер окна XXL
   */
  isXxl(): boolean {
    // return this.width > this.WIDTH_XL && this.width <= this.WIDTH_XXL
    return this.width > this.WIDTH_XL
  }
}
