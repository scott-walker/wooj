<script setup>
import { RouterView } from 'vue-router'
import Header from '@components/Header.vue'
import Footer from '@components/Footer.vue'
</script>

<template>
  <Header />

  <main>
    <RouterView />
  </main>

  <!-- <main class="row">
    <div class="md:col-12 bg-indigo-200">
      <p>Main Content</p>
      <RouterView />
    </div>
  </main> -->

  <Footer />
</template>

<style lang="scss" scoped>
// .content {}</style>
