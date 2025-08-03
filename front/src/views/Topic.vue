<script setup>
import { computed, watch, onBeforeMount } from "vue"

import { useWoojsStore } from "@stores/woojs"
import { useWoojs } from "@composables/woojs"

import WoojList from "@components/WoojList.vue"

const props = defineProps(["topicId"])
const { topicParamsMap, onLoaded, setRouteListeners } = useWoojs()
const woojStore = useWoojsStore()
const topic = computed(() => topicParamsMap.value.custom)

const activateTopic = () => woojStore.isLoaded && woojStore.activateTopic(props.topicId)

watch(() => props.topicId, () => activateTopic())

onLoaded(() => activateTopic())
onBeforeMount(() => {
  activateTopic()
  setRouteListeners()
})
</script>

<template>
  <div class="view-topic">
    <WoojList
      :id="topic.id"
      :key="topic.id"
      :title="topic.title"
      :woojs="topic.woojs"
      :loaded="topic.isLoaded"
      :hasEditableTopic="true"
      @sort="topic.sort"
      @pin="topic.togglePin"
      @edit="topic.edit"
      @remove="topic.remove"
      @update-topic="topic.update"
      @delete-topic="topic.delete" />
  </div>
</template>
