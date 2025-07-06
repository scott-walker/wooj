<script setup>
import { ref, watch, onMounted, inject } from "vue"
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

  try {
    wooj.value = await woojService.get(props.woojId)
  } catch {
    isNotFound.value = true
  }

  isLoaded.value = true
}

onMounted(init)
watch(() => props.woojId, init)
</script>

<template>
  <div class="view-wooj">
    <Empty v-if="isNotFound" title="Вудж не найден" text="Используй поиск" />
    <Wooj v-else-if="isLoaded" :data="wooj" :isSaving="isSaving" @save="onSave" />
    <div v-else class="skeleton grid is-col-min-1 is-gap-2">
      <div class="cell skeleton-block"></div>
    </div>
  </div>
</template>

<style lang="scss">
.view-wooj {
  height: calc(100% - 40px);
}
</style>
