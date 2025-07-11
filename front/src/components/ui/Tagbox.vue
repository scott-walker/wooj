<script setup>
import { ref, computed, watch } from "vue"
import IconLink from "@ui/IconLink.vue"

const show = defineModel()
const props = defineProps({
  title: { type: String, default: "" },
  center: { type: Boolean, default: false },
})
const mousePosition = ref(null)
const contentPosition = computed(() => {
  const { x, y } = mousePosition.value || {}
  const OFFSET_FACTOR = 20

  if (props.center || !x || !y) {
    return null
  }

  return {
    top: `${y + OFFSET_FACTOR}px`,
    left: `${x + OFFSET_FACTOR}px`
  }
})

watch(show, (value) => {
  if (!value) {
    mousePosition.value = null
  }
})

const onCheckPosition = ({ x, y }) => {
  if (mousePosition.value) return

  mousePosition.value = { x, y }
}

const onClose = () => show.value = false
</script>

<template>
  <div class="ui-modal" v-if="show" @mouseover="onCheckPosition">
    <div class="ui-modal__background" @click="onClose"></div>
    <div class="ui-modal__content" :style="contentPosition">
      <div class="ui-modal__content-header">
        <div v-if="props.title" class="ui-modal__content-header-title">
          {{ props.title }}
        </div>
        <IconLink icon="xmark" @click="onClose" />
      </div>
      <div class="ui-modal__content-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "@styles/colors";
@use "@styles/common";

.ui-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: color.change(colors.$basic, $alpha: 30%);
    animation: fade .3s ease forwards;
  }

  &__content {
    position: absolute;
    z-index: 10;
    // min-width: 50%;
    @include common.card();
    animation: scale .3s ease forwards;

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      padding: 10px;

      &-title {
        padding-left: 10px;
        font-size: 22px;
        font-weight: bold;
      }
    }

    &-body {
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      padding: 10px 20px;
    }
  }
}

@keyframes fade {
  0% {
    backdrop-filter: blur(0px);
  }

  100% {
    backdrop-filter: blur(3px);
  }
}

@keyframes scale {
  0% {
    transform: scale(.3);
  }

  100% {
    transform: scale(1);
  }
}
</style>
