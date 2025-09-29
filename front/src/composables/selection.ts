import { ref, onMounted, onUnmounted, type Ref } from "vue"

/**
 * Тип для опций выделения
 */
type SelectionOptions = {
  excludedElements?: HTMLElement[]
}

/**
 * Тип для состояния выделения
 */
type SelectionState = {
  isSelectionActive: Ref<boolean>
  selectionTop: Ref<number>
  selectionLeft: Ref<number>
}

/**
 * Composable для работы с выделенным текстом
 */
export const useSelection = (options?: SelectionOptions): SelectionState => {
  const config = options || {}

  /**
   * Исключенные элементы
   */
  const excludedElements: HTMLElement[] = config.excludedElements || []

  const isSelectionActive = ref<boolean>(false)
  const selectionTop = ref<number>(0)
  const selectionLeft = ref<number>(0)

  /**
   * Обновить позицию выделения
   */
  const updatePosition = (): void => {
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

  /**
   * Скрыть выделение
   */
  const hide = ({ target }: Event): void => {
    const eventTarget = target as HTMLElement
    if (excludedElements.some((element) => element && element.contains(eventTarget))) return

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
