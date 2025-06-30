import { ref, computed, inject } from "vue"
import { defineStore } from "pinia"

/**
 * Стор авторизационных данных
 */
export const useAuthStore = defineStore("auth", () => {
  const { storage } = inject("utils")
  const { userService } = inject("services")

  const token = ref(null)
  const user = ref(null)
  const isLogged = computed(() => !!token.value)

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

  // Инициализировать
  init()

  return { token, user, isLogged, login, logout }
})
