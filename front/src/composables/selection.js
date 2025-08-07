import { ref, onMounted, onUnmounted } from "vue"

/**
 * Для работы с выделенным текстом
 * @param {Object} options
 * @returns {Object}
 */
export const useSelection = (options) => {
  options = options || {}

  /**
   * @var {HTMLElement[]} excludedElements
   */
  const excludedElements = options.excludedElements || []

  const isSelectionActive = ref(false)
  const selectionTop = ref(0)
  const selectionLeft = ref(0)

  /**
   * Обновить позицию
   * @returns {void}
   */
  const updatePosition = () => {
    const selection = window.getSelection()

    if (!selection || selection.rangeCount === 0) {
      isSelectionActive.value = false
      return
    }

    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()

    // Иногда ничего не возвращает
    if (!rect || (rect.width === 0 && rect.height === 0)) {
      isSelectionActive.value = false
      return
    }

    selectionTop.value = rect.bottom + window.scrollY
    selectionLeft.value = rect.left + window.scrollX
    isSelectionActive.value = true
  }

  const hide = ({ target }) => {
    if (excludedElements.some((element) => element && element.contains(target))) return

    isSelectionActive.value = false
  }

  onMounted(() => {
    document.addEventListener("mouseup", updatePosition)
    document.addEventListener("keyup", updatePosition)
    document.addEventListener("selectionchange", updatePosition)
    document.addEventListener("mousedown", hide)
    document.addEventListener("touchstart", hide)
  })
  onUnmounted(() => {
    document.removeEventListener("mouseup", updatePosition)
    document.removeEventListener("keyup", updatePosition)
    document.removeEventListener("selectionchange", updatePosition)
    document.removeEventListener("mousedown", hide)
    document.removeEventListener("touchstart", hide)
  })

  return {
    isSelectionActive,
    selectionTop,
    selectionLeft,
  }
}
