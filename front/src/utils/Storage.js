/**
 * Утилита для работы с локальным хранилищем
 */
export default class Storage {
  /**
   * Инициализировать хранилище
   * @param {Object} options
   */
  constructor(options) {
    this.options = options || {}
  }

  /**
   * Установить данные в хранилище
   * @param {String} key
   * @param {*} value
   */
  set(key, value) {
    value = JSON.stringify(value)

    localStorage.setItem(key, value)
  }

  /**
   * Получить данные из хранилища
   * @param {String} key
   * @param {*} defaultValue
   */
  get(key, defaultValue) {
    defaultValue = defaultValue || null

    const value = JSON.parse(localStorage.getItem(key))

    return value !== null ? value : defaultValue
  }

  /**
   * Удалить данные из хранилища
   * @param {String} key
   */
  remove(key) {
    localStorage.removeItem(key)
  }

  /**
   * Очистить хранилище
   */
  clear(key) {
    localStorage.clear(key)
  }
}
