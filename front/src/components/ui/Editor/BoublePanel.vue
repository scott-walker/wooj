<script setup>
import { computed, useTemplateRef } from 'vue'

import { useSelection } from "@composables/selection"

import Panel from "@ui/Editor/Panel.vue"

const props = defineProps({
  editor: { type: Object },
  visible: { type: Boolean, default: false },
})
const emit = defineEmits(["mouseover", "close"])
const wrapper = useTemplateRef("wrapper")

const { selectionTop } = useSelection({
  excludedElements: [wrapper.value]
})

const wrapperStyle = computed(() => {
  if (!wrapper.value) return {}

  const OFFSET = 20
  const top = props.visible ? `${selectionTop.value + OFFSET}px` : "1000px"

  return {
    opacity: props.visible ? 1 : 0,
    top,
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
        <Panel :editor="editor" @close="emit('close')" />
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
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  transition: all .15s;
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
