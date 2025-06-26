<script setup>
import SidebarLink from "@components/SidebarLink.vue"
import { useWoojStore } from "@stores/wooj"

const store = useWoojStore()
</script>

<template>
  <aside class="menu">
    <p class="menu-label">Вуджи</p>
    <ul class="menu-list">
      <li>
        <SidebarLink :route="{ name: 'All' }" text="Все" icon="tags" />
      </li>
      <!-- <li>
        <SidebarLink :route="{ name: 'Recent' }" text="Недавние" icon="clock" />
      </li> -->
      <li>
        <SidebarLink :route="{ name: 'Liked' }" text="Любимые" icon="heart" />
      </li>
      <li>
        <SidebarLink :route="{ name: 'Published' }" text="Опубликованные" icon="link" />
      </li>
    </ul>

    <p class="menu-label">Топики</p>
    <ul v-if="store.topics.length" class="menu-list">
      <li v-for="topic of store.topics">
        <SidebarLink :route="{ name: 'Topic', params: { topicId: topic.id } }" :text="topic.name" icon="tag" />
      </li>
    </ul>
    <div v-else class="skeleton-lines p-4">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

    <p class="menu-label">Другое</p>
    <ul class="menu-list">
      <li>
        <SidebarLink :route="{ name: 'Drafts' }" text="Черновики" icon="sticky-note" />
      </li>
      <li>
        <SidebarLink :route="{ name: 'Archive' }" text="Архив" icon="archive" />
      </li>
      <li>
        <SidebarLink :route="{ name: 'Trash' }" text="Корзина" icon="trash" />
      </li>
    </ul>
  </aside>
</template>

<!-- <style lang="scss"></style> -->
