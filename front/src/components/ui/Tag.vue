<script setup>
import { computed } from "vue"

const checked = defineModel()
const props = defineProps({
  type: { type: String, default: "primary" },
  text: { type: String, default: null },
  icon: { type: String, default: null },
  clickable: { type: Boolean, default: false },
})

const cssClass = computed(() => {
  const classes = [props.type]

  props.clickable && classes.push("clickable")
  checked.value && classes.push("checked")

  return classes
})

const onCheck = () => {
  if (!props.clickable) return

  checked.value = !checked.value
}
</script>

<template>
  <span class="ui-tag" :class="cssClass" @click="onCheck">
    <span class="ui-tag__wrap">
      <i v-if="props.icon" class="ui-tag__icon" :class="['fa-solid', `fa-${props.icon}`]"></i>
      <span v-if="props.text">{{ props.text }}</span>
      <slot v-else />
    </span>
  </span>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "@styles/media";
@use "@styles/colors";

.ui-tag {
  display: inline-block;
  padding: 3px 7px;
  border-radius: 5px;
  border: 4px solid colors.$grey;
  background-color: colors.$grey;
  font-size: 14px;
  font-weight: bold;
  // height: 34px;
  min-width: 24px;
  text-align: center;
  user-select: none;

  &__wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__icon {
    margin-right: 10px;
  }

  &.primary {
    border-color: colors.$primary;
    background-color: colors.$primary;

    &.clickable {
      border-color: colors.$grey;

      &:hover {
        // background-color: color.change(colors.$primary, $alpha: 50%);
        border-color: colors.$primary;
      }

      &.checked {
        background-color: colors.$primary;
        border-color: colors.$primary;

        &:hover {
          // border-color: color.change(colors.$primary, $blackness: 5%);
          // background-color: colors.$primary;
        }
      }
    }
  }

  &.clickable {
    background: none;
    transition: all .3s;
    cursor: pointer;
  }
}

@include media.sm() {
  .ui-tag {
    padding: 2px 5px;
    font-size: 12px;
    min-width: 18px;
  }
}
</style>
