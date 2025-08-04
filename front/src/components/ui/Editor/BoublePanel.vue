<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, nextTick, useTemplateRef, watch } from 'vue'
import Panel from "@ui/Editor/Panel.vue"

const props = defineProps({
  editor: Object,
  visible: Boolean,
})
const emit = defineEmits(["mouseover"])
const panel = useTemplateRef("panel")
// const visible = ref(false)
const panelStyle = reactive({
  top: null,
  left: null,
})

const updatePosition = ({ target, originalEvent, clientX, clientY }) => {
  return {}

  const touch = originalEvent?.touches[0] || originalEvent?.changedTouches[0] || {}
  const x = touch.pageX || clientX || 0
  const y = touch.pageY || clientY || 0

  console.log({ target })


  if (!y) {
    return
  }

  const panelElement = document.querySelector(".ui-editor-bouble-pamel")
  const editorElement = document.querySelector(".ui-editor .tiptap")

  if (document.activeElement !== editorElement) {
    return
  }
  if (target === panelElement || panelElement.contains(target)) {
    // panelStyle.top = null
    // panelStyle.left = null
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

// watch(() => panel.value, (panel) => {
//   console.log({ panel })


//   panel.addEventListener('mouseup', updatePosition)
//   panel.addEventListener('touchend', updatePosition)
// })
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
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.ui-editor-bouble-pamel {
  // display: flex;
  // justify-content: center;
  position: fixed;
  z-index: 1000;
  width: fit-content;
  opacity: 0;
  transition: all .3s;
  // visibility: hidden;
  // top: -1000px;
  // left: -1000px;

  left: 0;
  bottom: -100px;
  width: 100%;

  &.visible {
    bottom: 0;
    opacity: 1;
    // visibility: visible;
  }
}
</style>
