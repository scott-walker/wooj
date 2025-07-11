<script setup>
import { computed } from "vue"
import LightInput from "@ui/LightInput.vue"
import Editor from "@ui/Editor/Editor.vue"
import Skeleton from "@ui/Skeleton.vue"

const props = defineProps({
  data: Object,
  loaded: { type: Boolean, default: true },
  isSaving: { type: Boolean, default: false },
})

const wooj = computed(() => props.data)
</script>

<template>
  <div class="wooj">
    <div class="wooj__board">
      <div v-if="props.loaded" class="wooj__paper">
        <span v-show="props.isSaving" class="wooj__save-status tag is-medium">Сохранено</span>

        <div class="wooj__title">
          <LightInput
            v-model="wooj.title"
            :max="60"
            fieldClass="title is-4"
            placeholder="Кликни сюда и напиши заголовок"
            @save="$emit('save', wooj)" />
        </div>
        <div class="wooj__content">
          <Editor v-model="wooj.content" @save="$emit('save', wooj)" />
        </div>
      </div>

      <Skeleton v-else type="block-list" :itemsNum="1" class="wooj__skeleton" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@styles/colors";

.wooj {
  height: 100%;

  &__board {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 40px;
    height: 100%;
  }

  &__paper {
    position: relative;
    padding: 40px 30px;
    border-radius: 10px;
    background: colors.$absorbing;
    box-shadow: rgba(16, 0, 75, 0.1) 0px 5px 10px 0px;
    min-width: 900px;
    max-width: 900px;
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

  &__skeleton {
    max-width: 900px;
  }
}
</style>