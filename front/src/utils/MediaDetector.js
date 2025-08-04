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
export default class MediaDetector {
  /**
   * Инициализация
   */
  constructor() {
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
   * @returns {Number}
   */
  get width() {
    return window.innerWidth
  }

  /**
   * Ширина видимости экрана
   * @returns {Number}
   */
  get viewportWidth() {
    return window.visualViewport.width
  }

  /**
   * Высота окна
   * @returns {Number}
   */
  get height() {
    return window.innerHeight
  }

  /**
   * Высота видимости экрана
   * @returns {Number}
   */
  get viewportHeight() {
    return window.visualViewport.height
  }

  /**
   * Подписаться на изменения размеров окна
   * @param {String} id
   * @param {Function} cb
   * @returns {void}
   */
  onResize(id, cb) {
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
   * @param {String} id
   * @returns {void}
   */
  offResize(id) {
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
   * @param {String} id
   * @param {Function} cb
   * @returns {void}
   */
  onOrientation(id, cb) {
    if (this.orientationListenersMap[id]) {
      throw `ID "${id}" для слушателя изменений ориентации экрана уже занят`
    }

    this.orientationListenersMap[id] = cb
    screen.orientation.addEventListener("change", cb)
  }

  /**
   * Отписаться от изменений ориентации экрана
   * @param {String} id
   * @returns {void}
   */
  offOrientation(id) {
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
   * @param {String} id
   * @param {Function} cb
   * @returns {void}
   */
  onScroll(id, cb) {
    if (this.scrollListenersMap[id]) {
      throw `ID "${id}" для слушателя изменений позиции окна уже занят`
    }

    this.scrollListenersMap[id] = cb
    window.addEventListener("scroll", cb)
  }

  /**
   * Отписаться от изменений позиции окна (от скролла)
   * @param {String} id
   * @returns {void}
   */
  offScroll(id) {
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
   * @returns {Boolean}
   */
  isTouched() {
    return window.matchMedia("(pointer: coarse)").matches
  }

  /**
   * Это портретная ориентация
   * @returns {Boolean}
   */
  isPortrait() {
    return window.matchMedia("(orientation: portrait)").matches
  }

  /**
   * Это ориентация пейзажа
   * @returns {Boolean}
   */
  isLandscape() {
    return window.matchMedia("(orientation: landscape)").matches
  }

  /**
   * Это UserAgent планшета
   * @returns {Boolean}
   */
  isTabletUserAgent() {
    return /iPad|Tablet|Nexus 7|Nexus 10|KFAPWI/i.test(navigator.userAgent)
  }

  /**
   * Это UserAgent смартфона
   * @returns {Boolean}
   */
  isMobileUserAgent() {
    return /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

  /**
   * Это экран планшета
   * @returns {Boolean}
   */
  isTabletScreen() {
    return screen.width >= this.WIDTH_MD && screen.width <= this.WIDTH_LG
  }

  /**
   * Это экран смартфона
   * @returns {Boolean}
   */
  isMobileScreen() {
    return screen.width < this.WIDTH_MD
  }

  /**
   * Это экран десктопа
   * @returns {Boolean}
   */
  isDesctopScreen() {
    return screen.width > this.WIDTH_LG
  }

  /**
   * Это планшет
   * @returns {Boolean}
   */
  isTablet() {
    return this.isTouched() && (this.isTabletUserAgent() || this.isTabletScreen())
  }

  /**
   * Это смартфон
   * @returns {Boolean}
   */
  isMobile() {
    return this.isTouched() && (this.isMobileUserAgent() || this.isMobileScreen())
  }

  /**
   * Это десктоп
   * @returns {Boolean}
   */
  isDesctop() {
    // return !this.isTablet() && !this.isMobile() && this.isDesctopScreen()
    return this.isDesctopScreen()
  }

  /**
   * Размер окна XS
   * @returns {Boolean}
   */
  isXs() {
    return this.width <= this.WIDTH_XS
  }

  /**
   * Размер окна SM
   * @returns {Boolean}
   */
  isSm() {
    return this.width <= this.WIDTH_SM
  }

  /**
   * Размер окна MD
   * @returns {Boolean}
   */
  isMd() {
    return this.width > this.WIDTH_SM && this.width <= this.WIDTH_MD
  }

  /**
   * Размер окна LG
   * @returns {Boolean}
   */
  isLg() {
    return this.width > this.WIDTH_MD && this.width <= this.WIDTH_LG
  }

  /**
   * Размер окна XL
   * @returns {Boolean}
   */
  isXl() {
    return this.width > this.WIDTH_LG && this.width <= this.WIDTH_XL
  }

  /**
   * Размер окна XXL
   * @returns {Boolean}
   */
  isXxl() {
    // return this.width > this.WIDTH_XL && this.width <= this.WIDTH_XXL
    return this.width > this.WIDTH_XL
  }
}
