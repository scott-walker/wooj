<script setup>
import { computed, onBeforeMount, onBeforeUpdate } from "vue"
import WoojList from "@components/WoojList.vue"
import { useWoojStore } from "@stores/wooj"

const store = useWoojStore()

const props = defineProps(["topicId"])
const topic = computed(() => store.activeTopic)
const listId = computed(() => `topic-${props.topicId}`)

function init() {
  store.activateTopic(props.topicId)
}

onBeforeMount(init)
onBeforeUpdate(init)
</script>

<template>
  <div class="view-topic">
    <WoojList v-if="topic" :id="listId" :title="topic.name" :woojs="topic.woojs" />
  </div>
</template>
