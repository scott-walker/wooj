import { ref, onMounted, onUnmounted } from "vue"

/**
 * Для определения позиции курсора
 * @returns {Object}
 */
export const usePosition = () => {
  // Позиция в окне
  const cX = ref(0)
  const cY = ref(0)

  // Позиция на странице
  const pX = ref(0)
  const pY = ref(0)

  /**
   * Установить позицию курсора
   * @param {Object} event
   */
  const onSetPosition = ({ clientX, clientY, pageX, pageY }) => {
    cX.value = clientX
    cY.value = clientY
    pX.value = pageX
    pY.value = pageY
  }

  onMounted(() => document.addEventListener("mousemove", onSetPosition))
  onUnmounted(() => document.removeEventListener("mousemove", onSetPosition))

  return {
    cX,
    cY,
    pX,
    pY,
  }
}
