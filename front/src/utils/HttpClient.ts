import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios"

import type {
  HttpClient as IHttpClient,
  HttpClientOptions,
  HttpClientError,
  HttpClientErrorResponse,
  HttpClientResponse,
} from "@types"

/**
 * HTTP клиент
 */
export default class HttpClient implements IHttpClient {
  options: HttpClientOptions
  instance!: AxiosInstance
  token: string | null

  /**
   * Инициализировать HTTP клиент
   */
  constructor(options: HttpClientOptions) {
    this.options = options || {}
    this.token = options.token || null

    this.init()
    this.setToken(this.token)
  }

  /**
   * Инициализировать axios
   */
  init(): void {
    const headers = this.options.headers || {}

    headers["Content-Type"] = headers["Content-Type"] || "application/json"

    const options: AxiosRequestConfig = {
      baseURL: this.options.baseUrl || undefined,
      timeout: this.options.timeout || 0,
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
  setToken(token: string | null): void {
    this.token = token || null
    this.instance.defaults.headers.common["Authorization"] = this.token ? `Bearer ${this.token}` : null
  }

  /**
   * Сбросить токен
   */
  unsetToken(): void {
    this.setToken(null)
  }

  /**
   * Обработчик запросов
   */
  handleRequest(config: AxiosRequestConfig): InternalAxiosRequestConfig {
    // console.log("XHR REQUEST")
    // console.log(config)

    return config as InternalAxiosRequestConfig
  }

  /**
   * Обработчик ответа
   */
  handleResponse(response: AxiosResponse): AxiosResponse {
    // console.log("XHR RESPONSE")
    // console.log(response)

    return response.data
  }

  /**
   * Обработчик ошибки запроса
   */
  handleRequestError(error: AxiosError): Promise<AxiosError> {
    // console.log("XHR REQUEST ERROR")
    // console.log(error)

    return Promise.reject(error)
  }

  /**
   * Обработчик ошибки ответа
   */
  handleResponseError(error: AxiosError): Promise<AxiosError> {
    // console.log("XHR RESPONSE ERROR")
    // console.log(error)

    return Promise.reject(error)
  }

  /**
   * Сформировать сообщение для исключения
   */
  makeError({ response }: HttpClientErrorResponse): HttpClientError {
    const message = response?.data?.message || ("Ошибка запроса к серверу" as string)

    let errors = response?.data?.errors

    if (errors) {
      errors = errors instanceof Object ? Object.values(errors).flat() : Array.from(errors)
    }

    return { message, errors }
  }

  /**
   * GET запрос
   */
  async get<T = AxiosRequestConfig>(url: string, config?: AxiosRequestConfig): Promise<HttpClientResponse<T>> {
    try {
      return await this.instance.get(url, config)
    } catch (error: unknown) {
      throw this.makeError(error as HttpClientErrorResponse)
    }
  }

  /**
   * POST запрос
   */
  async post<T = AxiosRequestConfig>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<HttpClientResponse<T>> {
    try {
      return await this.instance.post(url, data, config)
    } catch (error: unknown) {
      throw this.makeError(error as HttpClientErrorResponse)
    }
  }

  /**
   * PUT запрос
   */
  async put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<HttpClientResponse<T>> {
    try {
      return await this.instance.put(url, data, config)
    } catch (error: unknown) {
      throw this.makeError(error as HttpClientErrorResponse)
    }
  }

  /**
   * DELETE запрос
   */
  async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<HttpClientResponse<T>> {
    try {
      return await this.instance.delete(url, config)
    } catch (error: unknown) {
      throw this.makeError(error as HttpClientErrorResponse)
    }
  }
}
