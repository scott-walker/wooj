<script setup>
import { computed } from "vue"
import { useAuthStore } from '@/stores/auth'

// import { RouterView } from 'vue-router'
// import Header from '@components/Header.vue'
// import Loader from '@components/Loader.vue'
// import Notify from '@components/Notify.vue'
// import Footer from '@components/Footer.vue'
// import CleanLayout from '@layouts/Clean.vue'

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
  <!-- <Notify message="Test message" /> -->
  <!-- <Header /> -->
  <!-- <Loader /> -->

  <!-- <main class="container"> -->
  <!-- </main> -->

  <!-- <main class="row">
    <div class="md:col-12 bg-indigo-200">
      <p>Main Content</p>
      <RouterView />
    </div>
  </main> -->

  <!-- <Footer /> -->
</template>
