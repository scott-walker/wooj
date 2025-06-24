<script setup>
import { ref, inject, onBeforeMount } from "vue"
import { useWoojStore } from "@stores/wooj"

const woojStore = useWoojStore()
const { user: userService } = inject("services")

const version = ref("0.0")

onBeforeMount(async () => {
  version.value = await userService.getTest()
})
</script>

<template>
  <div class="view-index">
    <p class="title">WOOJ v{{ version }}</p>
    <p class="subtitle">Создавай быстро простые заметки</p>

    <div class="grid is-col-min-10 is-gap-0">
      <div v-for="wooj of woojStore.woojs" class="cell p-2">
        <div class="box">
          <p class="title is-4">{{ wooj.title }}</p>
          <p class="content">{{ wooj.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
