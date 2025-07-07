import { ref, inject } from "vue"
import { defineStore } from "pinia"

/**
 * Стор для работы с макетом
 */
export const useLayoutStore = defineStore("layout", () => {
  const { storage } = inject("utils")

  const hasAiredSidebar = ref(false)
  const isHoveredSidebar = ref(false)
  const isHoveredBars = ref(false)
  const isCreateWoojActive = ref(false)
  const statusBar = ref(null)

  /**
   * Инициализация
   */
  function init() {
    hasAiredSidebar.value = storage.get("hasAiredSidebar", false)
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
    hasAiredSidebar.value = !hasAiredSidebar.value

    storage.set("hasAiredSidebar", hasAiredSidebar.value)
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
    onActivateCreateWooj,
    onDeactivateCreateWooj,
  }
})
