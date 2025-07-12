<script setup>
import { computed, onBeforeMount } from "vue"
import { useAuthStore } from "@stores/auth"
import useDataStore from "@stores/data"

// import Notifies from "@components/Notifies.vue"
import MainLayout from "@layouts/Main.vue"
import Auth from "@views/Auth.vue"

const authStore = useAuthStore()
const dataStore = useDataStore()
const isLogged = computed(() => authStore.isLogged)

onBeforeMount(() => isLogged.value && dataStore.fetchAll())
</script>

<template>
  <!-- <Notifies /> -->
  <MainLayout v-if="isLogged" />
  <Auth v-else />
</template>
