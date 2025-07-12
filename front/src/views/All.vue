<script setup>
import { onBeforeMount, watch } from "vue"
import WoojList from "@components/WoojList.vue"
// import useWoojs from "@hooks/woojs"
import useDataStore from "@stores/data"

const dataStore = useDataStore()

// const { woojs, fetchAll, sort, onTogglePin, onEdit, onRemove } = useWoojs()
// const isLoaded = ref(false)

// const load = () => dataStore.isLoadedTopics && dataStore.activateTopic(dataStore.topicAll.id)

// onBeforeMount(load)
// watch(() => dataStore.isLoadedTopics, load)
</script>

<template>
  <div class="view-all">
    <WoojList
      id="all"
      title="Все вуджи"
      :woojs="dataStore.allWoojs"
      :loaded="dataStore.isLoaded"
      @sort="dataStore.sort('all', $event)"
      @pin="dataStore.togglePin"
      @edit="dataStore.edit"
      @remove="dataStore.remove" />
  </div>
</template>
