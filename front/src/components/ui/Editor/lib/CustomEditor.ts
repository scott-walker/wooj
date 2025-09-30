import { Editor } from "@tiptap/vue-3"
import type { EditorEvents, EditorOptions, Extension } from "@tiptap/core"

/**
 * Опции редактора
 */
export interface ICustomEditor extends Editor {
  apply: () => CustomEditor
  getContent: () => string
  setContent: (content: string) => CustomEditor
  getExtension: (name: string) => Extension
  setExtensionOptions: (name: string, options: Record<string, unknown>) => CustomEditor
}

/**
 * Опции редактора
 */
export interface CustomEditorOptions extends EditorOptions {}

/**
 * Кастомезированный класс редактора TipTap
 */
export class CustomEditor extends Editor implements ICustomEditor {
  /**
   * Инициализировать
   * @param  {...Partial<EditorOptions>} options опции редактора
   */
  constructor(...options: Partial<CustomEditorOptions>[]) {
    super(...options)
  }

  /**
   * Применить изменения
   */
  apply(): CustomEditor {
    this.commands.insertContentAt(0, "")

    return this
  }

  /**
   * Получить контент
   * @returns {string}
   */
  getContent(): string {
    return this.getHTML()
  }

  /**
   * Установить контент
   * @param {string} content
   */
  setContent(content: string): CustomEditor {
    this.commands.setContent(content)

    return this
  }

  /**
   * Получить расширение
   * @param {string} name имя расширения
   */
  getExtension(name: string): Extension {
    const extension = this.options.extensions.find((extension) => extension.name === name) as Extension

    if (!extension) {
      throw `Extension "${name}" is not found`
    }

    return extension
  }

  /**
   * Установить опции расширения
   * @param {string} name имя расширения
   * @param {Record<string, unknown>} options карта опций
   */
  setExtensionOptions(name: string, options: Record<string, unknown>): CustomEditor {
    const extension = this.getExtension(name)

    for (const [key, value] of Object.entries(options)) {
      extension.options[key] = value
    }

    return this.apply()
  }
}
