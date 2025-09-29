import { ref, inject } from "vue"
import { defineStore } from "pinia"

interface MediaDetector {
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

interface Utils {
  mediaDetector: MediaDetector
}

/**
 * Стор для работы с размерами экрана (и устройствами)
 */
export const useMediaStore = defineStore("media", () => {
  const { mediaDetector: md } = inject<Utils>("utils")!

  // Размеры
  const width = ref<number | null>(null)
  const height = ref<number | null>(null)
  const vpWidth = ref<number | null>(null)
  const vpHeight = ref<number | null>(null)

  const isXs = ref<boolean | null>(null)
  const isSmall = ref<boolean | null>(null)
  const isMiddle = ref<boolean | null>(null)
  const isLarge = ref<boolean | null>(null)
  const isXl = ref<boolean | null>(null)

  // Ориентация
  const isPortrait = ref<boolean | null>(null)
  const isLandscape = ref<boolean | null>(null)

  // Устройства
  const isMobile = ref<boolean | null>(null)
  const isTablet = ref<boolean | null>(null)
  const isDesktop = ref<boolean | null>(null)

  const isTouched = ref<boolean | null>(null)

  /**
   * Обновить данные о размерах
   */
  const update = (): void => {
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
    isDesktop.value = md.isDesctopScreen()

    isTouched.value = md.isTouched()
  }

  /**
   * Инициализация
   */
  const init = (): void => {
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
    isDesktop,

    isTouched,

    // Методы
    update,
    init,
  }
})
