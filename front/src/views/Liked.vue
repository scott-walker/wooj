<script setup>
import { onMounted } from "vue"
import WoojList from "@components/WoojList.vue"
import useWoojs from "@hooks/woojs"

const { woojs, fetchLiked, unsetLike, hideWooj, onEdit, onRemove } = useWoojs()

const onLike = async ({ id }) => {
  hideWooj(id)

  await unsetLike(id)
}
onMounted(fetchLiked)
</script>

<template>
  <div class="view-liked">
    <WoojList
      id="liked"
      title="Любимые"
      :woojs="woojs"
      @like="onLike"
      @edit="onEdit"
      @remove="onRemove" />
  </div>
</template>
