<script setup>
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"

import { ref, computed, onBeforeMount, onMounted, onUnmounted } from "vue"
import { RouterView } from "vue-router"
import useUserStore from "@stores/user"

import GuardLayout from "@layouts/Guard.vue"
import MainLayout from "@layouts/Main.vue"

import Verify from "@views/Verify.vue"
import Auth from "@views/Auth.vue"
import Loading from "@views/Loading.vue"

import Toasts from "@components/Toasts.vue"
import Counter from "@components/Counter.vue"
import Debugger from "@components/Debugger.vue"

const userStore = useUserStore()
const isReady = ref(false)
const isDevMode = import.meta.env.VITE_APP_MODE === "dev"
const isLogged = computed(() => userStore.isLogged)
const isVerified = computed(() => userStore.isVerified)

onBeforeMount(async () => {
  await userStore.check()

  isReady.value = true
})

onMounted(() => {
  // console.log("asdasdsadsad")

  // function preventScroll(e) {
  //   e.preventDefault()

  //   debuggerStore.push({
  //     action: "lock scroll",
  //     target: e.target,
  //   })
  // }

  // function preventScrollKeys(e) {
  //   const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', ' ']
  //   if (keys.includes(e.key)) {
  //     preventScroll(e)
  //   }
  // }

  // function hardLockScroll() {
  //   document.addEventListener('wheel', preventScroll, { passive: false })
  //   document.addEventListener('touchmove', preventScroll, { passive: false })
  //   document.addEventListener('keydown', preventScrollKeys)
  // }

  // function hardUnlockScroll() {
  //   document.removeEventListener('wheel', preventScroll)
  //   document.removeEventListener('touchmove', preventScroll)
  //   document.removeEventListener('keydown', preventScrollKeys)
  // }

  // hardLockScroll()
  // hardUnlockScroll()
})
// onUnmounted(() => enableBodyScroll(document.body))
</script>

<template>
  <Debugger />
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
</template>
