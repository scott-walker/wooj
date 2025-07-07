<script setup>
import { computed } from "vue"
import { useAuthStore } from '@/stores/auth'

// import Notifies from '@components/Notifies.vue'
import MainLayout from '@layouts/Main.vue'
import Auth from '@views/Auth.vue'

const store = useAuthStore()
const isLogged = computed(() => store.isLogged)
</script>

<template>
  <!-- <Notifies /> -->
  <MainLayout v-if="isLogged" />
  <Auth v-else @submit="store.login" />
</template>
