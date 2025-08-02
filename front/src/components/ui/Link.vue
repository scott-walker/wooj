<script setup>
import { computed } from "vue"

const props = defineProps({
  type: { type: String, default: "primary" },
  active: { type: Boolean, default: false },
  scalable: { type: Boolean, default: true },
  loading: { type: Boolean, default: false },
})
const emit = defineEmits(["click"])

const cssClass = computed(() => {
  const classes = [props.type]

  props.loading && classes.push("loading")
  props.active && classes.push("active")
  props.scalable && classes.push("scalable")

  return classes
})

const onClick = () => !props.loading && emit('click')
</script>

<template>
  <a class="ui-link" :class="cssClass" @click="onClick">
    <i v-if="props.loading" class="ui-link__loader fa-solid fa-spinner"></i>
    <slot v-else />
  </a>
</template>

<style lang="scss" scoped>
@use "@styles/colors";

.ui-link {
  display: inline-block;
  padding: 5px;
  border-radius: 5px;
  transition: all 0.2s;
  cursor: pointer;
  user-select: none;

  &:hover,
  &.active,
  &.loading {
    background-color: colors.$grey-strong;
    color: colors.$basic;

    &.primary {
      background-color: colors.$primary;
      color: colors.$basic;
    }

    &.danger {
      background-color: colors.$danger;
      color: colors.$absorbing
    }

    &.scalable {
      transform: scale(1.2);
    }
  }

  &.loading {
    cursor: default;
  }

  &.loading>&__loader {
    animation: rotating 1.5s linear infinite;
  }
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
