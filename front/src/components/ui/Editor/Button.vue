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
@use "@styles/media";
@use "@styles/colors";

.ui-editor-button {
  padding: 0;
  background: colors.$absorbing;
  border: 2px solid transparent;
  border-radius: 10px;
  transition: all .1s;
  color: colors.$basic;
  cursor: pointer;
  outline: none;

  &.active {
    background: colors.$primary;
  }

  &:hover {
    background: colors.$primary;
  }

  &__icon {
    width: 26px;
    height: 26px;
    font-size: 14px;
  }
}

@include media.sm() {
  .ui-editor-button {
    &__icon {
      width: 22px;
      height: 22px;
      font-size: 12px;
    }
  }
}
</style>
