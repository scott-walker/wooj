<script setup>
import { computed } from "vue"
import { RouterView } from 'vue-router'
import { useAuthStore } from '@stores/auth'

const store = useAuthStore()
const user = computed(() => store.user)
// import Header from '@components/Header.vue'
</script>

<template>
  <div class="fixed-grid has-4-cols">
    <div class="grid">
      <div class="cell">
        <p class="title">WOOJ</p>
      </div>
      <div class="cell is-col-span-2">Cell 2</div>
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
              <a href="#" @click.prevent="store.logout">Выйти</a>
            </p>
          </div>
        </div>
      </div>

      <div class="cell">Sidebar</div>
      <div class="cell is-col-span-3">
        <RouterView />
      </div>
    </div>
  </div>
</template>
