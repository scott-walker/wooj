import { onUnmounted } from "vue"

/**
 * Тип для опций тапа
 */
type TapOptions = {
  onTap?: () => void
  onLongTap?: () => void
  delay?: number
}

/**
 * Composable для разграничения между долгим удержанием пальца и быстрым тапом
 */
export const useTap = (el: HTMLElement, options: TapOptions): void => {
  const { onTap = () => {}, onLongTap = () => {}, delay = 600 } = options

  let timer: NodeJS.Timeout | null = null
  let tapCompleted = false

  /**
   * Обработчик начала удержания тапа
   */
  const onStart = (): void => {
    const cb = (): boolean => {
      tapCompleted = true
      onLongTap()
      return true
    }

    tapCompleted = false

    // Если таймер успеет сработать, значит это будет "долгий тап"
    timer = setTimeout(cb, delay)
  }

  /**
   * Обработчик конца удержания тапа
   */
  const onEnd = (): void => {
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
  const onMove = (): void => {
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
