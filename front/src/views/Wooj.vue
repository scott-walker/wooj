<script setup>
import { ref, reactive, watch, onBeforeMount, onUnmounted } from "vue"

import { useLayoutStore } from "@stores/layout"
import { useWoojs } from "@composables/woojs"

import Wooj from "@components/Wooj.vue"
import Empty from "@components/Empty.vue"

const props = defineProps(["woojId"])
const { woojStore, onLoaded, setRouteListeners } = useWoojs()
const layoutStore = useLayoutStore()

const wooj = reactive({
  id: null,
  title: "",
  content: "",
  topicIds: []
})
const isNotFound = ref(false)

/**
 * Изменение содержимого вуджа
 */
const onChangeContent = () => woojStore.updateWooj(wooj.id, {
  title: wooj.title,
  content: wooj.content,
})

/**
 * Изменение привязанных топиков
 */
const onChangeTopics = async (topicsMap) => {
  const { topic_ids } = await woojStore.setWoojTopics(wooj.id, topicsMap)

  wooj.topicIds = topic_ids
}

/**
 * Установить состояние "вудж не найден"
 */
const setNotFound = () => {
  isNotFound.value = true
  layoutStore.setStatusBar({
    title: "Нет вуджа",
    icon: "magnifying-glass"
  })
}

/**
 * Инициализация
 */
const init = () => {
  woojStore.activateWooj(props.woojId)

  if (woojStore.hasActiveWooj) {
    wooj.id = woojStore.activeWooj.id
    wooj.title = woojStore.activeWooj.title
    wooj.content = woojStore.activeWooj.content
    wooj.topicIds = woojStore.activeWooj.topic_ids

    layoutStore.setStatusBar({
      title: wooj.title || "Новый вудж",
      icon: "file-pen"
    })
  }
}

watch(() => props.woojId, init)
watch(() => wooj.title, () => {
  layoutStore.setStatusBar({
    title: wooj.title || "Новый вудж",
    icon: "file-pen"
  })
})

onLoaded(() => {
  init()

  if (!woojStore.hasActiveWooj) {
    setNotFound()
  }
})

onBeforeMount(() => {
  init()
  setRouteListeners()
})

onUnmounted(() => {
  woojStore.deactivateWooj()
  layoutStore.unsetStatusBar()
})
</script>

<template>
  <div class="view-wooj">
    <Empty v-if="isNotFound" title="Вудж не найден" text="Используй поиск" />
    <Wooj
      v-else
      v-model="wooj"
      :key="wooj.id"
      :loaded="woojStore.isLoaded"
      :saving="woojStore.isUpdatingWooj"
      :topics="woojStore.customTopics"
      @changeContent="onChangeContent"
      @changeTopics="onChangeTopics" />
  </div>
</template>

<style lang="scss" scoped>
.view-wooj {
  // height: calc(100% - 40px);
}
</style>
