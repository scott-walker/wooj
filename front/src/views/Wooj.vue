<script setup>
import { ref, watch, onMounted, onUnmounted, inject } from "vue"
import { useLayoutStore } from "@stores/layout"
import Wooj from "@components/Wooj.vue"
import Empty from "@components/Empty.vue"

const props = defineProps(["woojId"])
const { woojService } = inject("services")
const layoutStore = useLayoutStore()

const wooj = ref({
  title: "",
  content: "",
})
const isLoaded = ref(false)
const isNotFound = ref(false)
const isSaving = ref(false)

/**
 * Сохранение
 */
const onSave = async () => {
  isSaving.value = true

  await woojService.update(wooj.value.id, {
    title: wooj.value.title,
    content: wooj.value.content,
  })
  layoutStore.onDeactivateCreateWooj()

  setTimeout(() => isSaving.value = false, 1000)
}

const init = async () => {
  isLoaded.value = false
  isNotFound.value = false
  layoutStore.setStatusBar({
    title: "Редактирование",
    icon: "file-pen"
  })

  try {
    wooj.value = await woojService.get(props.woojId)
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
onUnmounted(() => layoutStore.unsetStatusBar())

watch(() => props.woojId, init)
</script>

<template>
  <div class="view-wooj">
    <Empty v-if="isNotFound" title="Вудж не найден" text="Используй поиск" />
    <Wooj v-else :loaded="isLoaded" :data="wooj" :isSaving="isSaving" @save="onSave" />
  </div>
</template>

<style lang="scss" scoped>
.view-wooj {
  // height: calc(100% - 40px);
}
</style>
