<script setup>
import { computed } from "vue"
import Link from "@ui/Link.vue"

const props = defineProps({
  icon: String,
  type: { type: String, default: "primary" },
  label: { type: String, default: "" },
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
  <Link class="ui-icon-link" :type="props.type" :active="props.active" :scalable="props.scalable">
  <i class="ui-icon-link__icon" :class="iconClass"></i>
  <span v-if="props.label" class="ui-icon-link__label">{{ props.label }}</span>
  </Link>
</template>

<style lang="scss" scoped>
.ui-icon-link {
  display: flex;
  justify-content: center;
  align-items: center;

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

  &__label {
    padding: 0 7px;
    font-size: 14px;
  }
}
</style>
