import { ref, computed, inject } from "vue"
import { defineStore } from "pinia"
import { useMediaStore } from "@stores/media"
import { useRouter } from "vue-router"
import type { Utils, StatusBarOptions, StatusBar } from "@types"

/**
 * Стор для работы с макетом
 */
export const useLayoutStore = defineStore("layout", () => {
  const { storage } = inject<Utils>("utils")!
  const router = useRouter()
  const mediaStore = useMediaStore()

  const contentElement = ref<HTMLElement | null>(null)

  const isAiredSidebarMode = ref<boolean>(false)
  const isHoveredSidebar = ref<boolean>(false)
  const isHoveredBars = ref<boolean>(false)
  const statusBar = ref<StatusBar | null>(null)

  const isAired = computed((): boolean => !!mediaStore.isSmall || !!mediaStore.isTouched || isAiredSidebarMode.value)

  /**
   * Инициализация
   */
  function init(): void {
    isAiredSidebarMode.value = storage.get("isAiredSidebarMode", false)

    // При каждом изменении маршрута скрывать сайдбар для мобильных устройств
    router.afterEach(() => {
      if (mediaStore.isSmall) {
        isHoveredSidebar.value = false
      }
    })
  }

  /**
   * Установить статус в шапке лейаута
   */
  const setStatusBar = (options?: StatusBarOptions): void => {
    const { title, icon } = options || {}

    statusBar.value = { title, icon }
  }

  /**
   * Снять статус в шапке лейаута
   */
  const unsetStatusBar = (): void => {
    statusBar.value = null
  }

  /**
   * Наведение курсора на сайдбар
   */
  const onOverSidebar = (): void => {
    isHoveredSidebar.value = true
  }

  /**
   * Снятие курсора с сайдбара
   */
  const onLeaveSidebar = (): void => {
    isHoveredSidebar.value = false
  }

  /**
   * Наведение курсора на бургер
   */
  const onOverBars = (): void => {
    isHoveredBars.value = true
  }

  /**
   * Снятие курсора с бургера
   */
  const onLeaveBars = (): void => {
    isHoveredBars.value = false
  }

  /**
   * Установить/снять режим скрывающегося сайдбара
   */
  const onToggleSidebar = (): void => {
    isAiredSidebarMode.value = !isAiredSidebarMode.value

    storage.set("isAiredSidebarMode", isAiredSidebarMode.value)
  }

  /**
   * Установить/снять режим скрывающегося сайдбара (поведение для мобильных устройств)
   */
  const onToggleMobileSidebar = (): void => {
    isHoveredSidebar.value = !isHoveredSidebar.value
  }

  /**
   * Установить элемент в котором содержится контент лейаута
   */
  const setContentElement = (element: HTMLElement | null): void => {
    contentElement.value = element
  }

  // Инициализировать
  init()

  return {
    contentElement,

    isAired,
    isHoveredSidebar,
    isHoveredBars,

    statusBar,
    setStatusBar,
    unsetStatusBar,

    onOverSidebar,
    onLeaveSidebar,

    onOverBars,
    onLeaveBars,

    onToggleSidebar,
    onToggleMobileSidebar,

    setContentElement,
  }
})
