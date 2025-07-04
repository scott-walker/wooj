<script setup>
import { onMounted } from "vue"
import WoojList from "@components/WoojList.vue"
import useWoojs from "@hooks/woojs"

const { woojs, fetchPinned, unpin, hideWooj, onEdit, onRemove } = useWoojs()

const onPin = async ({ id }) => {
  hideWooj(id)

  await unpin(id)
}
onMounted(fetchPinned)
</script>

<template>
  <div class="view-pinned">
    <WoojList
      id="pinned"
      title="Закрепленные"
      :woojs="woojs"
      @pin="onPin"
      @edit="onEdit"
      @remove="onRemove" />
  </div>
</template>
