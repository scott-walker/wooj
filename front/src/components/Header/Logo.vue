<script setup>
import { useRouter } from "vue-router"
import Link from "@ui/Link.vue"

const router = useRouter()
const onHome = () => router.push({ name: 'Index' })
</script>

<template>
  <Link :scalable="false" @click="onHome"><span class="logo">WOOJ</span></Link>
</template>

<style lang="scss">
.logo {
  display: inline-block;
  padding: 10px;
  padding-right: 16px;
  font-size: 22px;
  font-weight: 900;
}
</style>
