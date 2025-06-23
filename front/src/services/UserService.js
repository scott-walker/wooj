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
    } catch {
      throw "Не удалось войти"
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

  async getTest() {
    const { version } = await this.http.get("version")

    return version
  }
}
