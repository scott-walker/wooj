import { ref, computed, inject } from "vue"
import { defineStore } from "pinia"
import { useMediaStore } from "@stores/media"
import { useRouter } from "vue-router"

/**
 * Стор для работы с макетом
 */
export const useLayoutStore = defineStore("layout", () => {
  const { storage } = inject("utils")
  const router = useRouter()
  const mediaStore = useMediaStore()

  const contentElement = ref(null)

  const isAiredSidebarMode = ref(false)
  const isHoveredSidebar = ref(false)
  const isHoveredBars = ref(false)
  const statusBar = ref(null)

  const isAired = computed(() => mediaStore.isSmall || mediaStore.isTouched || isAiredSidebarMode.value)

  /**
   * Инициализация
   */
  function init() {
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
   * @param {Object} options
   */
  const setStatusBar = (options) => {
    const { title, icon } = options || {}

    statusBar.value = { title, icon }
  }

  /**
   * Снять статус в шапке лейаута
   * @param {Object} params
   */
  const unsetStatusBar = () => {
    statusBar.value = null
  }

  /**
   * Наведение курсора на сайдбар
   */
  const onOverSidebar = () => (isHoveredSidebar.value = true)

  /**
   * Снятие курсора с сайдбара
   */
  const onLeaveSidebar = () => (isHoveredSidebar.value = false)

  /**
   * Наведение курсора на бургер
   */
  const onOverBars = () => (isHoveredBars.value = true)

  /**
   * Снятие курсора с бургера
   */
  const onLeaveBars = () => (isHoveredBars.value = false)

  /**
   * Установить/снять режим скрывающегося сайдбара
   */
  const onToggleSidebar = () => {
    isAiredSidebarMode.value = !isAiredSidebarMode.value

    storage.set("isAiredSidebarMode", isAiredSidebarMode.value)
  }

  /**
   * Установить/снять режим скрывающегося сайдбара (поведение для мобильных устройств)
   */
  const onToggleMobileSidebar = () => {
    isHoveredSidebar.value = !isHoveredSidebar.value
  }

  /**
   * Установить элемент в котором содержиться контент лейаута
   * @param {HTMLElement} element
   */
  const setContentElement = (element) => (contentElement.value = element)

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
