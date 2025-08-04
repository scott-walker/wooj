<script setup>
import { reactive, useTemplateRef, watch } from 'vue'
import { useMediaStore } from "@stores/media"
import { useDebuggerStore } from "@stores/debugger"
import Panel from "@ui/Editor/Panel.vue"

const props = defineProps({
  editor: Object,
  visible: Boolean,
})
const emit = defineEmits(["mouseover"])
const panel = useTemplateRef("panel")
const mediaStore = useMediaStore()
const debuggerStore = useDebuggerStore()

const panelStyle = reactive({
  top: null
})

const calcPosition = () => {
  const panelHeight = panel.value.getBoundingClientRect().height

  panelStyle.top = mediaStore.vpHeight - panelHeight + "px"
  panelStyle.bottom = "inherit"

  debuggerStore.push({
    action: "calcPosition",
    top: panelStyle.top,
    vpHeight: mediaStore.vpHeight,
    panelHeight
  })
}

watch(() => mediaStore.vpHeight, () => {
  debuggerStore.push({
    action: "change viewport",
  })
  calcPosition()
})
watch(() => props.visible, () => {
  debuggerStore.push({
    action: "change visible",
  })
  calcPosition()
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
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.ui-editor-bouble-pamel {
  position: fixed;
  z-index: 1000;
  width: fit-content;
  // opacity: 0;
  transition: transform .3s;
  width: 100%;
  bottom: -100px;
  left: 0;
  transform: translateY(100px);
  // visibility: hidden;

  &.visible {
    // opacity: 1;
    transform: translateY(0px);
    // visibility: visible;
  }
}
</style>
