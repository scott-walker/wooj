<script setup>
import { useToastsStore } from "@stores/toasts"

const { toasts } = useToastsStore()
</script>

<template>
  <div class="toasts">
    <TransitionGroup name="toast-transition">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toasts__toast"
        :class="toast.type"
        v-html="toast.message" />
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "@styles/colors";
@use "@styles/media";

.toasts {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  z-index: 10010;
  top: 60px;
  right: 0;
  padding: 0 20px;
  gap: 10px;
  font-size: 18px;

  &__toast {
    padding: 10px 40px;
    max-width: 500px;
    border-radius: 5px;
    background: color.change(colors.$basic, $alpha: 90%);
    color: colors.$absorbing;

    &.success {
      background: color.change(colors.$primary, $alpha: 90%);
      color: colors.$basic;
    }

    &.alert {
      background: color.change(colors.$danger, $alpha: 90%);
    }
  }
}

.toast-transition {

  &-enter-active,
  &-leave-active {
    transition: all .3s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0.3;
    transform: translateX(200px);
  }
}

@include media.sm() {
  .toasts {
    top: 10px;
    padding: 0 10px;

    &__toast {
      max-width: 100%;
    }
  }
}
</style>
