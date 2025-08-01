<script setup>
import useToast from "@hooks/toasts"

const { toasts } = useToast()
</script>

<template>
  <div class="toasts">
    <TransitionGroup name="toast-transition">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toasts__toast"
        :class="toast.type">
        {{ toast.message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "@styles/colors";

$toast-width: 500px;

.toasts {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 9999;
  top: 20px;
  left: calc(50% - $toast-width / 2);
  width: $toast-width;
  gap: 10px;
  font-size: 18px;

  &__toast {
    padding: 10px 40px;
    max-width: $toast-width;
    border-radius: 5px;
    background: color.change(colors.$basic, $alpha: 80%);
    color: colors.$absorbing;

    &.primary {
      background: color.change(colors.$primary, $alpha: 80%);
      color: colors.$basic;
    }

    &.danger {
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
    transform: translateY(-100px);
  }
}
</style>
