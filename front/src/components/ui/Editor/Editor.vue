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
  <div
    v-if="editor"
    class="ui-editor"
    :class="{ focused: isFocused }"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave">

    <EditorPanel class="ui-editor__panel" :class="{ 'hidden': !isFocused }" :editor="editor" />
    <EditorContent class="ui-editor__content" :editor="editor" />
  </div>
</template>

<style lang="scss">
@use "sass:color";
@use "@styles/colors";
@use "@styles/wooj";

.ui-editor {
  position: relative;
  border: 2px solid transparent;
  border-top: none;
  border-radius: 5px;
  transition: all .2s;

  &:hover {
    // border-color: colors.$grey;
  }

  &.focused {
    border-color: colors.$grey;

    .tiptap {
      // padding-top: 76px;
    }
  }

  &__panel {
    position: sticky;
    top: -27px;
    left: 0;
    background: white;
    z-index: 10;
    width: 100%;
    height: 60px;
    margin-top: -2px;
    overflow: hidden;
    transform: translateY(0px);
    opacity: 1;
    transition: all .3s;
    // border-top: 2px solid colors.$grey;

    &.hidden {
      height: 10px;
      opacity: 0;
      transform: translateY(-50px);
    }
  }

  &__content {

    /* Basic editor styles */
    .tiptap {
      padding: 20px;
      transition: all .2s;

      &.ProseMirror-focused {
        outline: none;
      }

      :first-child {
        margin-top: 0;
      }

      p.is-empty:first-child::before {
        color: color.change(colors.$grey, $lightness: 80%);
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
