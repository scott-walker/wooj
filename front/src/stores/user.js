import { ref, computed, inject } from "vue"
import { defineStore } from "pinia"

/**
 * Стор для пользователя
 */
export default defineStore("user", () => {
  const { storage } = inject("utils")
  const { userService } = inject("services")

  const token = ref(null)
  const user = ref(null)
  const isLogged = computed(() => !!token.value)
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
    user.value = storage.get("user", null)

    userService.setToken(token.value)
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
      storage.set("user", data.user)
    } catch (message) {
      alert(message)
    }
  }

  /**
   * Выйти из системы
   */
  async function logout() {
    try {
      await userService.logout()

      token.value = null
      user.value = null

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

      storage.set("user", user.value)
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

      storage.set("user", user.value)
    } catch (message) {
      alert(message)
    }
  }

  // Инициализировать
  init()

  return {
    token,
    user,
    avatar,
    isLogged,

    login,
    logout,
    changeAvatar,
    update,
  }
})
