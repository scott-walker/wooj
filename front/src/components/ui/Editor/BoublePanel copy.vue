<script setup>
import { ref, useTemplateRef, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue'

const visible = ref(false)
const position = reactive({ top: 0, left: 0 })
const toolbar = useTemplateRef("toolbar")

const updatePosition = () => {
  const selection = window.getSelection()
  console.log("updatePosition 1")

  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
    visible.value = false
    return
  }

  console.log("updatePosition 2")

  const range = selection.getRangeAt(0)
  const rect = range.getBoundingClientRect()

  nextTick(() => {
    const offset = 8
    const toolbarEl = toolbar.value
    console.log("updatePosition 3", toolbarEl)

    if (!toolbarEl) return

    const toolbarHeight = toolbarEl.offsetHeight || 40
    const toolbarWidth = toolbarEl.offsetWidth || 120

    position.top = rect.bottom + offset + window.scrollY
    position.left = rect.left + rect.width / 2 - toolbarWidth / 2 + window.scrollX
    visible.value = true

    console.log("updatePosition 4")

  })
}

const handleAction = (action) => {
  const selection = window.getSelection()
  const text = selection?.toString()
  if (!text) return

  if (action === 'copy') {
    navigator.clipboard.writeText(text)
  }
  else if (action === 'cut') {
    navigator.clipboard.writeText(text)
    const range = selection.getRangeAt(0)
    range.deleteContents()
  }

  visible.value = false
}

function hideToolbar() {
  visible.value = false
}

onMounted(() => {
  document.addEventListener('mouseup', updatePosition)
  document.addEventListener('touchend', updatePosition)
  document.addEventListener('selectionchange', () => {
    if (window.getSelection()?.isCollapsed) {
      hideToolbar()
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
      ref="toolbar"
      class="toolbar"
      :style="{ top: `${position.top}px`, left: `${position.left}px` }">
      <button @click="handleAction('copy')">Копировать</button>
      <button @click="handleAction('cut')">Вырезать</button>
    </div>
  </Teleport>
</template>

<style scoped>
.toolbar {
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  padding: 6px 10px;
  border-radius: 6px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  display: flex;
  gap: 8px;
  transition: opacity 0.2s ease;
}

.toolbar button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #333;
}

.toolbar button:hover {
  text-decoration: underline;
}
</style>
