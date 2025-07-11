<script setup>
import { ref, onMounted } from "vue"
import WoojList from "@components/WoojList.vue"
import useWoojs from "@hooks/woojs"

const { woojs, fetchPinned, sort, unpin, hideWooj, onEdit, onRemove } = useWoojs()
const isLoaded = ref(false)

const onUnpin = async ({ id }) => {
  hideWooj(id)

  await unpin(id)
}
const onSort = (positions) => {
  sort("pinned", positions)
}

onMounted(async () => {
  await fetchPinned()

  isLoaded.value = true
})
</script>

<template>
  <div class="view-pinned">
    <WoojList
      id="pinned"
      title="Закрепленные"
      :loaded="isLoaded"
      :woojs="woojs"
      @sort="onSort"
      @pin="onUnpin"
      @edit="onEdit"
      @remove="onRemove" />
  </div>
</template>
