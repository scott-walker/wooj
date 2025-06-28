<script setup>
import { ref, onMounted, inject } from "vue"
import WoojList from "@components/WoojList.vue"

const { wooj: woojService } = inject("services")

const woojs = ref(null)

const fetchWoojs = async () => {
  woojs.value = await woojService.getLiked()
}

const onUnetLike = (data) => {
  console.log("setLike", data)

  fetchWoojs()
}

onMounted(fetchWoojs)
</script>

<template>
  <div class="view-liked">
    <WoojList id="liked" title="Любимые" :woojs="woojs" @unsetLike="onUnetLike" />
  </div>
</template>
