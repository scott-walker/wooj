<script setup>
import { ref, computed, onBeforeMount } from "vue"
import { RouterView } from "vue-router"
import useUserStore from "@stores/user"
import useWoojsStore from "@stores/woojs"

import Toasts from "@components/Toasts.vue"
import GuardLayout from "@layouts/Guard.vue"
import MainLayout from "@layouts/Main.vue"
import Verify from "@views/Verify.vue"
import Auth from "@views/Auth.vue"
import Loading from "@views/Loading.vue"

const userStore = useUserStore()
const woojsStore = useWoojsStore()
const isReady = ref(false)
const isLogged = computed(() => userStore.isLogged)
const isVerified = computed(() => userStore.isVerified)

onBeforeMount(async () => {
  await userStore.check()

  if (isLogged.value && isVerified.value) {
    await woojsStore.fetchAll()
  }

  isReady.value = true
})
</script>

<template>
  <Toasts />

  <template v-if="isReady">
    <MainLayout v-if="isLogged && isVerified">
      <RouterView />
    </MainLayout>

    <GuardLayout v-else>
      <Auth v-if="!isLogged" />
      <Verify v-else />
    </GuardLayout>
  </template>

  <Loading v-else />
</template>
