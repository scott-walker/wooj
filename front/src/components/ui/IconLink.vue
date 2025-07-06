<script setup>
import { computed } from "vue"
import Link from "@ui/Link.vue"

const props = defineProps({
  icon: String,
  active: { type: Boolean, default: false },
  scalable: { type: Boolean, default: true },
  mirror: { type: Boolean, default: false },
  rotatable: { type: Boolean, default: false },
})

const iconClass = computed(() => {
  const classes = ["fa-solid", `fa-${props.icon}`]

  props.mirror && classes.push("mirror")
  props.rotatable && classes.push("rotatable")

  return classes
})
</script>

<template>
  <Link class="ui-icon-link" :active="props.active" :scalable="props.scalable">
  <i class="ui-icon-link__icon" :class="iconClass"></i>
  </Link>
</template>

<style lang="scss" scoped>
.ui-icon-link {
  &__icon {
    width: 20px;
    text-align: center;
    transition: transform 0.3s;

    &.mirror {
      transform: rotate(180deg);
    }

    &.rotatable:hover {
      transform: rotate(180deg);
    }
  }
}
</style>
