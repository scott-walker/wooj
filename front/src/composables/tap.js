import { onUnmounted } from "vue"

/**
 * Для разграничения между долгим удержанием пальца и быстрым тапом
 * @param {HTMLElement} el
 * @param {Object} options
 * @returns {void}
 */
export const useTap = (el, { onTap, onLongTap, delay }) => {
  onTap = onTap || (() => {})
  onLongTap = onLongTap || (() => {})
  delay = delay || 600

  let timer = null
  let tapCompleted = false

  /**
   * Обработчик начала удержания тапа
   */
  const onStart = () => {
    const cb = () => (tapCompleted = true) && onLongTap()

    tapCompleted = false

    // Если таймер успеет сработать, значит это будет "долгий тап"
    timer = setTimeout(cb, delay)
  }

  /**
   * Обработчик конца удержания тапа
   */
  const onEnd = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    // Если таймер не успел сработать, значит это был "быстрый тап"
    if (!tapCompleted) {
      onTap()
    }
  }

  /**
   * Обработчик движения (если есть движение, прерываем событие)
   */
  const onMove = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    tapCompleted = true
  }

  el.addEventListener("touchstart", onStart, { passive: true })
  el.addEventListener("touchend", onEnd)
  el.addEventListener("touchmove", onMove, { passive: true })

  onUnmounted(() => {
    el.removeEventListener("touchstart", onStart)
    el.removeEventListener("touchend", onEnd)
    el.removeEventListener("touchmove", onMove)
  })
}
