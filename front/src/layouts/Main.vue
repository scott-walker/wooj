<script setup>
import { computed } from "vue"
import { RouterView } from "vue-router"
import { useAuthStore } from "@stores/auth"
import Sidebar from "@components/Sidebar.vue"

const authStore = useAuthStore()
const user = computed(() => authStore.user)
</script>

<template>
  <div class="layout fixed-grid has-5-cols">
    <div class="grid">
      <div class="cell">
        <p class="title">WOOJ</p>
      </div>
      <div class="cell is-col-span-3">
        <div class="block">
          <p class="control has-icons-left">
            <input class="input" type="text" placeholder="Search" />
            <span class="icon is-left">
              <i class="fas fa-search" aria-hidden="true"></i>
            </span>
          </p>
        </div>
      </div>
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
      <div class="cell is-col-span-4">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><a href="#">Bulma</a></li>
            <li><a href="#">Documentation</a></li>
            <li><a href="#">Components</a></li>
            <li class="is-active"><a href="#" aria-current="page">Breadcrumb</a></li>
          </ul>
        </nav>

        <RouterView />
      </div>
      <div class="cell">
        <!-- <Sidebar /> -->
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
