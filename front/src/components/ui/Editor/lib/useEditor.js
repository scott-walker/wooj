import { ref, computed, onBeforeUnmount, inject } from "vue"

// tiptap
import { Color } from "@tiptap/extension-color"
import ListItem from "@tiptap/extension-list-item"
import TextStyle from "@tiptap/extension-text-style"
import Underline from "@tiptap/extension-underline"
import Placeholder from "@tiptap/extension-placeholder"
import StarterKit from "@tiptap/starter-kit"

import Editor from "./CustomEditor"

export const useEditor = ({ content, emit, props }) => {
  const deferredTimer = inject("createDeferredTimer")()

  const isPanelFocused = ref(false)
  const isContentFocused = ref(false)

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
      TextStyle.configure({ types: [ListItem.name] }),
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
      content.value = editor.getContent()

      emit("update", content.value)

      deferredTimer.start(1000, () => emit("save", content.value))
    },
    onFocus({ editor, event }) {
      isContentFocused.value = true
      editor.setExtensionOptions("placeholder", { placeholder: placeholder.value })
    },
    onBlur({ editor, event }) {
      isContentFocused.value = false
      editor.setExtensionOptions("placeholder", { placeholder: placeholder.value })
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
