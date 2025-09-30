<script setup lang="ts">
import _ from "lodash"
import { onMounted, onUnmounted } from "vue"

import type { ToastType } from "@types"
import { useLayoutStore } from "@stores/layout"
import { useMediaStore } from "@stores/media"
import { useToastsStore } from "@stores/toasts"
import Button from "@ui/Button.vue"

const layoutStore = useLayoutStore()
const mediaStore = useMediaStore()
const toastsStore = useToastsStore()

const onAddToast = () => {
  const i = _.random(0, 2)
  const j = _.random(0, 2)
  const k = _.random(0, 2)

  const messages = [
    "Новое уведомление",
    "Новое уведомление Новое уведомление",
    "Новое уведомление Новое уведомление Новое уведомление",
  ]
  const types = ["info", "success", "alert"]
  const durations = [3, 4, 5]

  toastsStore.add({
    message: "Новое уведомление",
    type: types[i] as ToastType,
    duration: 10,
  })
}

onMounted(async () => {
  layoutStore.setStatusBar({ title: "DEBUG", icon: "gauge" })
})
onUnmounted(() => layoutStore.unsetStatusBar())
</script>

<template>
  <div class="view-index">
    <div class="box">
      <Button text="Вызвать тост" @click="onAddToast" />
    </div>

    <div class="box">
      <input type="text" />
    </div>

    <div class="media-detector">
      <div>Width: {{ mediaStore.width }}</div>
      <div>Height: {{ mediaStore.height }}</div>
      <div>Viewport Width: {{ mediaStore.vpWidth }}</div>
      <div>Viewport Height: {{ mediaStore.vpHeight }}</div>
      <div>isTouched: {{ mediaStore.isTouched }}</div>
      <div>isPortrait: {{ mediaStore.isPortrait }}</div>
      <div>isLandscape: {{ mediaStore.isLandscape }}</div>
      <div>isMobile: {{ mediaStore.isMobile }}</div>
      <div>isTablet: {{ mediaStore.isTablet }}</div>
      <div>isDesctop: {{ mediaStore.isDesktop }}</div>
      <div>isXs: {{ mediaStore.isXs }}</div>
      <div>isSmall: {{ mediaStore.isSmall }}</div>
      <div>isMiddle: {{ mediaStore.isMiddle }}</div>
      <div>isLarge: {{ mediaStore.isLarge }}</div>
      <div>isXl: {{ mediaStore.isXl }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.view-index {
  .box {
    margin-bottom: 20px;
  }

  .media-detector {
    margin-top: 20px;
    padding: 20px;
    outline: 2px solid crimson;
    font-weight: bold;
  }
}
</style>
