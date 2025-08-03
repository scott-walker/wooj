<script setup>
import { useMediaStore } from "@stores/media"
import { useLayoutStore } from "@stores/layout"
import { useWoojs } from "@composables/woojs"

import IconLink from "@ui/IconLink.vue"

const mediaStore = useMediaStore()
const layoutStore = useLayoutStore()
const { woojStore, createWooj } = useWoojs()

const onOverBars = () => {
  layoutStore.onOverBars()
  layoutStore.onOverSidebar()
}

const onCreateWooj = async () => {
  await createWooj()

  layoutStore.onActivateCreateWooj()
}
</script>

<template>
  <div class="header-bars">
    <IconLink
      v-if="mediaStore.isSmall"
      :icon="layoutStore.isHoveredSidebar ? 'chevron-left' : 'bars'"
      @click="layoutStore.onToggleMobileSidebar" />
    <IconLink
      v-else
      :icon="layoutStore.isHoveredBars ? 'chevron-left' : 'bars'"
      :mirror="layoutStore.hasAiredSidebar"
      @mouseover="onOverBars"
      @mouseleave="layoutStore.onLeaveBars"
      @click="layoutStore.onToggleSidebar" />

    <IconLink
      icon="plus"
      :active="layoutStore.isCreateWoojActive"
      :loading="woojStore.isCreatingWooj"
      @click="onCreateWooj" />
  </div>
</template>

<style lang="scss">
.header-bars {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}
</style>
