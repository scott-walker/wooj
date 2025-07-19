/**
 * Сервис для работы с пользователем
 * @property {Object} httpClient
 */
export default class UserService {
  /**
   * HTTP клиент
   * @param {Object} httpClient
   */
  constructor(httpClient) {
    this.http = httpClient
  }

  /**
   * Установить токен
   * @param {String} token
   */
  setToken(token) {
    this.http.setToken(token)
  }

  /**
   * Сбросить токен
   */
  unsetToken() {
    this.http.unsetToken()
  }

  /**
   * Зарегистрироваться
   * @param {String} email
   * @param {String} password
   * @returns
   */
  async register(email, password) {
    try {
      const { user, token } = await this.http.post("register", {
        email,
        password,
      })

      this.setToken(token)

      return { user, token }
    } catch ({ response }) {
      throw {
        message: "Не удалось зарегистрироваться",
        errors: response.data.errors || {},
      }
    }
  }

  /**
   * Войти в систему
   * @param {String} email
   * @param {String} password
   * @returns
   */
  async login(email, password) {
    try {
      const { user, token } = await this.http.post("login", {
        email,
        password,
      })

      this.setToken(token)

      return { user, token }
    } catch ({ response }) {
      throw {
        message: "Не удалось войти",
        errors: response.data.errors || {},
      }
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
  async changeAvatar(avatar) {
    try {
      const formData = new FormData()
      const headers = { "Content-Type": "multipart/form-data" }

      formData.append("avatar", avatar)

      const { user } = await this.http.post("user/avatar", formData, { headers })

      return user
    } catch {
      throw "Не удалось поменять аватар"
    }
  }

  /**
   * Обновить пользователя
   */
  async update(fields) {
    try {
      const { user } = await this.http.put("user", fields)

      return user
    } catch {
      throw "Не удалось обновить пользователя"
    }
  }
}
