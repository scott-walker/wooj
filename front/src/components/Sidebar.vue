<script setup>
import { RouterLink } from "vue-router"
import { useWoojStore } from "@stores/wooj"

const store = useWoojStore()
</script>

<template>
  <aside v-if="store.woojs.length" class="menu">
    <p class="menu-label">Топики</p>
    <ul class="menu-list">
      <li v-for="wooj of store.woojs">
        <RouterLink :to="{ name: 'Wooj', params: { woojId: wooj.id } }" custom v-slot="{ isActive, href, navigate }">
          <a :class="isActive ? 'is-active' : ''" :href="href" @click="navigate">
            <span class="icon mr-2 has-text-grey-light"><i class="fas fa-tag"></i></span>{{ wooj.title }}
          </a>
        </RouterLink>
      </li>
    </ul>
    <!-- <p class="menu-label">Administration</p>
    <ul class="menu-list">
      <li><a>Team Settings</a></li>
      <li>
        <a class="is-active">Manage Your Team</a>
        <ul>
          <li><a>Members</a></li>
          <li><a>Plugins</a></li>
          <li><a>Add a member</a></li>
        </ul>
      </li>
      <li><a>Invitations</a></li>
      <li><a>Cloud Storage Environment Settings</a></li>
      <li><a>Authentication</a></li>
    </ul> -->
    <p class="menu-label">Другое</p>
    <ul class="menu-list">
      <li><a><span class="icon mr-2 has-text-grey-light"><i class="fas fa-clock"></i></span>Недавние</a></li>
      <li><a><span class="icon mr-2 has-text-grey-light"><i class="fas fa-link"></i></span>Расшаренные</a></li>
      <li><a><span class="icon mr-2 has-text-grey-light"><i class="fas fa-heart"></i></span>Любимые</a></li>
      <li><a><span class="icon mr-2 has-text-grey-light"><i class="fas fa-box"></i></span>Архив</a></li>
      <li><a><span class="icon mr-2 has-text-grey-light"><i class="fas fa-trash"></i></span>Корзина</a></li>
    </ul>
  </aside>
  <div v-else class="skeleton-lines">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style lang="scss">
.menu-list {
  .icon {
    // color: ;
  }
}
</style>
