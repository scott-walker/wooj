<script setup>
import { useRouter } from "vue-router"
import Link from "@ui/Link.vue"

const router = useRouter()
const onHome = () => router.push({ name: 'Debug' })
</script>

<template>
  <Link :scalable="false" @click="onHome"><span class="logo">WOOJ</span></Link>
</template>

<style lang="scss">
@use "@styles/media";

.logo {
  display: inline-block;
  padding: 15px;
  padding-right: 16px;
  font-size: 22px;
  font-weight: 900;
}

@include media.sm() {
  .logo {
    padding: 15px 10px;
    font-size: 18px;
  }
}
</style>
