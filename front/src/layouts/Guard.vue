<template>
  <div class="layout-guard">
    <div class="layout-guard__center">
      <div class="layout-guard-brand">
        <h1 class="layout-guard-brand__title">WOOJ</h1>
        <p class="layout-guard-brand__subtitle">Создавай быстро простые заметки</p>
      </div>

      <div class="layout-guard__content">
        <Transition name="view-transition">
          <slot />
        </Transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@use "@styles/colors";

.layout-guard {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: colors.$grey;
  width: 100vw;
  height: 100vh;

  &-brand {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;

    &__title {
      font-size: 52px;
      font-weight: 900;
    }

    &__subtitle {
      font-size: 22px;
    }
  }

  &__content {
    display: flex;
    justify-content: center;
  }
}

.view-transition {

  &-enter-active,
  &-leave-active {
    transition: all .3s ease;
  }

  &-enter-from,
  &-leave-to {
    position: absolute;
    opacity: 0;
    transform: scale(.5);
  }
}
</style>
