<script setup>
import Button from "@ui/Button.vue"
import SidebarLink from "@components/SidebarLink.vue"
// import { useLayoutStore } from "@stores/layout"
import { useWoojStore } from "@stores/wooj"

const woojStore = useWoojStore()
// const layoutStore = useLayoutStore()
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
    <ul v-if="woojStore.topics.length" class="sidebar__menu">
      <li v-for="topic of woojStore.topics" class="sidebar__menu-item">
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
    <!-- <p class="sidebar__label">Статус</p> -->
    <div class="sidebar__item plus-topic-item">
      <Button text="Топик" icon="plus" />
    </div>

    <!-- <template v-if="layoutStore.statusBar">
      <p class="sidebar__label">Статус</p>
      <ul class="sidebar__menu">
        <li class="sidebar__menu-item">
          <a class="sidebar-link active">
            <span class="sidebar-link__icon">
              <i :class="['fa-solid', `fa-${layoutStore.statusBar.icon}`]"></i>
            </span>
            <span class="sidebar-link__text">
              {{ layoutStore.statusBar.title }}
            </span>
          </a>
        </li>
      </ul>
    </template> -->
  </aside>
</template>

<style lang="scss" scoped>
@use "@styles/colors";

.sidebar {

  &__label,
  &__item {
    padding: 10px 15px;
  }

  &__label {
    margin: 0;
    color: colors.toLight(colors.$basic, 70%);
  }

  &__item {
    &.plus-topic-item {
      padding-left: 30px;
    }
  }
}
</style>
