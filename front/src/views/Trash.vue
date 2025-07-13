<script setup>
import { computed, onBeforeMount } from "vue"
import WoojList from "@components/WoojList.vue"
import useWoojs from "@hooks/woojs"

const { topicParamsMap, setRouteListeners } = useWoojs()
const topic = computed(() => topicParamsMap.value.trash)
const isShowedButton = computed(() => topic.value.woojs.length)

onBeforeMount(() => setRouteListeners())
</script>

<template>
  <div class="view-trash">
    <WoojList
      :id="topic.id"
      :key="topic.id"
      :title="topic.title"
      :woojs="topic.woojs"
      :loaded="topic.isLoaded"
      :hasSort="false"
      :hasPin="false"
      :hasEdit="false"
      :hasRemove="false"
      :hasRestore="true"
      emptyText="Корзина пуста"
      @restore="topic.restore">
      <template #panel>
        <button v-if="isShowedButton" class="button is-danger" @click="topic.clearTrash">
          <span class="icon">
            <i class="fas fa-times"></i>
          </span>
          <span>Очистить корзину</span>
        </button>
      </template>
    </WoojList>
  </div>
</template>
