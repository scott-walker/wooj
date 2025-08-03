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

  const isAiredSidebarMode = ref(false)
  const isHoveredSidebar = ref(false)
  const isHoveredBars = ref(false)
  const isCreateWoojActive = ref(false)
  const statusBar = ref(null)

  const hasAiredSidebar = computed(() => mediaStore.isSmall || isAiredSidebarMode.value)

  /**
   * Инициализация
   */
  function init() {
    isAiredSidebarMode.value = storage.get("isAiredSidebarMode", false)

    router.afterEach(() => {
      if (mediaStore.isSmall) {
        isHoveredSidebar.value = false
      }
    })
  }

  const setStatusBar = ({ title, icon }) => {
    statusBar.value = {
      title,
      icon: icon || "",
    }
  }
  const unsetStatusBar = () => {
    statusBar.value = null
  }

  const onOverSidebar = () => (isHoveredSidebar.value = true)
  const onLeaveSidebar = () => (isHoveredSidebar.value = false)
  const onOverBars = () => (isHoveredBars.value = true)
  const onLeaveBars = () => (isHoveredBars.value = false)
  const onToggleSidebar = () => {
    isAiredSidebarMode.value = !isAiredSidebarMode.value

    storage.set("isAiredSidebarMode", isAiredSidebarMode.value)
  }
  const onToggleMobileSidebar = () => {
    isHoveredSidebar.value = !isHoveredSidebar.value
  }
  const onActivateCreateWooj = () => (isCreateWoojActive.value = true)
  const onDeactivateCreateWooj = () => (isCreateWoojActive.value = false)

  // Инициализировать
  init()

  return {
    hasAiredSidebar,
    isHoveredSidebar,
    isHoveredBars,
    isCreateWoojActive,

    statusBar,
    setStatusBar,
    unsetStatusBar,

    onOverSidebar,
    onLeaveSidebar,
    onOverBars,
    onLeaveBars,
    onToggleSidebar,
    onToggleMobileSidebar,
    onActivateCreateWooj,
    onDeactivateCreateWooj,
  }
})
