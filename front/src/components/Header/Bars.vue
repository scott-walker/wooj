<script setup>
import { ref, inject } from "vue"
import { useRouter } from "vue-router"
import { useLayoutStore } from "@stores/layout"
import IconLink from "@ui/IconLink.vue"

const layoutStore = useLayoutStore()
const { woojService } = inject("services")
const router = useRouter()

const isWaitingCreateWooj = ref(false)

const onOverBars = () => {
  layoutStore.onOverBars()
  layoutStore.onOverSidebar()
}

const onCreateWooj = async () => {
  isWaitingCreateWooj.value = true

  const wooj = await woojService.create({})

  layoutStore.onActivateCreateWooj()
  isWaitingCreateWooj.value = false

  router.push({ name: 'Wooj', params: { woojId: wooj.id }, replace: true })
}

</script>

<template>
  <div class="header-bars">
    <IconLink
      :icon="layoutStore.isHoveredBars ? 'chevron-left' : 'bars'"
      :mirror="layoutStore.hasAiredSidebar"
      @mouseover="onOverBars"
      @mouseleave="layoutStore.onLeaveBars"
      @click="layoutStore.onToggleSidebar" />

    <IconLink
      icon="plus"
      :active="layoutStore.isCreateWoojActive"
      :loading="isWaitingCreateWooj"
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
