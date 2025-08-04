<script setup>
import { computed, onMounted, onUnmounted, useTemplateRef, watch } from 'vue'

// import { useMediaStore } from "@stores/media"
import { useDebuggerStore } from "@stores/debugger"
import { useMoveDirection } from "./lib/useMoveDirection"
import { useKeyboard } from "./lib/useKeyboard"

import Panel from "@ui/Editor/Panel.vue"

const props = defineProps({
  editor: Object,
  visible: Boolean,
})
const emit = defineEmits(["mouseover"])
const panel = useTemplateRef("panel")
// const mediaStore = useMediaStore()
const debuggerStore = useDebuggerStore()

const { isScrollingUp, scrollDirection, toucheMoveDirection,
  prevPosition,
  currentPosition,
  isTouchMovingDown,
  isTouchMovingUp, } = useMoveDirection()
const {
  isOpened: isOpenedKeyboard,
  currentHeight,
  keyboardHeight,
  setListeners,
  unsetListeners,


} = useKeyboard()

const panelStyle = computed(() => {
  if (!panel.value) return {}

  const panelHeight = panel.value.getBoundingClientRect().height

  if (isOpenedKeyboard.value) {
    const bottom = isScrollingUp.value ? keyboardHeight.value : 0

    return {
      top: "inherit",
      bottom: Math.round(bottom) + "px"
    }
  }

  return {
    top: Math.round(currentHeight.value - panelHeight) + "px",
    bottom: "inherit"
  }
})

onMounted(() => {
  setTimeout(() => {
    const tiptap = document.querySelector(".tiptap")

    setListeners(tiptap)
  }, 1000)
})
onUnmounted(() => unsetListeners())

watch(() => scrollDirection.value, () => {
  debuggerStore.push({
    panelStyle: panelStyle.value,
    scrollDirection: scrollDirection.value,
    toucheMoveDirection: toucheMoveDirection.value
  })
})
</script>

<template>
  <Teleport to="body">
    <div
      ref="panel"
      class="ui-editor-bouble-pamel"
      :class="{ visible }"
      :style="panelStyle"
      @mouseover="emit('mouseover', $event)">
      <Panel :editor="editor" />

      <div class="deb">
        <!-- <div>{{ prevPosition }} -> {{ currentPosition }}</div>
        <div>{{ { scrollDirection } }}</div> -->
        <!-- <div>{{ { toucheMoveDirection } }}</div> -->
        <!-- <div>{{ { panelStyle } }}</div> -->
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.ui-editor-bouble-pamel {
  position: fixed;
  z-index: 1000;
  // width: fit-content;
  // opacity: 0;
  transition: transform .3s;
  width: 100%;
  // bottom: 46px;
  // top: -1000px;
  left: 0;
  right: 0;
  // bottom: 0;
  // transform: translateY(100px);
  // visibility: hidden;
  background: white;

  .deb {
    padding: 5px 0;
    text-align: center;
  }

  &.visible {
    // opacity: 1;
    // transform: translateY(0px);
    // visibility: visible;
  }
}
</style>
