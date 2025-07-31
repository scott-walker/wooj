<script setup>
import { ref, computed, onBeforeMount, TransitionGroup } from "vue"
import useUserStore from "@stores/user"
import useWoojsStore from "@stores/woojs"

// import Notifies from "@components/Notifies.vue"
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
  <TransitionGroup name="views" v-if="isReady">
    <!-- <Notifies /> -->
    <MainLayout v-if="isLogged && isVerified" />
    <Verify v-else-if="isLogged && !isVerified" />
    <Auth v-else />
  </TransitionGroup>

  <Loading v-else />
</template>

<style scoped>
.views-enter-active,
.views-leave-active {
  transition: all .3s ease;
}

.views-enter-from,
.views-leave-to {
  opacity: 0.5;
}
</style>
