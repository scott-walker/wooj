<script lang="ts" setup>
import { ref, computed, onBeforeMount, watchEffect } from "vue"
import { RouterView } from "vue-router"

import useUserStore from "@stores/user"
import { useWoojsStore } from "@stores/woojs"

import GuardLayout from "@layouts/Guard.vue"
import MainLayout from "@layouts/Main.vue"

import Verify from "@views/Verify.vue"
import Auth from "@views/Auth.vue"
import Loading from "@views/Loading.vue"

import Toasts from "@components/Toasts.vue"
import Counter from "@components/Counter.vue"
// import Debugger from "@components/Debugger.vue"

const userStore = useUserStore()
const woojsStore = useWoojsStore()
const isReady = ref(false)
const isDevMode = import.meta.env.VITE_APP_MODE === "dev"
const isLogged = computed(() => userStore.isLogged)
const isVerified = computed(() => userStore.isVerified)

onBeforeMount(async () => {
  await userStore.check()

  isReady.value = true
})

watchEffect(() => {
  if (userStore.isLogged && userStore.isVerified) woojsStore.fetchAll()
})
</script>

<template>
  <Counter v-if="!isDevMode" />
  <Toasts />

  <template v-if="isReady">
    <RouterView v-if="isLogged && isVerified" v-slot="{ Component }">
      <MainLayout>
        <component :is="Component" />
      </MainLayout>
    </RouterView>

    <GuardLayout v-else>
      <Auth v-if="!isLogged" />
      <Verify v-else />
    </GuardLayout>
  </template>

  <Loading v-else />

  <!-- <Debugger /> -->
</template>
