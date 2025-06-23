<script setup>
const props = defineProps(["message"])
</script>

<template>
  <div class="notify u-flex u-justify-center">
    <div class="toast toast--gray max-w-xs">
      <button class="btn-close"></button>
      <p>{{ props.message }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.notify {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}
</style>
