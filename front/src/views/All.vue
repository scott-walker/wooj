<script setup>
import { onMounted } from "vue"
import WoojList from "@components/WoojList.vue"
import useWoojs from "@hooks/woojs"

const { woojs, fetchAll, onTogglePin, onEdit, onRemove } = useWoojs()

onMounted(fetchAll)
</script>

<template>
  <div class="view-all">
    <WoojList
      id="all"
      title="Все вуджи"
      :woojs="woojs"
      @pin="onTogglePin"
      @edit="onEdit"
      @remove="onRemove" />
  </div>
</template>
