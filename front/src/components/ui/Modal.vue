<script setup>
import { reactive, computed, watch, useTemplateRef, nextTick, watchEffect } from "vue"
import { useLockers } from "@composables/lockers"
import { usePosition } from "@composables/position"

import IconLink from "@ui/IconLink.vue"

const isShowed = defineModel()
const props = defineProps({
  title: { type: String, default: "" },
  center: { type: Boolean, default: false },
  class: { type: String, default: "" },
})

const { lockTouchMove } = useLockers()
const { pX, pY } = usePosition()

const modal = useTemplateRef("modal")

const pointerPosition = reactive({ x: 0, y: 0 })
const contentPosition = computed(() => {
  const OFFSET_FACTOR = 30

  if (props.center) {
    return null
  }

  return {
    top: `${pointerPosition.y + OFFSET_FACTOR}px`,
    left: `${pointerPosition.x + OFFSET_FACTOR}px`
  }
})

watchEffect(() => {
  if (isShowed.value) return

  pointerPosition.x = pX.value
  pointerPosition.y = pY.value
})

watch(isShowed, (isShowed) => isShowed && nextTick(() => lockTouchMove(modal.value)))

const onClose = () => isShowed.value = false
</script>

<template>
  <Teleport v-if="isShowed" to="body">
    <div ref="modal" class="ui-modal" :class="props.class">
      <div class=" ui-modal__background" @click="onClose"></div>

      <div class="ui-modal__content" :style="contentPosition">
        <div class="ui-modal__content-header">
          <div v-if="props.title" class="ui-modal__content-header-title">
            {{ props.title }}
          </div>
          <IconLink icon="xmark" type="default" @click="onClose" />
        </div>

        <div class="ui-modal__content-body">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "@styles/colors";
@use "@styles/common";
@use "@styles/media";

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
  user-select: none;

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
    @include common.card();
    animation: scale .15s ease forwards;

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 20px;
      padding: 20px 25px 20px 15px;

      &-title {
        padding-left: 15px;
        padding-right: 70px;
        font-size: 22px;
        font-weight: bold;
      }
    }

    &-body {
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      padding: 20px 30px;
      padding-top: 0;
    }
  }
}

@include media.sm() {
  .ui-modal {
    &__content {
      &-header {
        gap: 20px;
        padding: 20px 15px;

        &-title {
          padding-left: 0px;
          padding-right: 0px;
          font-size: 22px;
          font-weight: bold;
        }
      }

      &-body {
        padding: 20px 15px;
        padding-top: 0;
      }
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
    transform: scale(.8);
  }

  100% {
    transform: scale(1);
  }
}
</style>
