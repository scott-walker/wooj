<script setup>
import { computed } from "vue"
import Loader from "@ui/Loader.vue"

const props = defineProps({
  text: { type: String },
  size: { type: String, default: "default" },
  type: { type: String, default: "primary" },
  icon: { type: String, default: null },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})
const emit = defineEmits(["click"])
const cssClass = computed(() => {
  const classes = [props.type]

  props.size && classes.push(`size-${props.size}`)
  props.loading && classes.push("loading")
  props.disabled && classes.push("disabled")

  return classes
})
const isLocked = computed(() => props.disabled || props.loading)

const onClick = () => !isLocked.value && emit('click')
</script>

<template>
  <button class="ui-button" :class="cssClass" @click="onClick" :disabled="disabled">
    <Loader v-if="props.loading" class="ui-button__loader" />

    <span class="ui-button__wrapper">
      <i v-if="props.icon" class="ui-button__icon" :class="['fa-solid', `fa-${props.icon}`]"></i>
      {{ props.text }}
    </span>
  </button>
</template>

<style lang="scss" scoped>
@use "@styles/colors";

.ui-button {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: fit-content;
  padding: 10px 17px;
  border-radius: 20px;
  transition: all 0.3s;
  border: 4px solid colors.$absorbing;
  background-color: colors.$grey-strong;
  color: colors.$basic;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  user-select: none;

  &:hover {
    box-shadow: 0px 0px 1px 3px colors.$grey-strong;
  }

  &:active {
    box-shadow: 0px 0px 1px 5px colors.$grey-strong;
  }

  &.size {
    &-small {
      padding: 5px 7px;
      font-size: 12px;
    }
  }

  &.primary {
    background-color: colors.$primary;
    color: colors.$basic;

    &:hover {
      box-shadow: 0px 0px 1px 3px colors.$primary;
    }

    &:active {
      box-shadow: 0px 0px 1px 5px colors.$primary;
    }
  }

  &.danger {
    background-color: colors.$danger;
    color: colors.$absorbing;

    &:hover {
      box-shadow: 0px 0px 1px 3px colors.$danger;
    }

    &:active {
      box-shadow: 0px 0px 1px 5px colors.$danger;
    }
  }

  &__wrapper {}

  &__icon {
    position: relative;
    top: 1px;
    margin-right: 5px;
  }

  &.disabled {
    cursor: default;

    &:hover {
      box-shadow: none;
    }

    opacity: .6;
  }

  &.loading {
    cursor: default;

    &:hover {
      box-shadow: none;
    }

    .ui-button__wrapper {
      opacity: 0;
    }
  }

  &.loading>&__loader {
    position: absolute;
    left: calc(50% - 11px);
    width: 22px;
    height: 22px;
  }
}
</style>
