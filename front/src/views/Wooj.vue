<script setup lang="ts">
import { ref, reactive, watch, onBeforeMount, onUnmounted } from "vue"
import type { Wooj as WoojType } from "@types"

import { useLayoutStore } from "@stores/layout"
import { useWoojs } from "@composables/woojs"

import Wooj, { type WoojView } from "@components/Wooj.vue"
import Empty from "@components/Empty.vue"

const props = defineProps<{
  woojId: number
}>()
const { woojStore, onLoaded, setRouteListeners } = useWoojs()
const layoutStore = useLayoutStore()

const wooj = ref<WoojView>({
  id: null,
  title: "",
  content: "",
  topicIds: [],
})
const isNotFound = ref<boolean>(false)

/**
 * Изменение содержимого вуджа
 */
const onChangeContent = () => {
  if (!wooj.value.id) return

  woojStore.updateWooj(wooj.value.id, {
    title: wooj.value.title,
    content: wooj.value.content,
  })
}

/**
 * Изменение привязанных топиков
 */
const onChangeTopics = async (topicsMap: Record<number, number>) => {
  if (!wooj.value.id) return

  const { topic_ids } = (await woojStore.setWoojTopics(wooj.value.id, topicsMap)) as WoojType

  wooj.value.topicIds = topic_ids
}

/**
 * Установить состояние "вудж не найден"
 */
const setNotFound = () => {
  isNotFound.value = true
  layoutStore.setStatusBar({
    title: "Нет вуджа",
    icon: "magnifying-glass",
  })
}

/**
 * Инициализация
 */
const init = () => {
  woojStore.activateWooj(props.woojId)

  if (woojStore.hasActiveWooj && woojStore.activeWooj) {
    wooj.value.id = woojStore.activeWooj.id
    wooj.value.title = woojStore.activeWooj.title
    wooj.value.content = woojStore.activeWooj.content
    wooj.value.topicIds = woojStore.activeWooj.topic_ids

    layoutStore.setStatusBar({
      title: wooj.value.title || "Новый вудж",
      icon: "file-pen",
    })
  }
}

watch(() => props.woojId, init)
watch(
  () => wooj.value.title,
  () => {
    layoutStore.setStatusBar({
      title: wooj.value.title || "Новый вудж",
      icon: "file-pen",
    })
  },
)

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
      v-else-if="wooj.id"
      v-model="wooj"
      :key="wooj.id"
      :loaded="woojStore.isLoaded"
      :saving="woojStore.isUpdatingWooj"
      :topics="woojStore.customTopics"
      @changeContent="onChangeContent"
      @changeTopics="onChangeTopics"
    />
  </div>
</template>
