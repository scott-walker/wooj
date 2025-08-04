export default {
  mounted(el, binding) {
    let timer = null

    const isObject = typeof binding.value === "object"
    const delay = isObject ? (binding.value.delay ?? 600) : 600
    const handler = isObject ? binding.value.onLongPress : binding.value

    const start = (e) => {
      if (timer !== null) return

      //   if (el == e.target || el.contains(e.target)) {
      //     timer = setTimeout(() => handler(e), delay)
      //   }

      timer = setTimeout(() => handler(e), delay)
    }

    const cancel = () => {
      if (timer !== null) {
        clearTimeout(timer)
        timer = null
      }
    }

    el.__longPressHandlers__ = { start, cancel }

    el.addEventListener("touchstart", start)
    el.addEventListener("touchend", cancel)
    el.addEventListener("touchmove", cancel)

    // el.addEventListener('mousedown', start)
    // el.addEventListener('mouseup', cancel)
    // el.addEventListener('mouseleave', cancel)
  },

  unmounted(el) {
    const { start, cancel } = el.__longPressHandlers__ || {}

    el.removeEventListener("touchstart", start)
    el.removeEventListener("touchend", cancel)
    el.removeEventListener("touchmove", cancel)

    // el.removeEventListener('mousedown', start)
    // el.removeEventListener('mouseup', cancel)
    // el.removeEventListener('mouseleave', cancel)

    delete el.__longPressHandlers__
  },
}
