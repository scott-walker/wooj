/**
 * Пользователь
 *
 * @property {number} id - ID
 * @property {string} name - Имя
 * @property {string} email - Email
 * @property {string} avatar - Аватар (путь к файлу)
 * @property {boolean} is_verified - Флаг верификации (почта подтверждена)
 */
export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  is_verified: boolean
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
}

/**
 * Топик
 *
 * @property {number} id - ID
 * @property {string} type - Тип
 * @property {string} name - Название
 * @property {number} author_id - ID автора
 * @property {number[]} wooj_positions - Позиции вуджей
 */
export interface Topic {
  id: number
  type: "all" | "pinned" | "public" | "custom"
  name: string
  author_id: number
  wooj_positions: number[]
}

/**
 * Тост
 *
 * @property {number} id - ID
 * @property {string} type - Тип
 * @property {string} message - Сообщение
 */
export interface Toast {
  id: number
  type: "info" | "success" | "alert"
  message: string
}
