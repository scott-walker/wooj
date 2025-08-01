import { reactive } from "vue"

const toasts = reactive([])

/**
 * Добавить уведомление
 * @param {Object}
 * @returns {void}
 */
const add = ({ type, message, duration }) => {
  const id = Date.now() + Math.random()

  type = type || "info"
  duration = duration || 3
  duration = duration * 1000

  toasts.push({ id, type, message })

  setTimeout(() => remove(id), duration)
}

/**
 * Добавить тервожное уведомление
 * @param {String} message
 * @param {Array} errors
 * @param {Number} duration
 * @returns {void}
 */
const alert = (message, errors, duration) => {
  if (errors && errors.length) {
    message = `<b>${message}:</b><br /> - ${errors.join("<br /> - ")}`
  }

  add({ type: "alert", message, duration })
}

/**
 * Добавить информационное уведомление
 * @param {String} message
 * @param {Number} duration
 * @returns {void}
 */
const info = (message, duration) => add({ type: "info", message, duration })

/**
 * Добавить успешное уведомление
 * @param {String} message
 * @param {Number} duration
 * @returns {void}
 */
const success = (message, duration) => add({ type: "success", message, duration })

/**
 * Удалить уведомление
 * @param {Number}
 * @returns {void}
 */
const remove = (id) => {
  const index = toasts.findIndex((t) => t.id === id)

  if (index !== -1) toasts.splice(index, 1)
}

export default () => {
  return {
    toasts,
    get: () => toasts,
    alert,
    info,
    success,
    add,
    remove,
  }
}
