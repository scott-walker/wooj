import { ref, watch, type Ref } from "vue"

/**
 * Тип для опций клавиатуры
 */
type KeyboardOptions = {
  onOpen?: () => void
  onClose?: () => void
}

/**
 * Тип для состояния клавиатуры
 */
type KeyboardState = {
  isOpenedKeyboard: Ref<boolean>
  intialHeight: Ref<number>
  currentHeight: Ref<number>
  keyboardHeight: Ref<number>
  setListeners: () => void
  unsetListeners: () => void
}

/**
 * Наблюдатель за высотой
 */
let heightObserver: NodeJS.Timeout | null = null

// Частота проверки обновления значения window.visualViewport.height
const VIEWPORT_OBSERVER_INTERVAL = 100
const KEYBOARD_DEFAULT_HEIGHT = 255

const intialHeight = ref<number>(window.visualViewport?.height || window.innerHeight)
const currentHeight = ref<number>(window.visualViewport?.height || window.innerHeight)
const keyboardHeight = ref<number>(KEYBOARD_DEFAULT_HEIGHT)
const isOpenedKeyboard = ref<boolean>(false)

/**
 * Обработать событие изменения размера
 */
const onResize = (): void => {
  const handler = (): void => {
    const newHeight = window.visualViewport?.height || window.innerHeight
    isOpenedKeyboard.value = intialHeight.value > newHeight
    currentHeight.value = newHeight
  }

  window.requestAnimationFrame(handler)
}

/**
 * Инициализировать наблюдатель высоты
 */
const initHeightObserver = (): void => {
  heightObserver = setInterval(onResize, VIEWPORT_OBSERVER_INTERVAL)
}

/**
 * Уничтожить наблюдатель высоты
 */
const destroyHeightObserver = (): void => {
  if (heightObserver) {
    clearInterval(heightObserver)
    heightObserver = null
  }
}

/**
 * Установить слушателей на события
 */
const setListeners = (): void => {
  if (!heightObserver) {
    initHeightObserver()
  }
}

/**
 * Снять слушателей с событий
 */
const unsetListeners = (): void => {
  if (heightObserver) {
    destroyHeightObserver()
  }
}

/**
 * Composable для детектора виртуальной клавиатуры смартфона
 */
export const useKeyboard = (options?: KeyboardOptions): KeyboardState => {
  const config = options || {}

  const onOpen = config.onOpen || (() => {})
  const onClose = config.onClose || (() => {})

  // Наблюдать за изменениями статуса, вызывать обработчики
  watch(
    () => isOpenedKeyboard.value,
    (isOpened: boolean) => (isOpened ? onOpen() : onClose()),
  )

  return {
    isOpenedKeyboard,
    intialHeight,
    currentHeight,
    keyboardHeight,

    setListeners,
    unsetListeners,
  }
}
