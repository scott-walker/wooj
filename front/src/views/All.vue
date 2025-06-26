<script setup>
import { ref, onMounted, inject } from "vue"
import WoojList from "@components/WoojList.vue"

const { wooj: woojService } = inject("services")

const woojs = ref(null)

onMounted(async () => {
  woojs.value = await woojService.getAll()
})
</script>

<template>
  <div class="view-all">
    <WoojList id="all" title="Все вуджи" :woojs="woojs" />
  </div>
</template>
