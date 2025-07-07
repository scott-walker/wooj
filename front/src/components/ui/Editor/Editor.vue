<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, inject } from 'vue'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import { EditorContent } from '@tiptap/vue-3'
import Editor from "./lib/CustomEditor"
import EditorPanel from "./Panel.vue"

const props = defineProps({
  placeholder: { type: String, default: null },
})
const content = defineModel()
const emit = defineEmits(["update", "save"])

const editor = ref(null)
const isMouseOver = ref(false)
const isContentFocused = ref(false)
const isFocused = computed(() => isMouseOver.value || isContentFocused.value)
const placeholder = computed(() => {
  if (props.placeholder !== null) {
    return props.placeholder
  }

  return isFocused.value ? "Напиши текст..." : "Кликни сюда и напиши текст..."
})

const onMouseOver = () => {
  if (isContentFocused.value) {
    isMouseOver.value = true
  }
}
const onMouseLeave = () => {
  if (isContentFocused.value) {
    isMouseOver.value = false
  }
}

const deferredTimer = inject("createDeferredTimer")()

// watch(() => content.value, (newContent, oldContent) => {
//   if (newContent === oldContent) {
//     return
//   }

//   editor.value.setContent(newContent)
// })

onMounted(() => {
  editor.value = new Editor({
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
})

onBeforeUnmount(() => {
  editor.value.destroy()
  editor.value = null
})
</script>

<template>
  <div class="ui-editor" :class="{ focused: isFocused }" v-if="editor" @mouseover="onMouseOver"
    @mouseleave="onMouseLeave">
    <Transition>
      <EditorPanel class="ui-editor__panel" v-show="isFocused" :editor="editor" />
    </Transition>
    <EditorContent class="ui-editor__content" :editor="editor" />
  </div>
</template>

<style lang="scss">
@use "@styles/colors";
@use "@styles/wooj";

.ui-editor {
  position: relative;
  border: 2px solid transparent;
  border-radius: 10px;
  transition: all .2s;

  &:hover {
    border-color: rgba(16, 0, 75, 0.05);
  }

  &.focused {
    border-color: rgba(16, 0, 75, 0.05);

    .tiptap {
      padding-top: 76px;
    }
  }

  &__panel {
    position: absolute;
    z-index: 100;
    width: 100%;
    top: 0;
  }

  &__content {

    /* Basic editor styles */
    .tiptap {
      padding: 20px;
      transition: all .2s;
      // max-height: calc(100vh - 400px);
      // overflow-y: auto;

      &.ProseMirror-focused {
        outline: none;
      }

      :first-child {
        margin-top: 0;
      }

      p.is-empty:first-child::before {
        color: #adb5bd;
        font-style: italic;
        content: attr(data-placeholder);
        float: left;
        height: 0;
        pointer-events: none;
      }

      @include wooj.contentFormat();
    }
  }
}
</style>
