<script setup lang="ts">
import { computed, useTemplateRef } from "vue"
import { useSelection } from "@composables/selection"
import Panel from "@ui/Editor/Panel.vue"

const props = defineProps({
  editor: { type: Object },
  visible: { type: Boolean, default: false },
})

const emit = defineEmits(["mouseover", "close"])
const wrapper = useTemplateRef<HTMLDivElement>("wrapper")
const { selectionTop } = useSelection({ excludedElements: [wrapper.value!] })

const wrapperStyle = computed(() => {
  if (!wrapper.value || !props.visible) return {}

  const OFFSET = 20
  const DEFAULT = 250
  const top = Math.max(selectionTop.value + OFFSET, DEFAULT) + "px"

  return {
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
      @mouseover="emit('mouseover', $event)"
    >
      <div class="ui-editor-bouble-pamel__wrapper">
        <Panel :editor="editor" :hasClose="true" @close="emit('close')" />
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
  transition: all 0.15s;
  opacity: 0;
  transform: translateX(100vw);

  &.visible {
    opacity: 1;
    transform: translateX(0);
  }

  &__wrapper {
    width: fit-content;
  }
}
</style>
