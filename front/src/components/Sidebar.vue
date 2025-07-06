<script setup>
import SidebarLink from "@components/SidebarLink.vue"
import { useWoojStore } from "@stores/wooj"

const store = useWoojStore()
</script>

<template>
  <aside class="sidebar">
    <p class="sidebar__label">Вуджи</p>
    <ul class="sidebar__menu">
      <li class="sidebar__menu-item">
        <SidebarLink :route="{ name: 'All' }" text="Все" icon="tags" />
      </li>
      <li class="sidebar__menu-item">
        <SidebarLink :route="{ name: 'Pinned' }" text="Закрепленные" icon="thumbtack" />
      </li>
      <li class="sidebar__menu-item">
        <SidebarLink :route="{ name: 'Published' }" text="Опубликованные" icon="link" />
      </li>
      <li class="sidebar__menu-item">
        <SidebarLink :route="{ name: 'Trash' }" text="Корзина" icon="trash" />
      </li>
    </ul>

    <p class="sidebar__label">Топики</p>
    <ul v-if="store.topics.length" class="sidebar__menu">
      <li v-for="topic of store.topics" class="sidebar__menu-item">
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
  </aside>
</template>

<style lang="scss" scoped>
@use "@styles/colors";

.sidebar {
  &__label {
    margin: 0;
    padding: 10px 15px;
    color: colors.toLight(colors.$basic, 70%);
  }
}
</style>
