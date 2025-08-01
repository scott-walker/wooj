import { reactive } from "vue"

const toasts = reactive([])

/**
 * Добавить уведомление
 * @param {Object}
 * @returns {void}
 */
const addToast = ({ message, type = "info", duration = 3000 }) => {
  const id = Date.now() + Math.random()

  toasts.push({ id, message, type })

  setTimeout(() => removeToast(id), duration)
}

/**
 * Удалить уведомление
 * @param {Number}
 * @returns {void}
 */
const removeToast = (id) => {
  const index = toasts.findIndex((t) => t.id === id)

  if (index !== -1) toasts.splice(index, 1)
}

export default () => {
  return {
    toasts,
    addToast,
    removeToast,
  }
}
