import { ref, computed, onBeforeUnmount, inject, type EmitFn, type ModelRef } from "vue"

// tiptap
import { Color } from "@tiptap/extension-color"
import ListItem from "@tiptap/extension-list-item"
import TextStyle from "@tiptap/extension-text-style"
import Underline from "@tiptap/extension-underline"
import Placeholder from "@tiptap/extension-placeholder"
import StarterKit from "@tiptap/starter-kit"

import { CustomEditor as Editor, type ICustomEditor } from "./CustomEditor"
import type { DeferredTimer } from "@types"

/**
 * Пропсы для useEditor
 */
interface UseEditorProps {
  content: ModelRef<string | undefined>
  emit: EmitFn<["update", "save"]>
  props: {
    placeholder: string
  }
}

/**
 * Хук для редактора
 */
export const useEditor = ({ content, emit, props }: UseEditorProps) => {
  const deferredTimer = inject<DeferredTimer>("createDeferredTimer")

  const isPanelFocused = ref<boolean>(false)
  const isContentFocused = ref<boolean>(false)

  const isFocused = computed(() => isPanelFocused.value || isContentFocused.value)
  const placeholder = computed(() => {
    if (props.placeholder !== null) {
      return props.placeholder
    }

    return isFocused.value ? "Напиши текст..." : "Кликни сюда и напиши текст..."
  })

  const editor = new Editor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle,
      Placeholder.configure({
        placeholder: placeholder.value,
      }),
      Underline,
      StarterKit,
    ],
    editorProps: {
      attributes: {
        spellcheck: "false",
      },
    },
    content: content.value,
    onUpdate({ editor }) {
      content.value = (editor as ICustomEditor).getContent()

      emit("update", content.value)

      deferredTimer?.start(1000, () => emit("save", content.value))
    },
    onFocus({ editor }) {
      ;(editor as ICustomEditor).setExtensionOptions("placeholder", { placeholder: placeholder.value })

      isContentFocused.value = true
    },
    onBlur({ editor }) {
      ;(editor as ICustomEditor).setExtensionOptions("placeholder", { placeholder: placeholder.value })

      isContentFocused.value = false
    },
  })

  const onPanelOver = () => isContentFocused.value && (isPanelFocused.value = true)
  const onPanelLeave = () => (isPanelFocused.value = false)

  onBeforeUnmount(() => editor.destroy())

  return {
    editor,

    isFocused,
    isContentFocused,

    onPanelOver,
    onPanelLeave,
  }
}
