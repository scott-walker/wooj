<script setup>
import { ref, reactive, watch, onMounted, onUnmounted, inject } from "vue"
import { useLayoutStore } from "@stores/layout"
import Wooj from "@components/Wooj.vue"
import Empty from "@components/Empty.vue"

const props = defineProps(["woojId"])
const { woojService } = inject("services")
const layoutStore = useLayoutStore()

const wooj = reactive({
  id: null,
  title: "",
  content: "",
  topicIds: []
})
const isLoaded = ref(false)
const isNotFound = ref(false)
const isSaving = ref(false)

/**
 * Сохранение
 */
const onSave = async () => {
  isSaving.value = true

  await woojService.update(wooj.id, {
    title: wooj.title,
    content: wooj.content,
  })

  setTimeout(() => isSaving.value = false, 1000)
}

/**
 * Изменение привязанных топиков
 */
const onChangeTopics = async (topicsMap) => {
  isSaving.value = true

  const { topic_ids } = await woojService.setTopics(wooj.id, topicsMap)

  wooj.topicIds = topic_ids

  setTimeout(() => isSaving.value = false, 1000)
}

const init = async () => {
  isLoaded.value = false
  isNotFound.value = false

  try {
    const { id, title, content, topic_ids } = await woojService.get(props.woojId)

    wooj.id = id
    wooj.title = title
    wooj.content = content
    wooj.topicIds = topic_ids
  } catch {
    isNotFound.value = true
    layoutStore.setStatusBar({
      title: "Нет вуджа",
      icon: "magnifying-glass"
    })
  }

  isLoaded.value = true
}

onMounted(init)
onUnmounted(() => {
  layoutStore.onDeactivateCreateWooj()
  layoutStore.unsetStatusBar()
})

watch(() => props.woojId, init)
watch(() => wooj.title, () => {
  layoutStore.setStatusBar({
    title: wooj.title,
    icon: "file-pen"
  })
})
</script>

<template>
  <div class="view-wooj">
    <Empty v-if="isNotFound" title="Вудж не найден" text="Используй поиск" />
    <Wooj
      v-else
      :loaded="isLoaded"
      v-model="wooj"
      :isSaving="isSaving"
      @save="onSave"
      @changeTopics="onChangeTopics" />
  </div>
</template>

<style lang="scss" scoped>
.view-wooj {
  // height: calc(100% - 40px);
}
</style>
