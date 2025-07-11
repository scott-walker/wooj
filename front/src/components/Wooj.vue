<script setup>
import { ref, computed } from "vue"
import Modal from "@ui/Modal.vue"
import IconLink from "@ui/IconLink.vue"
import LightInput from "@ui/LightInput.vue"
import Editor from "@ui/Editor/Editor.vue"
import Skeleton from "@ui/Skeleton.vue"
import Topics from "@components/Topics.vue"
import { useWoojStore } from "@stores/wooj"

const props = defineProps({
  data: Object,
  loaded: { type: Boolean, default: true },
  isSaving: { type: Boolean, default: false },
})
const woojStore = useWoojStore()

const isShowedTopics = ref(false)
const isShowedShare = ref(false)

const wooj = computed(() => props.data)

const onSaveTopics = (map) => {
  console.log(map)
}
</script>

<template>
  <div class="wooj">
    <div v-if="props.loaded" class="wooj__board">
      <div class="wooj__actions">
        <IconLink icon="tags" @click="isShowedTopics = !isShowedTopics" />
        <!-- <IconLink icon="share-from-square" /> -->
        <IconLink icon="link" @click="isShowedShare = !isShowedShare" />
      </div>
      <div class="wooj__paper">
        <span v-show="props.isSaving" class="wooj__save-status tag is-medium">Сохранено</span>

        <div class="wooj__title">
          <LightInput
            v-model="wooj.title"
            :max="60"
            fieldClass="wooj__title-field"
            placeholder="Кликни сюда и напиши заголовок"
            @save="$emit('save', wooj)" />
        </div>
        <div class="wooj__content">
          <Editor v-model="wooj.content" @save="$emit('save', wooj)" />
        </div>
      </div>
    </div>

    <Skeleton v-else type="block-list" :itemsNum="1" class="wooj__skeleton" />

    <Modal v-model="isShowedTopics" title="Топики">
      <Topics :items="woojStore.topics" @save="onSaveTopics" />
    </Modal>
    <Modal v-model="isShowedShare" title="Публиковать вуддж">
      Публиковать!!!
    </Modal>
  </div>
</template>

<style lang="scss">
@use "@styles/colors";

.wooj {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  &__board {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 40px;
    height: 100%;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    gap: 10px;
    position: sticky;
    top: 0;
    left: 0;
    padding-top: 20px;
    padding-right: 20px;
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

  &__title {
    position: sticky;
    top: -30px;
    left: 0;
    z-index: 11;
    background: colors.$absorbing;
    border-bottom: 2px solid colors.$grey;

    // box-shadow: rgba(16, 0, 75, 0.1) 0px 5px 10px 0px;

    &-field {
      padding: 20px !important;
      font-size: 32px;
      font-weight: bold;
      border: none !important;

      &:hover,
      &:focus {
        background: colors.$grey;
        border: none !important;
      }
    }
  }

  &__content {
    // margin-top: 5px;
  }

  &__skeleton {
    max-width: 900px;
  }

  .topics {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 10px;
  }
}
</style>