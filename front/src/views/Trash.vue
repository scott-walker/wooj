<script setup>
import { computed, onBeforeMount, watch } from "vue"
import WoojList from "@components/WoojList.vue"
import useDataStore from "@stores/data"

const store = useDataStore()
const isShowedButton = computed(() => store.removedWoojs.length)

// const load = () => store.isLoadedTopics && store.activateTopic(store.topicAll.id)

// onBeforeMount(load)
// watch(() => store.isLoadedTopics, load)
</script>

<template>
  <div class="view-trash">
    <WoojList
      id="trash"
      title="Корзина"
      emptyText="Корзина пуста"
      :hasSort="false"
      :hasPin="false"
      :hasEdit="false"
      :hasRemove="false"
      :hasRestore="true"
      :woojs="store.removedWoojs"
      :loaded="store.isLoaded"
      @restore="store.restore">
      <template #panel>
        <button v-if="isShowedButton" class="button is-danger" @click="onClearTrash">
          <span class="icon">
            <i class="fas fa-times"></i>
          </span>
          <span>Очистить корзину</span>
        </button>
      </template>
    </WoojList>
  </div>
</template>
