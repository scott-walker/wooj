<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue'
import Panel from "@ui/Editor/Panel.vue"

const props = defineProps({
  editor: Object,
  visible: Boolean,
})
const emit = defineEmits(["mouseover"])
// const visible = ref(false)
const panelStyle = reactive({
  top: 0,
  left: 0,
})

const updatePosition = ({ target, originalEvent, clientX, clientY }) => {
  const touch = originalEvent?.touches[0] || originalEvent?.changedTouches[0] || {}
  const x = touch.pageX || clientX || 0
  const y = touch.pageY || clientY || 0

  if (!y) {
    return
  }

  const panelElement = document.querySelector(".ui-editor-bouble-pamel")
  const editorElement = document.querySelector(".ui-editor .tiptap")

  if (document.activeElement !== editorElement) {
    return
  }
  if (target === panelElement || panelElement.contains(target)) {
    return
  }

  const panelWidth = panelElement.offsetWidth
  const TOP_OFFSET = 40

  panelStyle.top = y + TOP_OFFSET + "px"
  panelStyle.left = `calc(50% - ${panelWidth / 2}px)`
}

onMounted(() => {
  document.addEventListener('mouseup', updatePosition)
  document.addEventListener('touchend', updatePosition)
})

onBeforeUnmount(() => {
  document.removeEventListener('mouseup', updatePosition)
  document.removeEventListener('touchend', updatePosition)
})
</script>

<template>
  <!-- <Teleport to="body"> -->
  <div
    class="ui-editor-bouble-pamel"
    :class="{ visible }"
    :style="panelStyle"
    @mouseover="emit('mouseover', $event)">
    <Panel :editor="editor" />
  </div>
  <!-- </Teleport> -->
</template>

<style lang="scss" scoped>
.ui-editor-bouble-pamel {
  position: fixed;
  z-index: 1000;
  width: fit-content;
  opacity: 0;
  transition: opacity .3s;
  // visibility: hidden;
  top: -1000px;
  left: -1000px;

  &.visible {
    opacity: 1;
    // visibility: visible;
  }
}
</style>
