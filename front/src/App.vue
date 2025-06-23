<script setup>
import { ref } from "vue"
// import { RouterView } from 'vue-router'
// import Header from '@components/Header.vue'
// import Loader from '@components/Loader.vue'
// import Notify from '@components/Notify.vue'
// import Footer from '@components/Footer.vue'
import Notifies from '@components/Notifies.vue'
import CleanLayout from '@layouts/Clean.vue'
import MainLayout from '@layouts/Main.vue'
import Auth from '@views/Auth.vue'

const isLogged = ref(false)
</script>

<template>
  <Notifies />
  <MainLayout v-if="isLogged" />
  <Auth v-else />
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
