<script setup>
import { computed } from "vue"
import { RouterLink } from "vue-router"

const props = defineProps({
  route: Object,
  text: String,
  icon: String
})
const iconClass = computed(() => `fas fa-${props.icon}`)
</script>

<template>
  <RouterLink :to="props.route" custom v-slot="{ isActive, href, navigate }">
    <a :class="isActive ? 'is-active' : ''" :href="href" @click="navigate">
      <span class="icon mr-2 has-text-grey-light">
        <i :class="iconClass"></i>
      </span>
      {{ props.text }}
    </a>
  </RouterLink>
</template>

<!-- <style lang="scss"></style> -->
