import { ref, computed, inject } from "vue"
import { defineStore } from "pinia"

/**
 * Стор для пользователя
 */
export default defineStore("user", () => {
  const { storage } = inject("utils")
  const { userService } = inject("services")

  const token = ref(null)
  const user = ref({})
  const resendTimer = ref(null)
  const isLogged = computed(() => !!token.value)
  const isVerified = computed(() => !!user.value.is_verified)
  const avatar = computed(() => {
    if (!user.value.avatar) {
      return null
    }

    return import.meta.env.VITE_API_BASE_URL + "/" + user.value.avatar
  })

  /**
   * Инициализация
   */
  function init() {
    token.value = storage.get("token", null)
    resendTimer.value = storage.get("resendTimer", null)

    userService.setToken(token.value)
  }

  /**
   * Проверить авторизацию (и получить пользователя)
   */
  async function check() {
    try {
      user.value = await userService.check()
    } catch {
      token.value = null
      user.value = {}

      storage.clear()
    }
  }

  /**
   * Зарегистрироваться
   * @param {Object} data - email, password
   */
  async function register({ email, password }) {
    try {
      const data = await userService.register(email, password)

      token.value = data.token
      user.value = data.user

      storage.set("token", data.token)
    } catch ({ message, errors }) {
      throw { message, errors }
    }
  }

  /**
   * Войти в систему
   * @param {Object} data - email, password
   */
  async function login({ email, password }) {
    try {
      const data = await userService.login(email, password)

      token.value = data.token
      user.value = data.user

      storage.set("token", data.token)
    } catch ({ message, errors }) {
      throw { message, errors }
    }
  }

  /**
   * Выйти из системы
   */
  async function logout() {
    try {
      await userService.logout()

      token.value = null
      user.value = {}

      storage.clear()
    } catch (message) {
      alert(message)
    }
  }

  /**
   * Поменять аватар
   */
  async function changeAvatar(avatar) {
    try {
      user.value = await userService.changeAvatar(avatar)
    } catch (message) {
      alert(message)
    }
  }

  /**
   * Обновить пользователя
   */
  async function update(fields) {
    try {
      user.value = await userService.update(fields)
    } catch (message) {
      alert(message)
    }
  }

  /**
   * Отправить сообщение с подтверждением email заново
   */
  async function resend() {
    resendTimer.value = storage.set("resendTimer", 60)
    startResendTimer()

    try {
      await userService.resend()
    } catch (message) {
      alert(message)
    }
  }

  /**
   * Запустить таймер переотправки email с верификацией
   */
  function startResendTimer() {
    if (!resendTimer.value) return

    let timer = null

    const tick = () => {
      if (resendTimer.value <= 0) {
        resendTimer.value = storage.remove("resendTimer")

        clearInterval(timer)
        return
      }

      resendTimer.value = storage.set("resendTimer", --resendTimer.value)
    }

    timer = setInterval(tick, 1000)
  }

  // Инициализировать
  init()

  return {
    token,
    user,
    resendTimer,
    avatar,
    isLogged,
    isVerified,

    check,
    register,
    login,
    logout,
    changeAvatar,
    update,
    resend,
    startResendTimer,
  }
})
