/**
 * Пользователь
 *
 * @property {number} id - ID
 * @property {string} name - Имя
 * @property {string} email - Email
 * @property {string} avatar - Аватар (путь к файлу)
 * @property {boolean} is_verified - Флаг верификации (почта подтверждена)
 * @property {string} email_verified_at - Дата подтверждения email
 */
export interface User {
  id: number
  name: string
  email: string
  avatar?: string | null
  is_verified: boolean
  email_verified_at?: string | null
}

/**
 * Вудж
 *
 * @property {number} id - ID
 * @property {string} title - Заголовок
 * @property {string} content - Контент
 * @property {number} author_id - ID автора
 * @property {boolean} is_pinned - Флаг закрепления
 * @property {boolean} is_deleted - Флаг удаления
 * @property {number[]} topic_ids - ID топиков
 * @property {string} created_at - Дата создания
 * @property {string} updated_at - Дата обновления
 * @property {string} deleted_at - Дата удаления
 */
export interface Wooj {
  id: number
  title: string
  content: string
  author_id: number
  is_pinned: boolean
  is_deleted: boolean
  topic_ids: number[]
  created_at: string
  updated_at: string
  deleted_at?: string | null
}

/**
 * Топик
 *
 * @property {number} id - ID
 * @property {string} type - Тип
 * @property {string} name - Название
 * @property {number} author_id - ID автора
 * @property {number[]} wooj_positions - Позиции вуджей
 * @property {string} created_at - Дата создания
 * @property {string} updated_at - Дата обновления
 */
export interface Topic {
  id: number
  type: TopicType
  name: string
  author_id: number
  wooj_positions: number[]
  created_at: string
  updated_at: string
}

/**
 * Тип топика
 */
export type TopicType = "all" | "pinned" | "public" | "custom"

/**
 * Связь вуджа с топиком
 *
 * @property {number} id - ID
 * @property {number} wooj_id - ID вуджа
 * @property {number} topic_id - ID топика
 * @property {number} position - Позиция
 */
export interface WoojTopic {
  id: number
  wooj_id: number
  topic_id: number
  position: number
}
