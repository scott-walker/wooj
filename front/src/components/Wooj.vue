<script setup>
import { computed } from "vue"

const props = defineProps({
  data: Object
})
const wooj = computed(() => props.data)
</script>

<template>
  <div class="wooj box">
    <h1 class="title">{{ wooj.title }}</h1>
    <div class="content">{{ wooj.content }}</div>
  </div>
</template>
