import type { Storage as IStorage, StorageOptions } from "@types"

/**
 * Утилита для работы с локальным хранилищем
 */
export default class Storage implements IStorage {
  options: StorageOptions

  /**
   * Конструктор
   * @param {Storage} options - Опции
   */
  constructor(options: StorageOptions) {
    this.options = options
  }

  /**
   * Установить данные в хранилище
   */
  set(key: string, value: any): any {
    localStorage.setItem(key, JSON.stringify(value))

    return value
  }

  /**
   * Получить данные из хранилища
   */
  get(key: string, defaultValue: any): any {
    defaultValue = defaultValue || null

    const value = JSON.parse(localStorage.getItem(key) || "null")

    return value !== null ? value : defaultValue
  }

  /**
   * Удалить данные из хранилища
   */
  remove(key: string): void {
    localStorage.removeItem(key)
  }

  /**
   * Очистить хранилище
   */
  clear(): void {
    localStorage.clear()
  }
}
