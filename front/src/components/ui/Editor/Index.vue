<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import EditorPanel from "./Panel.vue"

const editor = ref(null)
const isMouseOver = ref(false)
const isContentFocused = ref(false)
const isFocused = computed(() => isMouseOver.value || isContentFocused.value)

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

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      Underline,
      StarterKit,
    ],
    content: " Wow, that’s amazing. Good work, boy! 👏",
    // onBeforeCreate({ editor }) {
    //   // Before the view is created.
    // },
    // onCreate({ editor }) {
    //   // The editor is ready.
    // },
    // onUpdate({ editor }) {
    //   // The content has changed.
    // },
    // onSelectionUpdate({ editor }) {
    //   // The selection has changed.
    // },
    // onTransaction({ editor, transaction }) {
    //   // The editor state has changed.
    // },
    onFocus({ editor, event }) {
      isContentFocused.value = true
    },
    onBlur({ editor, event }) {
      isContentFocused.value = false
    },
    // onDestroy() {
    //   // The editor is being destroyed.
    // },
    // onPaste(event: ClipboardEvent, slice: Slice) {
    //   // The editor is being pasted into.
    // },
    // onDrop(event: DragEvent, slice: Slice, moved: boolean) {
    //   // The editor is being pasted into.
    // },
    // onContentError({ editor, error, disableCollaboration }) {
    //   // The editor content does not match the schema.
    // },
  })

  console.log(editor.value)
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
.ui-editor {
  position: relative;
  border: 2px solid transparent;
  border-radius: 10px;
  transition: all .2s;

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

  &__content {}
}

/* Basic editor styles */
.tiptap {
  padding: 20px;
  transition: all .2s;
  font-size: 1.2rem;

  &.ProseMirror-focused {
    outline: none;
  }

  :first-child {
    margin-top: 0;
  }

  /* List styles */
  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  /* Code and preformatted text styles */
  code {
    background-color: var(--purple-light);
    border-radius: 0.4rem;
    color: var(--black);
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: var(--black);
    border-radius: 0.5rem;
    color: var(--white);
    font-family: monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid var(--gray-3);
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-2);
    margin: 2rem 0;
  }

  strong {
    color: inherit;
    font-weight: 800;
  }
}
</style>
