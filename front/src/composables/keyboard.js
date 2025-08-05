import { ref, watch } from "vue"

let heightObserver = null

// Частота проверки обновления значения window.visualViewport.height
const VIEWPORT_OBSERVER_INTERVAL = 100
const KEYBOARD_DEFAULT_HEIGHT = 255

const intialHeight = ref(window.visualViewport.height)
const currentHeight = ref(window.visualViewport.height)
const keyboardHeight = ref(KEYBOARD_DEFAULT_HEIGHT)
// const keyboardHeight = ref(null)
const isOpenedKeyboard = ref(false)

/**
 * Обработать событие
 */
const onResize = () => {
  // console.log("onResize")
  // console.log("visualViewport", window.visualViewport.height)

  const handler = () => {
    isOpenedKeyboard.value = intialHeight.value > currentHeight.value
    currentHeight.value = window.visualViewport.height

    // console.log({ currentHeight: currentHeight.value })

    // if (!keyboardHeight.value && isOpenedKeyboard.value) {
    //   keyboardHeight.value = intialHeight.value - currentHeight.value
    // }
    // keyboardHeight.value = intialHeight.value - currentHeight.value
  }

  window.requestAnimationFrame(handler)
  // setTimeout(handler, KEYBOARD_OPENING_DELAY)
}

const initHeightObserver = () => {
  heightObserver = setInterval(onResize, VIEWPORT_OBSERVER_INTERVAL)
}

const destroyHeightObserver = () => {
  clearInterval(heightObserver)
  heightObserver = null
}

/**
 * Установить слушателей на события
 */
const setListeners = () => {
  !heightObserver && initHeightObserver()

  // editorElement.addEventListener("focus", onResize)
  // editorElement.addEventListener("blur", onResize)

  // window.addEventListener("resize", onResize)
  // window.visualViewport?.addEventListener("resize", onResize)
}

/**
 * Снять слушателей с событий
 */
const unsetListeners = () => {
  heightObserver && destroyHeightObserver()

  // if (!editorElement) return

  // editorElement.removeEventListener("focus", onResize)
  // editorElement.removeEventListener("blur", onResize)

  // window.removeEventListener("resize", onResize)
  // window.visualViewport?.removeEventListener("resize", onResize)
}

/**
 * Детектор виртуальной клавиатуры смартфона
 * @param {Object} options
 * @returns {Object}
 */
export const useKeyboard = (options) => {
  options = options || {}

  const onOpen = options.onOpen || (() => {})
  const onClose = options.onClose || (() => {})

  // Наблюбдать за изменениями статуса, вызывать обработчики
  watch(
    () => isOpenedKeyboard.value,
    (isOpened) => (isOpened ? onOpen() : onClose()),
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
