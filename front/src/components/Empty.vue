<script setup>
const props = defineProps({
  title: { type: String, default: "Тут пусто" },
  text: { type: String, default: "Вуджей же нет" },
})
</script>

<template>
  <div class="empty">
    <div class="empty__wrapper">
      <p class="empty__title">{{ props.title }}</p>
      <p class="empty__text">{{ props.text }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@styles/colors";

.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: calc(100vh - 200px);
  border-radius: 20px;
  text-align: center;

  color: colors.toLight(colors.$basic, 70%);

  &__title {
    font-size: 38px;
    font-weight: 900;
  }

  &__text {
    font-size: 18px;
  }
}
</style>
