<script setup lang="ts">
import { onBeforeMount, onMounted } from "vue"

import { useWoojsStore } from "@stores/woojs"
import { useMediaStore } from "@stores/media"

// import Header from "@components/Header/Header.vue"
// import Sidebar from "@components/Sidebar.vue"

const mediaStore = useMediaStore()
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
