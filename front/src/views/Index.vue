<script setup>
import { ref, inject, onBeforeMount } from "vue"

const { user: userService } = inject("services")

const version = ref("0.0")

onBeforeMount(async () => {
  version.value = await userService.getTest()
})
</script>

<template>
  <div id="splash-img" class="hero fullscreen hero-img parallax-img">
    <div class="hero-body">
      <div class="content u-text-center">
        <h1 class="uppercase">WOOJ v{{ version }}</h1>
        <h3 class="uppercase u-opacity-70">Создавайте быстро простые заметки</h3>
        <!-- <p>{{ version }}</p> -->
        <!-- <pre class="u-text-left">{{ version }}</pre> -->
      </div>
    </div>
  </div>
</template>
