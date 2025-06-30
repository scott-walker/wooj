<script setup>
import { onMounted } from "vue"
import WoojList from "@components/WoojList.vue"
import useWoojs from "@hooks/woojs"

const { woojs, fetchAll, onToggleLike, onEdit, onRemove } = useWoojs()

onMounted(fetchAll)
</script>

<template>
  <div class="view-all">
    <WoojList
      id="all"
      title="Все вуджи"
      :woojs="woojs"
      @like="onToggleLike"
      @edit="onEdit"
      @remove="onRemove" />
  </div>
</template>
