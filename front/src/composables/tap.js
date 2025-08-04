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
  let timerCompleted = false

  /**
   * Обработчик начала удержания тапа
   */
  const onStart = () => {
    const cb = () => (timerCompleted = true) && onLongTap()

    timerCompleted = false

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
    if (!timerCompleted) {
      onTap()
    }
  }

  el.addEventListener("touchstart", onStart)
  el.addEventListener("touchend", onEnd)

  onUnmounted(() => {
    el.removeEventListener("touchstart", onStart)
    el.removeEventListener("touchend", onEnd)
  })
}
