<script setup>
import { ref, onMounted } from "vue"
import { useWoojStore } from "@stores/wooj"
import LightInput from "@ui/LightInput.vue"
import Editor from "@ui/Editor/Index.vue"

const props = defineProps(["woojId"])

const store = useWoojStore()
const wooj = ref(null)

async function init() {
  wooj.value = await store.get(props.woojId)
}

onMounted(init)
</script>

<template>
  <div class="view-wooj">
    <div v-if="wooj" class="view-wooj__paper">
      <div class="view-wooj__title">
        <LightInput v-model="wooj.title" cssClass="title is-4" placeholder="Кликни сюда и напиши заголовок" />
      </div>
      <div class="view-wooj__content">
        <Editor v-model="wooj.content" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.view-wooj {
  &__paper {
    padding: 40px 30px;
    border-radius: 20px;
    background: #ffffff;
    box-shadow: rgba(16, 0, 75, 0.1) 0px 5px 15px 0px;
    max-width: 900px;
  }

  &__title {}

  &__content {
    margin-top: 5px;
  }
}
</style>
