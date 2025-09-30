import { ref, computed, onMounted, onUnmounted } from "vue"

/**
 * Отслеживание направления скроллинга (и движения по тач-скрину)
 */
export function useMoveDirection() {
  const OFFSET_FACTOR = 0
  const DIRECTION_DOWN = "down"
  const DIRECTION_UP = "up"

  const scrollDirection = ref<string | null>(null)
  const isScrollingDown = computed(() => scrollDirection.value === DIRECTION_DOWN)
  const isScrollingUp = computed(() => scrollDirection.value === DIRECTION_UP)

  const toucheMoveDirection = ref<string | null>(null)
  const isTouchMovingDown = computed(() => toucheMoveDirection.value === DIRECTION_DOWN)
  const isTouchMovingUp = computed(() => toucheMoveDirection.value === DIRECTION_UP)

  const getScrollTop = () => window.scrollY || document.documentElement.scrollTop

  let lastScrollPosition = getScrollTop()
  let lastTouchPosition: number | null = null

  const prevPosition = ref<number | null>(null)
  const currentPosition = ref<number | null>(null)

  /**
   * Обработчик скролла
   */
  const onScroll = () => {
    window.requestAnimationFrame(() => {
      const newScrollPosition = getScrollTop()

      prevPosition.value = lastScrollPosition
      currentPosition.value = newScrollPosition

      if (newScrollPosition > lastScrollPosition + OFFSET_FACTOR) {
        scrollDirection.value = DIRECTION_DOWN
      } else if (newScrollPosition < lastScrollPosition - OFFSET_FACTOR) {
        scrollDirection.value = DIRECTION_UP
      }

      lastScrollPosition = newScrollPosition <= 0 ? 0 : newScrollPosition
    })
  }

  /**
   * Обработчик тач-старта
   */
  const onTouchStart = ({ touches }: { touches: TouchList }) => (lastTouchPosition = touches[0]?.clientY ?? null)

  /**
   * Обработчик тач-движения
   */
  const onTouchMove = ({ touches }: { touches: TouchList }) => {
    const newTouchPosition = touches[0]?.clientY ?? 0
    const delta = newTouchPosition - (lastTouchPosition ?? 0)

    // if (Math.abs(delta) < 10) return // игнорируем мелкие движения

    window.requestAnimationFrame(() => {
      if (delta > 0) {
        toucheMoveDirection.value = DIRECTION_DOWN
      } else {
        toucheMoveDirection.value = DIRECTION_UP
      }
    })
  }

  onMounted(() => {
    window.addEventListener("scroll", onScroll, { passive: true })
    document.addEventListener("touchstart", onTouchStart)
    document.addEventListener("touchmove", onTouchMove)
  })

  onUnmounted(() => {
    window.removeEventListener("scroll", onScroll)
    document.removeEventListener("touchstart", onTouchStart)
    document.removeEventListener("touchmove", onTouchMove)
  })

  return {
    scrollDirection,
    isScrollingDown,
    isScrollingUp,

    toucheMoveDirection,
    isTouchMovingDown,
    isTouchMovingUp,

    prevPosition,
    currentPosition,
  }
}
