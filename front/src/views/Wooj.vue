<script setup>
import { ref, computed, onMounted, onBeforeMount, onBeforeUpdate, onBeforeUnmount } from "vue"
import { useWoojStore } from "@stores/wooj"
import Editor from "@ui/Editor/Index.vue"

const props = defineProps(["woojId"])

const store = useWoojStore()
const wooj = computed(() => store.activeWooj)
const content = ref("")

function init() {
  store.activateWooj(props.woojId)
}

onMounted(init)
// onBeforeUpdate(init)
// onBeforeUnmount(() => editor.destroy())
</script>

<template>
  <div v-if="wooj" class="view-wooj">
    <h1 class="view-wooj__title title">{{ wooj.title }}</h1>
    <div class="view-wooj__content content">
      <Editor />
    </div>
  </div>
</template>

<style lang="scss">
.view-wooj {
  &__title {}

  &__content {
    padding: 25px 30px;
    background: #ffffff;
    box-shadow: rgba(16, 0, 75, 0.05) 0px 2px 20px 0px;
    border-radius: 10px;
    transition: all .3s;
  }
}
</style>
