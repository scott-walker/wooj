import UserService from "./UserService"
import WoojService from "./WoojService"
import TopicService from "./TopicService"

/**
 * Инициализировать сервисы
 * @param {Object} utils утилиты
 */
export default (utils) => {
  utils = utils || {}

  const user = new UserService(utils.httpClient)
  const wooj = new WoojService(utils.httpClient)
  const topic = new TopicService(utils.httpClient)

  return {
    user,
    wooj,
    topic,
  }
}
