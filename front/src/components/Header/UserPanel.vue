<script setup>
import { computed } from "vue"
import IconLink from "@ui/IconLink.vue"

const props = defineProps({
  user: Object
})

const user = computed(() => props.user)
</script>

<template>
  <div class="user-panel">
    <figure class="user-panel__avatar image is-32x32">
      <img class="is-rounded" src="@assets/avatar.jpeg" alt="Placeholder image" />
    </figure>
    <div class="user-panel__name">{{ user.name }}</div>
    <div class="user-panel__logout">
      <IconLink icon="right-from-bracket" @click="$emit('logout')" />
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
