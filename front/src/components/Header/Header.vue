<script setup>
import { computed } from "vue"
import { useMediaStore } from "@stores/media"
import { useLayoutStore } from "@stores/layout"

import Tag from "@ui/Tag.vue"
import Logo from "@components/Header/Logo.vue"
import Bars from "@components/Header/Bars.vue"
import UserPanel from "@components/Header/UserPanel.vue"

const mediaStore = useMediaStore()
const layoutStore = useLayoutStore()

const isVisibleStatus = computed(() => !mediaStore.isSmall && layoutStore.statusBar)
</script>

<template>
  <header class="header">
    <div class="header-left">
      <Logo />
      <Bars />
    </div>

    <div class="header-center">
      <Tag v-if="isVisibleStatus"
        class="status"
        nowrap
        :icon="layoutStore.statusBar.icon"
        :text="layoutStore.statusBar.title" />
    </div>

    <div class="header-right">
      <UserPanel />
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use "@styles/colors";
@use "@styles/media";
@use "@styles/common";

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background: colors.$absorbing;
  gap: 10px;
  overflow: hidden;
  box-shadow: 80px 10px 40px 1px colors.$shadow;

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

  .status {
    max-width: 300px;
  }
}

@include media.sm() {
  .header {
    &-right {
      padding-right: 0;
    }
  }
}
</style>
