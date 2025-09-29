<script setup lang="ts">
import { ref, computed, inject, watch } from "vue"
import Tag from "@ui/Tag.vue"
import type { Topic, DeferredTimer, Services } from "@types"

const checkedTopicIds = defineModel<number[]>({ default: () => [] })
const props = defineProps<{
  topics: Topic[]
}>()
const emit = defineEmits(["update", "save"])
const deferredTimer = inject<DeferredTimer>("createDeferredTimer")!

const checkedMap = ref<Record<number, boolean>>(
  (checkedTopicIds.value || []).reduce((map: Record<number, boolean>, id: number): Record<number, boolean> => {
    map[id] = true

    return map
  }, {}),
)
const normalizedCheckedMap = computed(() => {
  const map: Record<number, boolean> = {}

  props.topics.forEach((topic: Topic) => {
    map[topic.id] = checkedMap.value[topic.id] || false
  })

  return map
})

/**
 * Изменить выбранные топики
 */
const onChange = () => {
  emit("update", normalizedCheckedMap.value)

  deferredTimer.start(500, () => emit("save", normalizedCheckedMap.value))
}

/**
 * Следить за изменением выбранных топиков
 */
watch(checkedMap.value, onChange)
</script>

<template>
  <div class="topic-tags">
    <Tag
      class="topics__item"
      v-for="topic of topics"
      icon="tag"
      :text="topic.name"
      :clickable="true"
      v-model="checkedMap[topic.id]"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "@styles/colors";

.topic-tags {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
}
</style>
