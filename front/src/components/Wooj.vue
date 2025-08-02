<script setup>
import { ref, computed } from "vue"
import { useMediaDetector } from "@hooks/mediaDetector"
import Modal from "@ui/Modal.vue"
import IconLink from "@ui/IconLink.vue"
import LightInput from "@ui/LightInput.vue"
import Editor from "@ui/Editor/Editor.vue"
import Skeleton from "@ui/Skeleton.vue"
import TopicTags from "@components/TopicTags.vue"

const md = useMediaDetector()
const wooj = defineModel()
const emit = defineEmits(["change-content", "change-topics"])
const props = defineProps({
  topics: { type: Array, default: [] },
  loaded: { type: Boolean, default: true },
  saving: { type: Boolean, default: false },
})

const isShowedTopics = ref(false)
const isShowedShare = ref(false)
const hasTopics = computed(() => !!props.topics.length)
const isMobile = computed(() => md.isSm.value)

const onSaveTopics = (topicsMap) => emit("change-topics", topicsMap)
</script>

<template>
  <div class="wooj">
    <div v-if="props.loaded" class="wooj__board">
      <div v-if="isMobile" class="wooj__actions">
        <IconLink v-if="hasTopics" icon="tags" label="Топики" @click="isShowedTopics = !isShowedTopics" />
        <!-- <IconLink icon="link" @click="isShowedShare = !isShowedShare" /> -->
      </div>
      <div v-else class="wooj__actions">
        <IconLink v-if="hasTopics" icon="tags" @click="isShowedTopics = !isShowedTopics" />
        <!-- <IconLink icon="link" @click="isShowedShare = !isShowedShare" /> -->
      </div>

      <div class="wooj__paper">
        <span v-show="props.saving" class="wooj__save-status tag">Сохранено</span>

        <div class="wooj__title">
          <LightInput
            v-model="wooj.title"
            :max="60"
            fieldClass="wooj__title-field"
            placeholder="Кликни сюда и напиши заголовок"
            @save="emit('change-content', wooj)" />
        </div>
        <div class="wooj__content">
          <Editor v-model="wooj.content" @save="emit('change-content', wooj)" />
        </div>
      </div>
    </div>

    <Skeleton v-else type="block-list" :itemsNum="1" class="wooj__skeleton" />

    <Modal v-model="isShowedTopics" title="Топики">
      <TopicTags :topics="topics" v-model="wooj.topicIds" @save="onSaveTopics" />
    </Modal>
    <Modal v-model="isShowedShare" title="Публиковать вуддж">
      Публиковать!!!
    </Modal>
  </div>
</template>

<style lang="scss">
@use "@styles/media";
@use "@styles/colors";

.wooj {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  &__board {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 40px;
    width: 100%;
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
    padding: 20px;
    border-radius: 10px;
    background: colors.$absorbing;
    box-shadow: rgba(16, 0, 75, 0.1) 0px 5px 10px 0px;
    width: 100%;
    // min-width: 900px;
    max-width: 800px;
  }

  &__save-status {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 10;
    transition: all .5s;
  }

  &__title {
    position: relative;
    z-index: 11;
    background: colors.$absorbing;
    border-bottom: 2px solid colors.$grey;

    &-field {
      padding: 20px !important;
      font-size: 28px;
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

@include media.sm() {

  .wooj {
    &__board {
      display: flex;
      flex-direction: column-reverse;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 10px;
      height: 100%;
    }

    &__actions {
      padding: 0px;
      margin-top: 20px;
    }

    &__paper {
      padding: 10px;
      border-radius: 6px;
      min-width: inherit;
      max-width: inherit;
    }

    &__save-status {
      display: none;
    }

    &__title {
      &-field {
        padding: 10px !important;
        font-size: 18px;
      }
    }

    &__content {
      // margin-top: 5px;
    }

    .topics {
      gap: 10px;
    }
  }
}
</style>