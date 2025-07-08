<script setup>
import { ref, onMounted } from "vue"
import WoojList from "@components/WoojList.vue"
import useWoojs from "@hooks/woojs"

const { woojs, fetchPinned, unpin, hideWooj, onEdit, onRemove } = useWoojs()
const isLoaded = ref(false)

const onPin = async ({ id }) => {
  hideWooj(id)

  await unpin(id)
}

onMounted(async () => {
  await fetchPinned()

  isLoaded.value = true
})
</script>

<template>
  <div class="view-pinned">
    <WoojList
      v-if="isLoaded"
      id="pinned"
      title="Закрепленные"
      :woojs="woojs"
      @pin="onPin"
      @edit="onEdit"
      @remove="onRemove" />
  </div>
</template>
