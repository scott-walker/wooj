import { ref, onMounted, onUnmounted, type Ref } from "vue"

/**
 * Тип для позиции курсора
 */
type PositionState = {
  cX: Ref<number> // позиция курсора X в окне
  cY: Ref<number> // позиция курсора Y в окне
  pX: Ref<number> // позиция курсора X на странице
  pY: Ref<number> // позиция курсора Y на странице
}

/**
 * Тип для позиции курсора
 */
type MousePosition = {
  clientX: number
  clientY: number
  pageX: number
  pageY: number
}

/**
 * Composable для определения позиции курсора
 */
export const usePosition = (): PositionState => {
  // Позиция в окне
  const cX = ref<number>(0)
  const cY = ref<number>(0)

  // Позиция на странице
  const pX = ref<number>(0)
  const pY = ref<number>(0)

  /**
   * Установить позицию курсора
   */
  const onSetPosition = ({ clientX, clientY, pageX, pageY }: MousePosition): void => {
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
