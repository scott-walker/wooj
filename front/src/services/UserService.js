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

      this.http.setToken(token)

      return { user, token }
    } catch {
      throw "Не удалось войти"
    }
  }

  async getTest() {
    const { version } = await this.http.get("version")

    return version
  }
}
