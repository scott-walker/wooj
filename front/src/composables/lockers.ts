/**
 * Тип для состояния блокировки
 */
type LockersState = {
  lockTouchMove: (element: HTMLElement, excludedElement?: HTMLElement | null) => void
  unlockTouchMove: (element: HTMLElement) => void
}

/**
 * Composable для блокирования событий
 */
export const useLockers = (): LockersState => {
  let excluded: HTMLElement | null = null

  /**
   * Обработчик блокировки
   */
  const onLock = (e: TouchEvent): void => {
    if (!excluded) {
      e.preventDefault()
      return
    }

    const target = e.target as HTMLElement
    if (target !== excluded && !excluded.contains(target)) {
      e.preventDefault()
    }
  }

  /**
   * Заблокировать движение по тач-скрину
   */
  const lockTouchMove = (element: HTMLElement, excludedElement?: HTMLElement | null): void => {
    excluded = excludedElement || null
    element.addEventListener("touchmove", onLock, { passive: false })
  }

  /**
   * Разблокировать движение по тач-скрину
   */
  const unlockTouchMove = (element: HTMLElement): void => {
    element.removeEventListener("touchmove", onLock)
  }

  return {
    lockTouchMove,
    unlockTouchMove,
  }
}
