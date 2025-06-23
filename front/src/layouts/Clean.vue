<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <RouterView />
      </div>
    </div>
  </section>
</template>
