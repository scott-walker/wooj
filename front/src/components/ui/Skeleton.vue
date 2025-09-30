<script setup lang="ts">
const props = defineProps({
  type: { type: String, default: "lines" },
  itemsNum: { type: Number, default: 6 },
})
</script>

<template>
  <div class="ui-skeleton" :class="type">
    <div v-for="i of itemsNum" class="ui-skeleton__item"></div>
  </div>
</template>

<style lang="scss" scoped>
@use "@styles/colors";

.ui-skeleton {
  width: 100%;
  padding: 10px 20px;
  animation: blink 1.5s linear infinite;

  .ui-skeleton__item {
    background: hsla(232, 31%, 85%, 0.6);
  }

  &.lines {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .ui-skeleton__item {
      height: 10px;
    }
  }

  &.block-list {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 20px;

    .ui-skeleton__item {
      flex-grow: 1;
      width: 100%;
      min-height: 200px;
    }
  }

  &.blocks {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px 20px;

    .ui-skeleton__item {
      flex-grow: 1;
      min-width: 200px;
      min-height: 120px;
    }
  }
}

@keyframes blink {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.3;
  }

  100% {
    opacity: 1;
  }
}
</style>
