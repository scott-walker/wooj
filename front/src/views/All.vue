<script setup>
import { computed, onBeforeMount } from "vue"
import WoojList from "@components/WoojList.vue"
import useWoojs from "@hooks/woojs"

const { topicParamsMap, setRouteListeners } = useWoojs()
const topic = computed(() => topicParamsMap.value.all)

onBeforeMount(() => setRouteListeners())
</script>

<template>
  <div class="view-all">
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
