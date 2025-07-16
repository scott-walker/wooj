<script setup>
import { computed, onBeforeMount } from "vue"
import useUserStore from "@stores/user"
import useWoojsStore from "@stores/woojs"

// import Notifies from "@components/Notifies.vue"
import MainLayout from "@layouts/Main.vue"
import Auth from "@views/Auth.vue"

const userStore = useUserStore()
const woojsStore = useWoojsStore()
const isLogged = computed(() => userStore.isLogged)

onBeforeMount(() => isLogged.value && woojsStore.fetchAll())
</script>

<template>
  <!-- <Notifies /> -->
  <MainLayout v-if="isLogged" />
  <Auth v-else />
</template>
