import { ref, watch } from "vue"

/**
 * Детектор виртуальной клавиатуры смартфона
 * @param {Object} options
 * @returns {Object}
 */
export const useKeyboard = (options) => {
  options = options || {}

  const onOpen = options.onOpen || (() => {})
  const onClose = options.onClose || (() => {})

  // Задержка во времени открытия клавиатуры
  const KEYBOARD_OPENING_DELAY = 300

  const intialHeight = ref(window.visualViewport.height)
  const currentHeight = ref(window.visualViewport.height)
  const keyboardHeight = ref(null)
  const isOpened = ref(false)

  /**
   * Проверка на редактируемое поле в данный момент
   * @returns {Boolean}
   */
  // const isEdition = () => {
  //   if (!document.activeElement) return false

  //   const isField = ["input", "textarea"].includes(document.activeElement.tagName.toLocaleLowerCase())
  //   const isEditable = document.activeElement.getAttribute("contenteditable")

  //   return Boolean(isField || isEditable)
  // }

  /**
   * Проверка на изменение высоты окна
   * @returns {Boolean}
   */
  const isDifferendHeight = () => intialHeight.value > currentHeight.value

  /**
   * Обработать событие
   */
  const onResize = () => {
    const handler = () => {
      currentHeight.value = window.visualViewport.height
      isOpened.value = isDifferendHeight() //&& isEdition()

      if (!keyboardHeight.value && isOpened.value) {
        keyboardHeight.value = intialHeight.value - currentHeight.value
      }
    }

    setTimeout(handler, KEYBOARD_OPENING_DELAY)
  }

  /**
   * Установить слушателей на события
   */
  const setListeners = (editorElement) => {
    editorElement.addEventListener("focus", onResize)
    editorElement.addEventListener("blur", onResize)
    // window.addEventListener("resize", onResize)
    // window.visualViewport?.addEventListener("resize", onResize)
  }
  /**
   * Снять слушателей с событий
   */
  const unsetListeners = (editorElement) => {
    if (!editorElement) return

    editorElement.removeEventListener("focus", onResize)
    editorElement.removeEventListener("blur", onResize)
    // window.removeEventListener("resize", onResize)
    // window.visualViewport?.removeEventListener("resize", onResize)
  }

  // Наблюбдать за изменениями статуса, вызывать обработчики
  watch(
    () => isOpened.value,
    (isOpened) => (isOpened ? onOpen() : onClose()),
  )

  return {
    isOpened,
    intialHeight,
    currentHeight,
    keyboardHeight,

    setListeners,
    unsetListeners,
  }
}
