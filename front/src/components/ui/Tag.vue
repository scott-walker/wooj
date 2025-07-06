<script setup>
import { computed } from "vue"

const props = defineProps({
  type: { type: String, default: "primary" },
})

const cssClass = computed(() => [props.type])
</script>

<template>
  <span class="ui-tag" :class="cssClass">
    <slot />
  </span>
</template>

<style lang="scss" scoped>
@use "@styles/colors";

.ui-tag {
  display: inline-block;
  padding: 2px 5px;
  border-radius: 5px;
  background-color: colors.$grey;
  font-size: 14px;
  font-weight: bold;
  height: 24px;
  min-width: 24px;
  text-align: center;

  &.primary {
    background-color: colors.$primary;
  }
}
</style>
