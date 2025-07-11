<script setup>
import { ref, watch } from "vue"
import IconLink from "@ui/IconLink.vue"

const show = defineModel()
const props = defineProps({
  title: { type: String, default: "" },
})

// watch(show, (value) => {
//   if (value === false) {

//   }
// })

const onClose = () => show.value = false
</script>

<template>
  <div class="ui-modal" v-if="show">
    <div class="ui-modal__background" @click="onClose"></div>
    <div class="ui-modal__content">
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
    background: color.change(colors.$grey, $alpha: 50%);
    animation: fade .3s ease forwards;
  }

  &__content {
    position: absolute;
    z-index: 10;
    @include common.card();
    animation: scale .3s ease forwards;

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
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
    backdrop-filter: blur(2px);
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
