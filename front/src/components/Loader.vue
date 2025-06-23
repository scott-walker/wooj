<script setup>
</script>

<template>
  <div class="loader">
    <progress class="progress progress--primary progress--xs" max="100">15%</progress>
  </div>
</template>

<style lang="scss">
.loader {
  position: fixed;
  top: 33px;
  width: 100%;
  z-index: 1;

  .progress.progress--primary {
    --progress-color: #d61f69;
  }

  .progress:indeterminate {
    background: #e9ecef linear-gradient(to right, var(--progress-color) 30%, #e9ecef 30%) top left / 150% 150% no-repeat;
  }
}
</style>
