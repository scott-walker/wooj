<script setup>
import WoojList from "@components/WoojList.vue"
</script>

<template>
  <div class="view-drafts">
    <WoojList id="drafts" title="Черновики" :woojs="[]" />
  </div>
</template>
