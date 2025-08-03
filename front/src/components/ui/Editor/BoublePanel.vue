<script setup>
import { ref, useTemplateRef, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue'
import Panel from "@ui/Editor/Panel.vue"

const props = defineProps({
  editor: Object,
})
const emit = defineEmits(["mouseover"])
const visible = ref(false)
const position = reactive({ top: 0, left: 0 })
const panel = useTemplateRef("panel")

const updatePosition = ({ target }) => {
  const panelElement = document.querySelector(".ui-editor-bouble-pamel")
  const editorElement = document.querySelector(".ui-editor .tiptap")

  if (document.activeElement !== editorElement) {
    return
  }

  // console.log("START")
  // console.log(target)
  // console.log(panelElement)
  // console.log("END")

  if (target === panelElement || panelElement.contains(target)) {
    return
  }

  const selection = window.getSelection()

  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
    visible.value = false
    return
  }

  const range = selection.getRangeAt(0)
  const rect = range.getBoundingClientRect()

  nextTick(() => {
    const offset = 8
    const panelElement = panel.value

    if (!panelElement) return

    const panelHeight = panelElement.offsetHeight || 40
    const panelWidth = panelElement.offsetWidth || 120

    position.top = rect.bottom + offset + window.scrollY
    position.left = rect.left + rect.width / 2 - panelWidth / 2 + window.scrollX
    visible.value = true
  })
}

// const handleAction = (action) => {
//   const selection = window.getSelection()
//   const text = selection?.toString()
//   if (!text) return

//   if (action === 'copy') {
//     navigator.clipboard.writeText(text)
//   }
//   else if (action === 'cut') {
//     navigator.clipboard.writeText(text)
//     const range = selection.getRangeAt(0)
//     range.deleteContents()
//   }

//   visible.value = false
// }

onMounted(() => {
  document.addEventListener('mouseup', updatePosition)
  document.addEventListener('touchend', updatePosition)
  document.addEventListener('selectionchange', () => {
    if (window.getSelection()?.isCollapsed) {
      visible.value = false
    }
  })
})

onBeforeUnmount(() => {
  document.removeEventListener('mouseup', updatePosition)
  document.removeEventListener('touchend', updatePosition)
})
</script>

<template>
  <Teleport to="body">
    <div
      v-show="visible"
      ref="panel"
      class="ui-editor-bouble-pamel"
      :style="{ top: `${position.top}px`, left: `${position.left}px` }"
      @mouseover="emit('mouseover', $event)">
      <Panel :editor="editor" />
    </div>
  </Teleport>
</template>

<style scoped>
.ui-editor-bouble-pamel {
  position: absolute;
  z-index: 1000;
}
</style>
