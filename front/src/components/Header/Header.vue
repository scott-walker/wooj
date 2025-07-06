<script setup>
import { computed } from "vue"
import { useAuthStore } from "@stores/auth"

import IconLink from "@ui/IconLink.vue"
import Logo from "@components/Header/Logo.vue"
import Bars from "@components/Header/Bars.vue"
import UserPanel from "@components/Header/UserPanel.vue"

const authStore = useAuthStore()
const user = computed(() => authStore.user)
</script>

<template>
  <header class="header">
    <div class="header-left">
      <Logo />
      <Bars />
    </div>

    <div class="header-center">
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
