<script setup>
import { computed } from "vue"

const props = defineProps({
  icon: String,
  color: { type: String, default: null },
  active: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})
const buttonClass = computed(() => props.active ? 'active' : null)
const iconClass = computed(() => `fas fa-${props.icon}`)
const colorStyle = computed(() => ({
  color: props.color
}))
</script>

<template>
  <button class="ui-editor-button" :disabled="disabled" :class="buttonClass">
    <span class="ui-editor-button__icon icon" :style="colorStyle"><i :class="iconClass"></i></span>
  </button>
</template>

<style lang="scss" scoped>
@use "@styles/colors";

.ui-editor-button {
  background: colors.$absorbing;
  border: 2px solid transparent;
  border-radius: 10px;
  transition: all .1s;
  color: colors.$basic;
  cursor: pointer;

  &.active {
    background: colors.$primary;
  }

  &:hover {
    background: colors.$primary;
  }

  &__icon {}
}
</style>
