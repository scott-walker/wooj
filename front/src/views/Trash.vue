<script setup>
import WoojList from "@components/WoojList.vue"
</script>

<template>
  <div class="view-trash">
    <WoojList id="trash" title="Корзина" :woojs="[]" />
  </div>
</template>
