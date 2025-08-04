<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, nextTick, useTemplateRef, watch } from 'vue'
import { useMediaStore } from "@stores/media"
import Panel from "@ui/Editor/Panel.vue"

const props = defineProps({
  editor: Object,
  visible: Boolean,
})
const emit = defineEmits(["mouseover"])
const panel = useTemplateRef("panel")
const mediaStore = useMediaStore()

// const visible = ref(false)
const panelStyle = reactive({
  top: null
})

const calcPosition = () => {
  const panelHeight = panel.value.getBoundingClientRect().height

  // console.log({
  //   vpHeight,
  //   panelHeight
  // })

  panelStyle.top = mediaStore.vpHeight - panelHeight + "px"
}

watch(() => mediaStore.vpHeight, calcPosition)
watch(() => props.visible, calcPosition)

// const updatePosition = ({ target, originalEvent, clientX, clientY }) => {
//   const panelHeight = panel.value.getBoundingClientRect().height

//   console.log("updatePosition")
//   console.log(panelHeight)
//   console.log(mediaStore.vpHeight)

//   panelStyle.top = mediaStore.vpHeight - panelHeight + "px"
//   return

//   const touch = originalEvent?.touches[0] || originalEvent?.changedTouches[0] || {}
//   const x = touch.pageX || clientX || 0
//   const y = touch.pageY || clientY || 0

//   console.log({ target })


//   if (!y) {
//     return
//   }

//   const panelElement = document.querySelector(".ui-editor-bouble-pamel")
//   const editorElement = document.querySelector(".ui-editor .tiptap")

//   if (document.activeElement !== editorElement) {
//     return
//   }
//   if (target === panelElement || panelElement.contains(target)) {
//     // panelStyle.top = null
//     // panelStyle.left = null
//     return
//   }

//   const panelWidth = panelElement.offsetWidth
//   const TOP_OFFSET = 40

//   panelStyle.top = y + TOP_OFFSET + "px"
//   panelStyle.left = `calc(50% - ${panelWidth / 2}px)`
// }

// onMounted(() => {
//   document.addEventListener('mouseup', updatePosition)
//   document.addEventListener('touchend', updatePosition)
// })

// onBeforeUnmount(() => {
//   document.removeEventListener('mouseup', updatePosition)
//   document.removeEventListener('touchend', updatePosition)
// })

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
  position: fixed;
  z-index: 1000;
  width: fit-content;
  // opacity: 0;
  transition: transform .3s;
  width: 100%;
  top: calc(100vh + 100px);
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
