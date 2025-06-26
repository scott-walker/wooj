<script setup>
import { ref, onMounted, inject } from "vue"
import LightInput from "@ui/LightInput.vue"
import Editor from "@ui/Editor/Index.vue"

const props = defineProps(["woojId"])
const { wooj: woojService } = inject("services")

const wooj = ref(null)
const isSaving = ref(false)

const onSave = async () => {
  isSaving.value = true

  await woojService.update(wooj.value.id, {
    title: wooj.value.title,
    content: wooj.value.content,
  })

  setTimeout(() => isSaving.value = false, 1000)
}

const init = async () => {
  wooj.value = await woojService.get(props.woojId)
}

onMounted(init)
</script>

<template>
  <div class="view-wooj">
    <div class="view-wooj__board has-background-white-ter">
      <div v-if="wooj" class="view-wooj__paper">
        <span v-show="isSaving" class="view-wooj__save-status tag is-medium">Сохранено</span>

        <div class="view-wooj__title">
          <LightInput v-model="wooj.title" :max="60" cssClass="title is-4" placeholder="Кликни сюда и напиши заголовок"
            @save="onSave" />
        </div>
        <div class="view-wooj__content">
          <Editor v-model="wooj.content" @save="onSave" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.view-wooj {
  // height: 100%;
  height: calc(100% - 40px);

  &__board {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 40px;
    height: 100%;
    border-radius: 20px;
    // height: calc(100% - 80px);
  }

  &__paper {
    position: relative;
    padding: 40px 30px;
    border-radius: 20px;
    background: #ffffff;
    box-shadow: rgba(16, 0, 75, 0.1) 0px 5px 15px 0px;
    min-width: 900px;
    // max-width: 900px;
  }

  &__save-status {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 10;
    transition: all .5s;
  }

  &__title {}

  &__content {
    margin-top: 5px;
  }
}
</style>
