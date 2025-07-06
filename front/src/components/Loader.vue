<script setup>
</script>

<template>
  <div class="loader">
    <progress class="loader__progress progress is-small" max="100">15%</progress>
  </div>
</template>

<style lang="scss" scoped>
@use "@styles/colors";

.loader {
  // position: absolute;
  // top: 0px;
  // width: 100%;
  // z-index: 1000;

  // .progress.progress--primary {
  //   --progress-color: colors.$primary;
  // }

  // .progress:indeterminate {
  //   background: #e9ecef linear-gradient(to right, var(--progress-color) 30%, #e9ecef 30%) top left / 150% 150% no-repeat;
  // }
}
</style>
