<script setup>
import { ref, onMounted, inject } from "vue"
import WoojList from "@components/WoojList.vue"

const { wooj: woojService } = inject("services")

const woojs = ref(null)

const fetchWoojs = async () => {
  woojs.value = await woojService.getAll()
}

const onUpdate = () => fetchWoojs()

onMounted(fetchWoojs)
</script>

<template>
  <div class="view-all">
    <WoojList id="all" title="Все вуджи" :woojs="woojs" @update="onUpdate" />
  </div>
</template>
