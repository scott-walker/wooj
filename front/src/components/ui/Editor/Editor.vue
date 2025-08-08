<script setup>
import { useMediaStore } from "@stores/media"
import { useEditor } from "./lib/useEditor"

import EditorPanel from "./Panel.vue"
import EditorBoublePanel from "./BoublePanel.vue"
import { EditorContent } from "@tiptap/vue-3"

const content = defineModel()
const emit = defineEmits(["update", "save"])
const props = defineProps({
  placeholder: { type: String, default: null },
})

// const layoutStore = useLayoutStore()
const mediaStore = useMediaStore()
const { editor, isFocused, onPanelOver, onPanelLeave } = useEditor({
  content,
  emit,
  props,
})
</script>

<template>
  <div
    class="ui-editor"
    :class="{ focused: isFocused }"
    @mouseover="onPanelOver"
    @mouseleave="onPanelLeave">

    <EditorBoublePanel
      v-if="mediaStore.isSmall"
      :visible="isFocused"
      :editor="editor"
      @mouseover="onPanelOver"
      @close="onPanelLeave" />
    <EditorPanel
      v-else
      class="ui-editor__panel"
      :class="{ 'hidden': !isFocused }"
      :editor="editor" />

    <EditorContent class="ui-editor__content wooj-content" :editor="editor" />
  </div>
</template>

<style lang="scss">
@use "sass:color";
@use "@styles/colors";
@use "@styles/media";

.ui-editor {
  position: relative;
  border: 2px solid transparent;
  border-top: none;
  border-radius: 5px;
  transition: all .2s;

  &.focused {
    border-color: colors.$grey;
  }

  &__panel {
    position: sticky;
    top: -27px;
    left: 0;
    background: colors.$absorbing;
    z-index: 1020;
    width: 100%;
    height: fit-content;
    margin-top: -2px;
    transform: translateY(0px);
    opacity: 1;
    transition: all .3s;

    &.hidden {
      height: 0;
      padding: 0;
      opacity: 0;
      transform: translateY(-50px);
    }
  }

  &__content {
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
    }
  }
}

@include media.lg() {
  .ui-editor {
    &__panel {
      top: -20px;
    }
  }
}

@include media.sm() {

  .ui-editor {
    &__panel {
      position: sticky;
      z-index: 100;
      top: inherit;
      height: inherit;
      width: 100%;

      &.hidden {
        transform: translateY(30px);
      }
    }

    &__content {
      .tiptap {
        padding: 20px 10px;
      }
    }
  }
}
</style>
