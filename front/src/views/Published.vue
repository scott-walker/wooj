<script setup>
import WoojList from "@components/WoojList.vue"
</script>

<template>
  <div class="view-published">
    <WoojList id="published" title="Опубликованные" :woojs="[]" />
  </div>
</template>
