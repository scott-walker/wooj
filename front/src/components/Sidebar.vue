<script setup>
import { ref } from "vue"
import Button from "@ui/Button.vue"
import Modal from "@ui/Modal.vue"
import Skeleton from "@ui/Skeleton.vue"
import SidebarLink from "@components/SidebarLink.vue"
import CreateTopic from "@components/CreateTopic.vue"
import { useWoojStore } from "@stores/wooj"

const isShowedCreateTopic = ref(false)
const woojStore = useWoojStore()

const onShowCreateTopic = () => isShowedCreateTopic.value = true
const onHideCreateTopic = () => isShowedCreateTopic.value = false
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
    <ul v-if="woojStore.isLoadedTopics" class="sidebar__menu">
      <li v-for="topic of woojStore.topics" class="sidebar__menu-item">
        <SidebarLink :route="{ name: 'Topic', params: { topicId: topic.id } }" :text="topic.name" icon="tag" />
      </li>
    </ul>
    <Skeleton v-else />

    <div class="sidebar__item plus-topic-item">
      <Button text="Топик" icon="plus" @click="onShowCreateTopic" />
    </div>
    <Modal v-model="isShowedCreateTopic" title="Новый топик">
      <CreateTopic @created="onHideCreateTopic" />
    </Modal>
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
