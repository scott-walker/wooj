import axios from "axios"

/**
 * HTTP клиент
 * @property instance {AxiosInstance}
 * @property options {Object}
 * @property token {String}
 */
export default class HttpClient {
  /**
   * Инициализировать HTTP клиент
   * @param {Object} options
   */
  constructor(options) {
    this.options = options || {}
    this.token = options.token || null

    this.init()
    this.setToken(this.token)
  }

  /**
   * Инициализировать axios
   */
  init() {
    const headers = this.options.headers || {}

    headers["Content-Type"] = headers["Content-Type"] || "application/json"

    const options = {
      baseURL: this.options.baseUrl || null,
      timeout: this.options.timeout || 1000,
      withCredentials: this.options.credentials || false,
      headers,
    }

    const instance = axios.create(options)

    instance.interceptors.request.use(this.handleRequest, this.handleRequestError)
    instance.interceptors.response.use(this.handleResponse, this.handleResponseError)

    this.instance = instance
  }

  /**
   * Установить токен
   * @param {String|null} token
   */
  setToken(token) {
    this.token = token || null
    this.instance.defaults.headers.common["Authorization"] = this.token ? `Bearer ${this.token}` : null
  }

  /**
   * Сбросить токен
   */
  unsetToken() {
    this.setToken(null)
  }

  /**
   * Обработчик запросов
   * @param {Object} config
   */
  handleRequest(config) {
    // console.log("XHR REQUEST")
    // console.log(config)

    return config
  }

  /**
   * Обработчик ответа
   * @param {Object} response
   */
  handleResponse(response) {
    // console.log("XHR RESPONSE")
    // console.log(response)

    return response.data
  }

  /**
   * Обработчик ошибки запроса
   * @param {Object} error
   */
  handleRequestError(error) {
    // console.log("XHR REQUEST ERROR")
    // console.log(error)

    return Promise.reject(error)
  }

  /**
   * Обработчик ошибки ответа
   * @param {Object} error
   */
  handleResponseError(error) {
    // console.log("XHR RESPONSE ERROR")
    // console.log(error)

    return Promise.reject(error)
  }

  /**
   * Сформировать сообщение для исключения
   * @param {Object} response
   * @returns {Object}
   */
  makeError(response) {
    const message = response?.data?.message || "Ошибка запроса к серверу"
    let errors = response?.data?.errors

    if (errors) {
      errors = errors instanceof Object ? Object.values(errors).flat() : Array.from(errors)
    }

    return { message, errors }
  }

  /**
   * GET запрос
   * @param  {...any} params
   * @returns {Promise}
   */
  async get(...params) {
    try {
      return await this.instance.get(...params)
    } catch ({ response }) {
      throw this.makeError(response)
    }
  }

  /**
   * POST запрос
   * @param  {...any} params
   * @returns {Promise}
   */
  async post(...params) {
    try {
      return await this.instance.post(...params)
    } catch ({ response }) {
      throw this.makeError(response)
    }
  }

  /**
   * PUT запрос
   * @param  {...any} params
   * @returns {Promise}
   */
  async put(...params) {
    try {
      return await this.instance.put(...params)
    } catch ({ response }) {
      throw this.makeError(response)
    }
  }

  /**
   * DELETE запрос
   * @param  {...any} params
   * @returns {Promise}
   */
  async delete(...params) {
    try {
      return await this.instance.delete(...params)
    } catch ({ response }) {
      throw this.makeError(response)
    }
  }
}
