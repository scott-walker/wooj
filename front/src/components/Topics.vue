<script setup>
import { ref, inject, watch } from 'vue'
import Tag from "@ui/Tag.vue"

const props = defineProps({
  items: { type: Array },
})
const emit = defineEmits(["update", "save"])
const deferredTimer = inject("createDeferredTimer")()
const checkedTopics = ref({})

const onChange = () => {
  emit("update", checkedTopics.value)

  deferredTimer.start(1000, () => emit("save", checkedTopics.value))
}

watch(checkedTopics.value, onChange)
</script>

<template>
  <div class="topics">
    <Tag
      class="topics__item"
      v-for="topic of props.items"
      icon="tag"
      :text="topic.name"
      :clickable="true"
      v-model="checkedTopics[topic.id]" />
  </div>
</template>

<style lang="scss" scoped>
@use "@styles/colors";

.ui-light-input {
  &__field {
    padding: 10px 20px;
    box-shadow: none !important;
    outline: none;
    border: none;
    border-bottom: 2px solid transparent;
    // border-radius: 10px;
    transition: all .2s;
    width: 100%;
    color: colors.$basic;

    &::placeholder {
      color: #adb5bd;
      font-style: italic;
    }

    &:hover,
    &:focus {
      border-color: rgba(16, 0, 75, 0.05);
    }
  }
}
</style>