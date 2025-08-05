/**
 * Для блокирования событий
 * @returns {Object}
 */
export const useLockers = () => {
  let excluded = null

  /**
   * Обработчик блокировки
   */
  const onLock = (e) => {
    if (!excluded) {
      e.preventDefault()
      return
    }

    if (e.target != excluded && !excluded.contains(e.target)) {
      e.preventDefault()
    }
  }

  /**
   * Заблокировать движение по тач-скрину
   * @param {HTMLElement} element
   * @param {excludedElement} element
   */
  const lockTouchMove = (element, excludedElement) => {
    excluded = excludedElement
    element.addEventListener("touchmove", onLock, { passive: false })
  }

  /**
   * Разблокировать движение по тач-скрину
   * @param {HTMLElement} element
   */
  const unlockTouchMove = (element) => {
    element.removeEventListener("touchmove", onLock)
  }

  return {
    lockTouchMove,
    unlockTouchMove,
  }
}
