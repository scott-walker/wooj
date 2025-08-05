<script setup>
import { computed, useTemplateRef } from 'vue'

import { useMediaStore } from "@stores/media"
import { useSelection } from "@composables/selection"

import Panel from "@ui/Editor/Panel.vue"

const props = defineProps({
  editor: { type: Object },
  visible: { type: Boolean, default: false },
})
const emit = defineEmits(["mouseover"])
const wrapper = useTemplateRef("wrapper")

const { vpWidth } = useMediaStore()
const { isSelectionActive, selectionTop, selectionLeft } = useSelection({
  excludedElements: [wrapper.value]
})

const wrapperStyle = computed(() => {
  if (!wrapper.value) return {}

  const OFFSET = 20
  const top = selectionTop.value + OFFSET
  // const rect = wrapper.value.getBoundingClientRect()
  // const left = Math.max(OFFSET, Math.min(selectionLeft.value - OFFSET, vpWidth - rect.width))

  return {
    opacity: isSelectionActive.value ? 1 : 0,
    top: `${top}px`,
    // left: `${left}px`
  }
})
</script>

<template>
  <Teleport to="body">
    <div
      ref="wrapper"
      class="ui-editor-bouble-pamel"
      :class="{ visible }"
      :style="wrapperStyle"
      @mouseover="emit('mouseover', $event)">
      <div class="ui-editor-bouble-pamel__wrapper">
        <Panel :editor="editor" />
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "@styles/colors";

.ui-editor-bouble-pamel {
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  transition: all .3s;
  opacity: 0;

  &.visible {
    opacity: 1;
  }

  &__wrapper {
    width: fit-content;
    box-shadow: color.change(colors.$basic, $alpha: 3%) 0px 0px 2px 7px;
  }
}
</style>
