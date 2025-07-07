<script setup>
import { computed } from "vue"
import Loader from "@ui/Loader.vue"

const props = defineProps({
  text: { type: String },
  icon: { type: String, default: null },
  loading: { type: Boolean, default: false },
})
const emit = defineEmits(["click"])
const cssClass = computed(() => {
  const classes = []

  props.loading && classes.push("loading")

  return classes
})

const onClick = () => !props.loading && emit('click')
</script>

<template>
  <button class="ui-button" :class="cssClass" @click="onClick">
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
  position: relative;
  display: inline-block;
  padding: 3px 15px;
  border-radius: 20px;
  transition: all 0.3s;
  border: 4px solid colors.$absorbing;
  background-color: colors.$primary;
  color: colors.$basic;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 1px 3px colors.$primary;
  }

  &__wrapper {}

  &__icon {
    position: relative;
    top: 1px;
    margin-right: 5px;
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
    // animation: rotating 1.5s linear infinite;
  }
}
</style>
