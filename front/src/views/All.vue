<script setup>
import { ref, onMounted } from "vue"
import WoojList from "@components/WoojList.vue"
import useWoojs from "@hooks/woojs"

const { woojs, fetchAll, sort, onTogglePin, onEdit, onRemove } = useWoojs()
const isLoaded = ref(false)

const onSort = (positions) => {
  sort("all", positions)
}

onMounted(async () => {
  await fetchAll()

  isLoaded.value = true
})
</script>

<template>
  <div class="view-all">
    <WoojList
      v-if="isLoaded"
      id="all"
      title="Все вуджи"
      :woojs="woojs"
      @sort="onSort"
      @pin="onTogglePin"
      @edit="onEdit"
      @remove="onRemove" />
  </div>
</template>
