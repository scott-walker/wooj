<script setup>
import { computed } from "vue"
import { useLayoutStore } from "@stores/layout"
import { useMediaDetector } from "@hooks/mediaDetector"

import Tag from "@ui/Tag.vue"
import Logo from "@components/Header/Logo.vue"
import Bars from "@components/Header/Bars.vue"
import UserPanel from "@components/Header/UserPanel.vue"

const layoutStore = useLayoutStore()
const md = useMediaDetector()

const isVisibleStatus = computed(() => !md.isSm.value && layoutStore.statusBar)
</script>

<template>
  <header class="header">
    <div class="header-left">
      <Logo />
      <Bars />
    </div>

    <div class="header-center">
      <Tag v-if="isVisibleStatus"
        :icon="layoutStore.statusBar.icon"
        :text="layoutStore.statusBar.title" />
    </div>

    <div class="header-right">
      <UserPanel />
    </div>
  </header>
</template>

<style lang="scss">
@use "@styles/colors";

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background: colors.$absorbing;

  &-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
  }

  &-right {
    height: 100%;
    padding-right: 20px;
  }
}
</style>
