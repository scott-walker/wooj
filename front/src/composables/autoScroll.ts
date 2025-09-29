/**
 * Тип для состояния автоматического скролла
 */
type AutoScrollState = {
  setAutoScroll: (element: HTMLElement) => void
  unsetAutoScroll: (element: HTMLElement) => void
}

/**
 * Composable для автоматического скролла к точке клика
 */
export const useAutoScroll = (): AutoScrollState => {
  const SCROLL_THRESHOLD = 1

  let container: HTMLElement | null = null

  function onScrollToPoint(e: MouseEvent | TouchEvent): void {
    if (!container) return

    const clientY = "clientY" in e ? e.clientY : (e.touches[0]?.clientY ?? 0)
    const rect = container.getBoundingClientRect()

    // Позиция указателя внутри контейнера
    const pointerOffsetY = clientY - rect.top
    // Текущий скролл
    const currentScrollTop = container.scrollTop
    // Вычисляем, на сколько прокрутить, чтобы указатель оказался в центре контейнера
    const desiredDeltaY = pointerOffsetY - container.clientHeight / 2

    let targetScrollTop = currentScrollTop + desiredDeltaY

    // Ограничиваем по границам
    targetScrollTop = Math.max(0, Math.min(targetScrollTop, container.scrollHeight - container.clientHeight))

    container.scrollTo({
      top: Math.abs(desiredDeltaY) > SCROLL_THRESHOLD ? targetScrollTop : currentScrollTop,
      behavior: "smooth",
    })
  }

  const setAutoScroll = (element: HTMLElement): void => {
    container = element

    element.addEventListener("click", onScrollToPoint)
    element.addEventListener("touchstart", onScrollToPoint)
  }

  const unsetAutoScroll = (element: HTMLElement): void => {
    container = null

    element.removeEventListener("click", onScrollToPoint)
    element.removeEventListener("touchstart", onScrollToPoint)
  }

  return {
    setAutoScroll,
    unsetAutoScroll,
  }
}
