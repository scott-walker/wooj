import { ref, computed, inject } from "vue"
import { defineStore } from "pinia"
import { useToastsStore } from "@stores/toasts"
import type { User, LoginForm, Utils, Services } from "@types"

/**
 * Стор для пользователя
 */
export const useUserStore = defineStore("user", () => {
  const { storage } = inject<Utils>("utils")!
  const { userService } = inject<Services>("services")!
  const toastsStore = useToastsStore()

  const token = ref<string | null>(null)
  const user = ref<User | Record<string, never>>({})
  const resendTimer = ref<number | null>(null)

  const isLogged = computed((): boolean => !!token.value)

  const isVerified = computed((): boolean => {
    return "is_verified" in user.value && !!user.value.is_verified
  })

  const avatar = computed((): string | null => {
    if (!("avatar" in user.value) || !user.value.avatar) {
      return null
    }

    return import.meta.env.VITE_API_BASE_URL + "/" + user.value.avatar
  })

  /**
   * Инициализация
   */
  function init(): void {
    token.value = storage.get("token", null)
    resendTimer.value = storage.get("resendTimer", null)

    userService.setToken(token.value)
  }

  /**
   * Проверить авторизацию (и получить пользователя)
   */
  async function check(): Promise<void> {
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
   */
  async function register({ email, password }: LoginForm): Promise<void> {
    try {
      const data = await userService.register(email, password)

      token.value = data.token
      user.value = data.user

      storage.set("token", data.token)
    } catch (error: any) {
      const { message, errors } = error
      toastsStore.alert(message, errors, 5)
    }
  }

  /**
   * Войти в систему
   */
  async function login({ email, password }: LoginForm): Promise<void> {
    try {
      const data = await userService.login(email, password)

      token.value = data.token
      user.value = data.user

      storage.set("token", data.token)
    } catch (error: any) {
      const { message } = error
      toastsStore.alert(message)
    }
  }

  /**
   * Выйти из системы
   */
  async function logout(): Promise<void> {
    try {
      await userService.logout()

      token.value = null
      user.value = {}

      storage.clear()
    } catch (message: any) {
      toastsStore.alert(message)
    }
  }

  /**
   * Поменять аватар
   */
  async function changeAvatar(avatar: File): Promise<void> {
    try {
      user.value = await userService.changeAvatar(avatar)
      toastsStore.success("Успешно поменяли аватар")
    } catch (message: any) {
      toastsStore.alert(message)
    }
  }

  /**
   * Обновить пользователя
   */
  async function update(fields: Partial<User>): Promise<void> {
    try {
      user.value = await userService.update(fields)
      toastsStore.success("Данные сохранены")
    } catch (message: any) {
      toastsStore.alert(message)
    }
  }

  /**
   * Отправить сообщение с подтверждением email заново
   */
  async function resend(): Promise<void> {
    resendTimer.value = storage.set("resendTimer", 60)
    startResendTimer()

    try {
      await userService.resend()

      const userEmail = "email" in user.value ? user.value.email : "неизвестный email"
      toastsStore.success(`Сообщение отправлено повторно на <b>${userEmail}</b>`)
    } catch (message: any) {
      toastsStore.alert(message)
    }
  }

  /**
   * Запустить таймер переотправки email с верификацией
   */
  function startResendTimer(): void {
    if (!resendTimer.value) return

    let timer: NodeJS.Timeout | null = null

    const tick = (): void => {
      if (resendTimer.value !== null && resendTimer.value <= 0) {
        storage.remove("resendTimer")
        resendTimer.value = null

        if (timer) {
          clearInterval(timer)
        }
        return
      }

      if (resendTimer.value !== null) {
        resendTimer.value = storage.set("resendTimer", resendTimer.value - 1)
      }
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

// Экспорт по умолчанию для совместимости
export default useUserStore
