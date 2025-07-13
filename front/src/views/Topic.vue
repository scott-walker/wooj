<script setup>
import { computed, watch, onBeforeMount } from "vue"
import WoojList from "@components/WoojList.vue"
import useWoojsStore from "@stores/data"
import useWoojs from "@hooks/woojs"

const props = defineProps(["topicId"])
const { topicParamsMap, setRouteListeners } = useWoojs()
const woojStore = useWoojsStore()
const topic = computed(() => topicParamsMap.value.custom)

const activateTopic = () => woojStore.isLoadedTopics && woojStore.activateTopic(props.topicId)

onBeforeMount(() => {
  // console.log("onBeforeMount", props.topicId)
  activateTopic()
})
watch(() => woojStore.isLoadedTopics, () => {
  // console.log("watch:isLoadedTopics", props.topicId)
  activateTopic()
})
watch(() => props.topicId, () => {
  // console.log("watch:topicId", props.topicId)
  activateTopic()
})

onBeforeMount(() => setRouteListeners())
</script>

<template>
  <div class="view-topic">
    <WoojList
      :id="topic.id"
      :title="topic.title"
      :woojs="topic.woojs"
      :loaded="topic.isLoaded"
      @sort="topic.sort"
      @pin="topic.togglePin"
      @edit="topic.edit"
      @remove="topic.remove" />
  </div>
</template>
