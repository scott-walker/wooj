<script setup>
import { ref, computed, inject, watch } from 'vue'
import Tag from "@ui/Tag.vue"

const checkedTopicIds = defineModel()
const props = defineProps({
  topics: { type: Array },
})
const emit = defineEmits(["update", "save"])
const deferredTimer = inject("createDeferredTimer")()

const checkedMap = ref(checkedTopicIds.value.reduce((map, id) => {
  map[id] = true

  return map
}, {}))
const normalizedCheckedMap = computed(() => {
  const map = {}

  props.topics.forEach(topic => {
    map[topic.id] = checkedMap.value[topic.id] || false
  })

  return map
})

const onChange = () => {
  emit("update", normalizedCheckedMap.value)

  deferredTimer.start(500, () => emit("save", normalizedCheckedMap.value))
}

watch(checkedMap.value, onChange)
</script>

<template>
  <div class="topic-tags">
    <Tag
      class="topics__item"
      v-for="topic of props.topics"
      icon="tag"
      :text="topic.name"
      :clickable="true"
      v-model="checkedMap[topic.id]" />
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