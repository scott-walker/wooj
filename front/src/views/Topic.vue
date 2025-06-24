<script setup>
import { computed, onBeforeMount, onBeforeUpdate } from "vue"
import { useWoojStore } from "@stores/wooj"

const store = useWoojStore()

const props = defineProps(["topicId"])
const topic = computed(() => store.activeTopic)

function init() {
  store.activateTopic(props.topicId)
}

onBeforeMount(init)
onBeforeUpdate(init)
</script>

<template>
  <div class="view-topic">
    <h1 class="title">{{ topic.name }}</h1>

    <div class="grid is-col-min-10 is-gap-0">
      <div v-for="wooj of topic.woojs" class="cell p-2">
        <div class="box">
          <p class="title is-4">{{ wooj.title }}</p>
          <p class="content">{{ wooj.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
