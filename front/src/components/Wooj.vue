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

    <!-- <nav class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Просмотры</p>
          <p class="title">3,456</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Огонюшки</p>
          <p class="title">456K</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Лайки</p>
          <p class="title">789</p>
        </div>
      </div>
    </nav> -->
  </div>
</template>
