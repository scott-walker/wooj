<script setup>
import { onBeforeMount, watch } from "vue"
import WoojList from "@components/WoojList.vue"
import useDataStore from "@stores/data"

const store = useDataStore()
// const load = () => store.isLoadedTopics && store.activateTopic(store.topicAll.id)

// onBeforeMount(load)
// watch(() => store.isLoadedTopics, load)
</script>

<template>
  <div class="view-pinned">
    <WoojList
      id="pinned"
      title="Закрепленные"
      :woojs="store.pinnedWoojs"
      :loaded="store.isLoaded"
      @sort="store.sort('pinned', $event)"
      @pin="store.togglePin"
      @edit="store.edit"
      @remove="store.remove" />
  </div>
</template>
