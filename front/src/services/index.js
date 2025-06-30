import UserService from "./UserService"
import WoojService from "./WoojService"
import TopicService from "./TopicService"

/**
 * Инициализировать сервисы
 * @param {Object} utils утилиты
 */
export default (utils) => {
  utils = utils || {}

  const userService = new UserService(utils.httpClient)
  const woojService = new WoojService(utils.httpClient)
  const topicService = new TopicService(utils.httpClient)

  return {
    userService,
    woojService,
    topicService,
  }
}
