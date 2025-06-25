<script setup>
import { computed } from "vue"
import { RouterView } from "vue-router"
import { useAuthStore } from "@stores/auth"
import Sidebar from "@components/Sidebar.vue"

const authStore = useAuthStore()
const user = computed(() => authStore.user)
</script>

<template>
  <div class="layout fixed-grid has-6-cols">
    <div class="grid is-gapless">
      <!-- Header -->
      <div class="layout__header layout__header-left cell">
        <p class="title">WOOJ</p>
      </div>
      <div class="layout__header layout__header-center cell is-col-span-4">
        <div class="block">
          <p class="control has-icons-left">
            <input class="input" type="text" placeholder="Search" />
            <span class="icon is-left">
              <i class="fas fa-search" aria-hidden="true"></i>
            </span>
          </p>
        </div>
      </div>
      <div class="layout__header layout__header-right cell">
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

      <!-- Body -->
      <div class="layout__body layout__body-sidebar cell">
        <Sidebar />
      </div>
      <div class="layout__body layout__body-content cell is-col-span-5">
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
    </div>
  </div>
</template>

<style lang="scss">
.layout {
  &__header {
    height: 80px;
    overflow: hidden;

    &-left {
      padding: 20px 20px 0px 20px;
    }

    &-center {
      padding: 20px 0px 0px 0px;
    }

    &-right {
      padding: 20px 20px 0px 20px;
    }
  }

  &__body {
    height: calc(100vh - 80px);

    &-sidebar {
      padding: 20px 20px 0px 20px;
    }

    &-content {
      padding: 20px 20px 0px 0px;
    }
  }

  .cell {
    // padding: 20px;
  }
}
</style>
