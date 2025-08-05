/**
 * Для определения позиции курсора
 * @returns {Object}
 */
export const useAutoScroll = () => {
  const SCROLL_THRESHOLD = 1

  let container = null

  function onScrollToPoint(e) {
    if (!container) return

    const clientY = e.clientY || e.touches[0].clientY
    const rect = container.getBoundingClientRect()

    // Позиция указателя внутри контейнера
    const pointerOffsetY = clientY - rect.top
    // Текущий скролл
    const currentScrollTop = container.scrollTop
    // Вычисляем, на сколько прокрутить, чтобы указатель оказался в центре контейнера
    const desiredDeltaY = pointerOffsetY - container.clientHeight / 2

    let targetScrollTop = currentScrollTop + desiredDeltaY

    // Клэмпим по границам
    targetScrollTop = Math.max(0, Math.min(targetScrollTop, container.scrollHeight - container.clientHeight))

    container.scrollTo({
      top: Math.abs(desiredDeltaY) > SCROLL_THRESHOLD ? targetScrollTop : currentScrollTop,
      behavior: "smooth",
    })
  }

  const setAutoScroll = (element) => {
    container = element

    element.addEventListener("click", onScrollToPoint)
    element.addEventListener("touchstart", onScrollToPoint)
  }

  const unsetAutoScroll = (element) => {
    container = null

    element.removeEventListener("click", onScrollToPoint)
    element.removeEventListener("touchstart", onScrollToPoint)
  }

  return {
    setAutoScroll,
    unsetAutoScroll,
  }
}
