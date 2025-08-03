<template>
  <div class="layout-guard">
    <div class="layout-guard__center">
      <div class="layout-guard-brand">
        <h1 class="layout-guard-brand__title">WOOJ</h1>
        <p class="layout-guard-brand__subtitle">Создавай быстро простые заметки</p>
      </div>

      <div class="layout-guard__content">
        <Transition name="view-transition" mode="out-in">
          <slot />
        </Transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@use "@styles/media";
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
    text-align: center;
    padding: 20px;

    &__title {
      margin: 0;
      font-size: 52px;
      font-weight: 900;
    }

    &__subtitle {
      margin: 5px 0;
      font-size: 20px;
    }
  }

  &__content {
    display: flex;
    justify-content: center;
    margin: 0 20px;
  }
}

.view-transition {

  &-enter-active,
  &-leave-active {
    transition: all .1s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0.5;
    transform: scale(.9);
  }
}

@include media.sm() {

  .layout-guard {
    &-brand {
      padding: 20px 10px;

      &__title {
        margin: 0;
        font-size: 42px;
      }

      &__subtitle {
        margin: 5px 0;
        font-size: 16px;
      }
    }
  }

}
</style>
