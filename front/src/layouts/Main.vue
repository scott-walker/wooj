<script setup>
import { RouterView } from "vue-router"
import { useLayoutStore } from "@stores/layout"

import Header from "@components/Header/Header.vue"
import Sidebar from "@components/Sidebar.vue"

const layoutStore = useLayoutStore()
</script>

<template>
  <div class="layout">
    <div class="layout__header">
      <Header />
    </div>

    <!-- Body -->
    <div class="layout__body">
      <div class="layout__body-sidebar"
        :class="{ aired: layoutStore.hasAiredSidebar, hovered: layoutStore.isHoveredSidebar }"
        @mouseover="layoutStore.onOverSidebar">
        <div class="layout__body-sidebar-separator"></div>
        <Sidebar />
      </div>

      <Scrollbar class="layout__body-content"
        :class="{ aired: layoutStore.hasAiredSidebar }"
        @mouseover="layoutStore.onLeaveSidebar">
        <RouterView />
      </Scrollbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@use "@styles/colors";

.layout {
  $header-gap: 10px;
  $header-height: 50px;
  $sidebar-width: 200px;
  $sidebar-active-area-width: math.div($sidebar-width, 2);
  $content-hor-gap: 40px;
  $content-ver-gap: math.div($content-hor-gap, 1.5);

  &__header {
    height: $header-height;
    overflow: hidden;
    // box-shadow: rgba(16, 0, 75, 1) 0px 12px 13px 5px;

    &-left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: $header-gap;
    }

    &-center {
      display: flex;
    }

    &-right {
      padding-right: $header-gap;
    }
  }

  &__body {
    display: flex;
    justify-content: flex-end;
    align-items: stretch;
    height: calc(100vh - $header-height);
    overflow-y: hidden;
    background-color: colors.$grey;

    &-sidebar {
      position: fixed;
      left: 0;
      z-index: 10000;
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

        & .layout__body-sidebar-separator {
          height: 10px;
        }
      }
    }

    &-content {
      width: calc(100% - $sidebar-width);
      padding: $content-ver-gap $content-hor-gap;
      transition: all 0.3s;

      &.aired {
        width: 100%;
      }
    }
  }
}
</style>
