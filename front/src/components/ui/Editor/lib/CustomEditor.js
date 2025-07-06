import { Editor } from "@tiptap/vue-3"

/**
 * Кастомезированный класс редактора TipTap
 */
export default class CustomEditor extends Editor {
  /**
   * Инициализировать
   * @param  {...any} params
   */
  constructor(...params) {
    super(...params)
  }

  /**
   * Применить изменения
   * @returns {CustomEditor} редактор
   */
  apply() {
    this.commands.insertContentAt(0, "")

    return this
  }

  /**
   * Получить контент
   * @returns {String}
   */
  getContent() {
    return this.getHTML()
  }

  /**
   * Установить контент
   * @param {String} content
   * @returns {CustomEditor}
   */
  setContent(content) {
    this.commands.setContent(content)

    return this
  }

  /**
   * Получить расширение
   * @param {String} name имя расширения
   * @returns {Object} расширение
   */
  getExtension(name) {
    const extension = this.options.extensions.find((extension) => extension.name === name)

    if (!extension) {
      throw `Extension "${name}" is not found`
    }

    return extension
  }

  /**
   * Установить опции расширения
   * @param {String} name имя расширения
   * @param {Object} options карта опций
   * @returns {CustomEditor} редактор
   */
  setExtensionOptions(name, options) {
    const extension = this.getExtension(name)

    for (const [key, value] of Object.entries(options)) {
      extension.options[key] = value
    }

    return this.apply()
  }
}
