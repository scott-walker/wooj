<script setup lang="ts">
import { computed } from "vue"
import { RouterLink } from "vue-router"

const props = defineProps({
  route: { type: Object, required: true },
  text: { type: String, required: true },
  icon: { type: String, required: true },
})
const iconClass = computed(() => `fas fa-${props.icon}`)
</script>

<template>
  <RouterLink :to="route" custom v-slot="{ isActive, href, navigate }">
    <a class="sidebar-link" :class="isActive ? 'active' : ''" :href="href" @click="navigate">
      <span class="sidebar-link__icon">
        <i :class="iconClass"></i>
      </span>
      <span class="sidebar-link__text">
        {{ text }}
      </span>
    </a>
  </RouterLink>
</template>

<style lang="scss">
@use "@styles/colors";

.sidebar-link {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 6px 10px;
  font-size: 16px;
  line-height: 16px;
  font-weight: 400;
  cursor: pointer;
  color: colors.$basic-light;
  text-decoration: none;

  &:hover {
    // background-color: colors.$primary-light;
    background-color: colors.$grey;
  }

  &.active {
    background-color: colors.$primary;
    color: colors.$basic;
  }

  &__icon {
    display: inline-block;
    text-align: center;
    min-width: 20px;
    max-width: 20px;
  }

  &__text {
    margin-left: 10px;
    overflow: hidden;
    text-wrap: nowrap;
  }
}
</style>
