<script setup>
import { computed } from "vue"
import WoojList from "@components/WoojList.vue"
import { useWoojStore } from "@stores/wooj"

const store = useWoojStore()
const woojs = computed(() => store.woojs)
</script>

<template>
  <div class="view-all">
    <WoojList id="all" title="Все вуджи" :woojs="woojs" />
  </div>
</template>
