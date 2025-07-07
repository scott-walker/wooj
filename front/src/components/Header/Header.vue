<script setup>
import { computed } from "vue"
import { useAuthStore } from "@stores/auth"
import { useLayoutStore } from "@stores/layout"

import Tag from "@ui/Tag.vue"
import Logo from "@components/Header/Logo.vue"
import Bars from "@components/Header/Bars.vue"
import UserPanel from "@components/Header/UserPanel.vue"

const authStore = useAuthStore()
const layoutStore = useLayoutStore()
const user = computed(() => authStore.user)
</script>

<template>
  <header class="header">
    <div class="header-left">
      <Logo />
      <Bars />
    </div>

    <div class="header-center">
      <Tag v-if="layoutStore.statusBar"
        :icon="layoutStore.statusBar.icon"
        :text="layoutStore.statusBar.title" />
    </div>

    <div class="header-right">
      <UserPanel :user="user" @logout="authStore.logout" />
    </div>
  </header>
</template>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  &-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
  }
}
</style>
