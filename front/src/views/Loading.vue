<script setup>
// import Loader from "@ui/Loader.vue"
</script>

<template>
  <div class="view-loading">
    <div class="view-loading__center">
      <!-- <Loader /> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "@styles/colors";

.view-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: colors.$grey;
  width: 100vw;
  height: 100vh;

  // &__center {
  //   width: 100px;
  // }
}
</style>
