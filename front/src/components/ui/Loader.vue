<script setup>
import { computed } from "vue"

const props = defineProps({
  size: { type: Number, default: null },
})
const style = computed(() => {
  if (!props.size) return {}

  return {
    width: `${props.size}px`,
    height: `${props.size}px`
  }
})
</script>

<template>
  <div class="ui-loader" :style="style">
    <svg class="ui-loader__figure" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="4" cy="12" r="3">
        <animate id="spinner_jObz" begin="0;spinner_vwSQ.end-0.25s" attributeName="r" dur="0.75s" values="3;.2;3" />
      </circle>
      <circle cx="12" cy="12" r="3">
        <animate begin="spinner_jObz.end-0.6s" attributeName="r" dur="0.75s" values="3;.2;3" />
      </circle>
      <circle cx="20" cy="12" r="3">
        <animate id="spinner_vwSQ" begin="spinner_jObz.end-0.45s" attributeName="r" dur="0.75s" values="3;.2;3" />
      </circle>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
// https://magecdn.com/tools/svg-loaders/3-dots-scale/

@use "@styles/colors";

.ui-loader {
  width: 100%;
  height: 100%;

  &__figure {
    fill: colors.$basic;
    width: 100%;
    height: 100%;
  }
}
</style>
