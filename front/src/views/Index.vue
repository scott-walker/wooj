<script setup>
import { ref, inject, onBeforeMount } from "vue"

const { userService } = inject("services")

const version = ref("0.0")

onBeforeMount(async () => {
  version.value = await userService.getTest()
})
</script>

<template>
  <div class="view-index">
    <p class="title">WOOJ v{{ version }}</p>
    <p class="subtitle">Создавай быстро простые заметки</p>
  </div>
</template>
