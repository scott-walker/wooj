<script setup>
import { computed } from "vue"
import { useAuthStore } from "@stores/auth"
import IconLink from "@ui/IconLink.vue"

const authStore = useAuthStore()
const user = computed(() => authStore.user)
</script>

<template>
  <div class="user-panel">
    <figure class="user-panel__avatar image is-32x32">
      <img class="is-rounded" src="@assets/avatar.jpeg" alt="Placeholder image" />
    </figure>
    <div class="user-panel__name">{{ user.name }}</div>
    <div class="user-panel__logout">
      <IconLink icon="right-from-bracket" @click="authStore.logout" />
    </div>
  </div>
</template>

<style lang="scss">
.user-panel {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  &__name {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
