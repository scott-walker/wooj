<script setup>
import { onMounted, useTemplateRef } from "vue"

import { useLayoutStore } from "@stores/layout"
import { useLockers } from "@composables/lockers"

import Header from "@components/Header/Header.vue"
import Sidebar from "@components/Sidebar.vue"

const layoutStore = useLayoutStore()

const header = useTemplateRef("header")
const sidebar = useTemplateRef("sidebar")
const content = useTemplateRef("content")

const { lockTouchMove } = useLockers()

onMounted(() => {
  layoutStore.setContentElement(content.value)

  lockTouchMove(header.value)
  lockTouchMove(sidebar.value)
})
</script>

<template>
  <div class="layout-main">
    <div ref="header" class="layout-main__header">
      <div class="layout-main__header-content">
        <Header />
      </div>
    </div>

    <div class="layout-main__body">
      <div
        ref="sidebar"
        class="layout-main__body-sidebar"
        :class="{
          'aired': layoutStore.isAired,
          'hovered': layoutStore.isHoveredSidebar
        }"
        @mouseover="layoutStore.onOverSidebar">
        <div class="layout-main__body-sidebar-separator"></div>
        <Sidebar />
      </div>

      <div
        ref="content"
        class="layout-main__body-content"
        :class="{ 'aired': layoutStore.isAired }"
        @mouseover="layoutStore.onLeaveSidebar">
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

.layout-main {
  $header-gap: 10px;
  $header-height: 50px;
  $sidebar-width: 200px;
  $sidebar-active-area-width: math.div($sidebar-width, 2);
  $content-hor-gap: 40px;
  $content-ver-gap: math.div($content-hor-gap, 1.5);

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  height: 100%;

  &__header {
    position: relative;
    z-index: 1010;
    width: 100%;
    height: $header-height;

    &-content {}
  }

  &__body {
    display: flex;
    justify-content: flex-end;
    align-items: stretch;
    width: 100%;
    height: calc(100vh - $header-height);
    background: colors.$grey;

    &-sidebar {
      position: fixed;
      left: 0;
      z-index: 1000;
      min-width: $sidebar-width;
      max-width: $sidebar-width;
      height: 100%;
      transition: all 0.3s;
      background: colors.$absorbing;

      &-separator {
        background-color: colors.$grey;
        width: 100%;
        height: 0;
        transition: height 0.3s;
      }

      &.aired {
        margin-left: -$sidebar-active-area-width;
        opacity: 0;

        &.hovered {
          margin-left: 0;
          opacity: 1;
        }

        & .layout-main__body-sidebar-separator {
          height: 10px;
        }
      }
    }

    &-content {
      position: relative;
      width: calc(100% - $sidebar-width);
      height: calc(100vh - $header-height);
      // height: 100%;
      padding: $content-ver-gap $content-hor-gap;
      transition: all 0.3s;
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;

      &.aired {
        width: 100%;
      }
    }
  }
}

.view-transition {

  &-enter-active,
  &-leave-active {
    transition: all .1s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: .3;
    transform: translateY(5px)
  }
}


@include media.lg() {
  .layout-main {
    &__body {

      &-sidebar {
        padding-top: 10px;

        &.aired {
          & .layout-main__body-sidebar-separator {
            height: 0;
          }
        }
      }

      &-content {
        padding: 20px;
        padding-bottom: 100px;
      }
    }
  }
}

@include media.sm() {
  .layout-main {
    &__body {
      &-sidebar {
        &.aired {
          margin-left: -200px;
        }
      }

      &-content {
        padding-bottom: 200px;
      }
    }
  }
}
</style>
