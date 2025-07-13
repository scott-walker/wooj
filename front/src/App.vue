<script setup>
import { computed, onBeforeMount } from "vue"
import { useAuthStore } from "@stores/auth"
import useWoojsStore from "@stores/woojs"

// import Notifies from "@components/Notifies.vue"
import MainLayout from "@layouts/Main.vue"
import Auth from "@views/Auth.vue"

const authStore = useAuthStore()
const woojsStore = useWoojsStore()
const isLogged = computed(() => authStore.isLogged)

onBeforeMount(() => isLogged.value && woojsStore.fetchAll())
</script>

<template>
  <!-- <Notifies /> -->
  <MainLayout v-if="isLogged" />
  <Auth v-else />
</template>
