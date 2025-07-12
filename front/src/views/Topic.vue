<script setup>
import { computed, onBeforeMount, watch } from "vue"
import WoojList from "@components/WoojList.vue"
import useDataStore from "@stores/data"

const props = defineProps(["topicId"])
const store = useDataStore()
const title = computed(() => store.activeTopic?.name || "")
const listId = computed(() => `topic-${props.topicId}`)

const load = () => store.isLoadedTopics && store.activateTopic(props.topicId)

onBeforeMount(load)
watch(() => store.isLoadedTopics, load)
watch(() => props.topicId, load)
</script>

<template>
  <div class="view-topic">
    <WoojList
      :id="listId"
      :title="title"
      :woojs="store.activeWoojs"
      :loaded="store.isLoaded"
      @sort="store.sort(props.topicId, $event)"
      @pin="store.togglePin"
      @edit="store.edit"
      @remove="store.remove" />
  </div>
</template>
