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
    <div class="sidebar-link" :class="isActive ? 'active' : ''" :href="href" @click="navigate">
      <span class="sidebar-link__icon">
        <i :class="iconClass"></i>
      </span>
      <span class="sidebar-link__text">
        {{ props.text }}
      </span>
    </div>
  </RouterLink>
</template>

<style lang="scss">
@use "@styles/colors";

.sidebar-link {
  padding: 6px 10px;
  font-size: 16px;
  line-height: 16px;
  font-weight: 400;
  cursor: pointer;
  color: colors.$basic-light;

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
    width: 20px;
  }

  &__text {
    margin-left: 10px;
  }
}
</style>
