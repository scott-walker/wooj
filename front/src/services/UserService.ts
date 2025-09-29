import type {
  HttpClient,
  HttpClientError,
  UserService as IUserService,
  User,
  AuthResponse,
  ChangeAvatarResponse,
  UpdateUserResponse,
  CheckResponse,
} from "@types"

/**
 * Сервис для работы с пользователем
 */
export default class UserService implements IUserService {
  http: HttpClient

  /**
   * HTTP клиент
   */
  constructor(httpClient: HttpClient) {
    this.http = httpClient
  }

  /**
   * Установить токен
   */
  setToken(token: string) {
    this.http.setToken(token)
  }

  /**
   * Сбросить токен
   */
  unsetToken() {
    this.http.unsetToken()
  }

  /**
   * Проверить авторизацию (и получить пользователя)
   */
  async check() {
    try {
      const { user } = await this.http.get<CheckResponse>("check")

      return user
    } catch {
      throw "Пользователь не авторизован"
    }
  }

  /**
   * Зарегистрироваться
   */
  async register(email: string, password: string) {
    try {
      const { user, token } = await this.http.post<AuthResponse>("register", {
        email,
        password,
      })

      this.setToken(token)

      return { user, token }
    } catch (error: unknown) {
      throw { message: "Не удалось зарегистрироваться", errors: (error as HttpClientError).errors }
    }
  }

  /**
   * Войти в систему
   */
  async login(email: string, password: string) {
    try {
      const { user, token } = await this.http.post<AuthResponse>("login", {
        email,
        password,
      })

      this.setToken(token)

      return { user, token }
    } catch (error: unknown) {
      throw { message: "Не удалось войти", errors: (error as HttpClientError).errors }
    }
  }

  /**
   * Выйти из системы
   */
  async logout() {
    try {
      await this.http.post("logout")

      this.unsetToken()
    } catch {
      throw "Не удалось выйти"
    }
  }

  /**
   * Поменять аватар
   */
  async changeAvatar(avatar: File) {
    try {
      const formData = new FormData()
      const headers = { "Content-Type": "multipart/form-data" }

      formData.append("avatar", avatar)

      const { user } = await this.http.post<ChangeAvatarResponse>("user/avatar", formData, { headers })

      return user
    } catch {
      throw "Не удалось поменять аватар"
    }
  }

  /**
   * Обновить пользователя
   */
  async update(fields: Partial<User>) {
    try {
      const { user } = await this.http.put<UpdateUserResponse>("user", fields)

      return user
    } catch {
      throw "Не удалось обновить пользователя"
    }
  }

  /**
   * Отправить сообщение с подтверждением email заново
   */
  async resend() {
    try {
      await this.http.post<void>("resend")
    } catch {
      throw "Не удалось отправить сообщение"
    }
  }
}
