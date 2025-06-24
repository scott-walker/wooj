import UserService from "./UserService"
import WoojService from "./WoojService"

/**
 * Инициализировать сервисы
 * @param {Object} utils утилиты
 */
export default (utils) => {
  utils = utils || {}

  const user = new UserService(utils.httpClient)
  const wooj = new WoojService(utils.httpClient)

  return {
    user,
    wooj,
  }
}
