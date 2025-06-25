<script setup>
import WoojList from "@components/WoojList.vue"
</script>

<template>
  <div class="view-liked">
    <WoojList id="liked" title="Любимые" :woojs="[]" />
  </div>
</template>
