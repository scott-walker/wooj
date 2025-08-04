import { ref, inject } from "vue"
import { defineStore } from "pinia"

/**
 * Стор для работы с размерами экрана (и устройствами)
 */
export const useMediaStore = defineStore("media", () => {
  const { mediaDetector: md } = inject("utils")

  // Размеры
  const width = ref(null)
  const height = ref(null)
  const vpWidth = ref(null)
  const vpHeight = ref(null)

  const isXs = ref(null)
  const isSmall = ref(null)
  const isMiddle = ref(null)
  const isLarge = ref(null)
  const isXl = ref(null)

  // Ориентация
  const isPortrait = ref(null)
  const isLandscape = ref(null)

  // Устройства
  const isMobile = ref(null)
  const isTablet = ref(null)
  const isDesctop = ref(null)

  const isTouched = ref(null)

  /**
   * Обновить данные о размерах
   */
  const update = () => {
    width.value = md.width
    height.value = md.height
    vpWidth.value = md.viewportWidth
    vpHeight.value = md.viewportHeight

    isXs.value = md.isXs()
    isSmall.value = md.isSm()
    isMiddle.value = md.isMd()
    isLarge.value = md.isLg()
    isXl.value = md.isXl()

    isPortrait.value = md.isPortrait()
    isLandscape.value = md.isLandscape()

    isMobile.value = md.isMobileScreen()
    isTablet.value = md.isTabletScreen()
    isDesctop.value = md.isDesctopScreen()

    isTouched.value = md.isTouched()

    document.body.style.height = `${vpHeight.value}px`
  }

  /**
   * Инициализация
   */
  const init = () => {
    console.log("useMediaStore: init")

    md.onResize("global", update)
    md.onOrientation("global", update)

    update()
  }

  init()

  return {
    // Размеры
    width,
    height,
    vpWidth,
    vpHeight,

    isXs,
    isSmall,
    isMiddle,
    isLarge,
    isXl,

    // Ориентация
    isPortrait,
    isLandscape,

    // Устройства
    isMobile,
    isTablet,
    isDesctop,

    isTouched,
  }
})
