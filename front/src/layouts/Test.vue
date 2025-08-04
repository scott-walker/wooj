<script setup>
import { onBeforeMount, onMounted } from "vue"

import { useLayoutStore } from "@stores/layout"
import { useWoojsStore } from "@stores/woojs"

import Header from "@components/Header/Header.vue"
import Sidebar from "@components/Sidebar.vue"

const layoutStore = useLayoutStore()
const woojsStore = useWoojsStore()

onBeforeMount(() => woojsStore.fetchAll())
</script>

<template>
  <div class="layout">
    <slot />

    <!-- <div class="layout__header">
      <Header />
    </div> -->

    <!-- Body -->
    <!-- <div class="layout__body">
      <slot />
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.layout {}
</style>
