<script setup>
import { ref, inject, onMounted, onUnmounted } from "vue"
import { useLayoutStore } from "@stores/layout"

const { userService } = inject("services")
const layoutStore = useLayoutStore()

const version = ref("0.0")

onMounted(async () => {
  layoutStore.setStatusBar({ title: "Дашборд", icon: "gauge" })
  version.value = await userService.getTest()
})
onUnmounted(() => layoutStore.unsetStatusBar())
</script>

<template>
  <div class="view-index">
    <p class="view-index__title">WOOJ v{{ version }}</p>
    <p class="view-index__subtitle">Создавай быстро простые заметки</p>
  </div>
</template>

<style lang="scss" scoped>
.view-index {
  &__title {
    font-size: 38px;
    font-weight: bold;
  }
}
</style>