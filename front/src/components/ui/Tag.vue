<script setup>
import { computed } from "vue"

const props = defineProps({
  type: { type: String, default: "primary" },
  text: { type: String, default: null },
  icon: { type: String, default: null },
})

const cssClass = computed(() => [props.type])
</script>

<template>
  <span class="ui-tag" :class="cssClass">
    <i v-if="props.icon" class="ui-tag__icon" :class="['fa-solid', `fa-${props.icon}`]"></i>
    <span v-if="props.text">{{ props.text }}</span>
    <slot v-else />
  </span>
</template>

<style lang="scss" scoped>
@use "@styles/colors";

.ui-tag {
  display: inline-block;
  padding: 2px 15px;
  border-radius: 5px;
  background-color: colors.$grey;
  font-size: 14px;
  font-weight: bold;
  height: 24px;
  min-width: 24px;
  text-align: center;

  &__icon {
    margin-right: 10px;
  }

  &.primary {
    background-color: colors.$primary;
  }
}
</style>
