<script setup>
import { computed } from "vue"
import { RouterView } from "vue-router"
import { useAuthStore } from "@stores/auth"
// import { useWoojStore } from "@stores/wooj"
import Sidebar from "@components/Sidebar.vue"

const authStore = useAuthStore()
// const woojStore = useWoojStore()
const user = computed(() => authStore.user)
// const hasActiveWooj = computed(() => !!woojStore.activeId)
</script>

<template>
  <div class="layout fixed-grid has-4-cols">
    <div class="grid">
      <div class="cell">
        <p class="title">WOOJ</p>
      </div>
      <div class="cell is-col-span-2"></div>
      <div class="cell">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img class="is-rounded" src="@assets/avatar.jpeg" alt="Placeholder image" />
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{ user.name }}</p>
            <p class="subtitle is-6">
              <a @click.prevent="authStore.logout">Выйти</a>
            </p>
          </div>
        </div>
      </div>

      <div class="cell">
        <Sidebar />
      </div>
      <div class="cell is-col-span-3">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.layout {
  .cell {
    padding: 20px;
  }
}
</style>
