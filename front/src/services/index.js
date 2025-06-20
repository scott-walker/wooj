import UserService from "./UserService"

/**
 * Инициализировать сервисы
 * @param {Object} utils утилиты
 */
export default (utils) => {
  utils = utils || {}

  const user = new UserService(utils.httpClient)

  return {
    user,
  }
}
