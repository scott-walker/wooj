import type { TopicType } from "./entities"

/**
 * Логин
 *
 * @property {string} email - Email
 * @property {string} password - Пароль
 */
export interface LoginForm {
    email: string
    password: string
  }
  
  /**
   * Регистрация
   *
   * @property {string} email - Email
   * @property {string} password - Пароль
   * @property {string} password_confirmation - Подтверждение пароля
   */
  export interface RegisterForm {
    name: string
    email: string
    password: string
    password_confirmation: string
  }
  
  /**
   * Вудж
   *
   * @property {string} title - Заголовок
   * @property {string} content - Контент
   * @property {number[]} topic_ids - ID топиков
   */
  export interface WoojForm {
    title: string
    content: string
    topic_ids?: number[]
  }
  
  /**
   * Топик
   *
   * @property {string} name - Название
   * @property {string} type - Тип
   */
  export interface TopicForm {
    name: string
    type: TopicType
  }
  