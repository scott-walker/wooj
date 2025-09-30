<script setup lang="ts">
import { ref, computed, type ComputedRef } from "vue"
import { useRouter } from "vue-router"

import type { Topic } from "@types"

import { useMediaStore } from "@stores/media"

import Modal from "@ui/Modal.vue"
import IconLink from "@ui/IconLink.vue"
import EditableBlock from "@ui/EditableBlock.vue"
import Editor from "@ui/Editor/Editor.vue"
import Skeleton from "@ui/Skeleton.vue"
import TopicTags from "@components/TopicTags.vue"

/**
 * Пропсы для отображения вуджа
 */
interface WoojView {
  id: number
  title: string
  content: string
  topicIds: number[]
}

const wooj = defineModel<WoojView>()
const emit = defineEmits(["change-content", "change-topics"])
const props = defineProps<{
  topics: Topic[]
  loaded: boolean
  saving: boolean
}>()

const router = useRouter()
const mediaStore = useMediaStore()

const isShowedTopics = ref(false)
const hasTopics = computed(() => !!props.topics.length)
const isSmall: ComputedRef<boolean> = computed(() => !!mediaStore.isSmall)

const onBack = () => router.back()
const onShowTopics = () => (isShowedTopics.value = !isShowedTopics.value)
const onSaveTopics = (topicsMap: Record<number, number>) => emit("change-topics", topicsMap)
</script>

<template>
  <div class="wooj" v-if="wooj">
    <div v-if="loaded" class="wooj__board">
      <div v-if="isSmall" class="wooj__actions">
        <IconLink icon="arrow-left" label="Назад" :scalable="false" @click="onBack" />
        <IconLink v-if="hasTopics" icon="tags" label="Топики" :scalable="false" @click="onShowTopics" />
        <!-- <IconLink icon="link" @click="isShowedShare = !isShowedShare" /> -->
      </div>
      <div v-else class="wooj__actions">
        <IconLink icon="arrow-left" @click="onBack" />
        <IconLink v-if="hasTopics" icon="tags" @click="onShowTopics" />
        <!-- <IconLink icon="link" @click="isShowedShare = !isShowedShare" /> -->
      </div>

      <div class="wooj__paper">
        <!-- <span v-show="props.saving" class="wooj__save-status tag">Сохранено</span> -->

        <div class="wooj__title">
          <EditableBlock
            class="wooj__title-field"
            placeholder="Заголовок вуджа"
            v-model="wooj.title"
            :key="wooj.title"
            :max="120"
            @change="emit('change-content', wooj)"
          />
        </div>
        <div class="wooj__content">
          <Editor v-model="wooj.content" @save="emit('change-content', wooj)" />
        </div>
      </div>
    </div>

    <Skeleton v-else type="block-list" :itemsNum="1" class="wooj__skeleton" />

    <Modal v-model="isShowedTopics" title="Топики" :center="isSmall">
      <TopicTags :topics="topics" v-model="wooj.topicIds" @save="onSaveTopics" />
    </Modal>
    <!-- <Modal v-model="isShowedShare" title="Публиковать вуддж">
      Публиковать!!!
    </Modal> -->
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
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
    padding: 40px 20px 80px 20px;
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
    box-shadow: color.change(colors.$basic, $alpha: 3%) 0px 15px 50px 10px;
    width: 100%;
    max-width: 800px;
  }

  // &__save-status {
  //   position: absolute;
  //   top: 20px;
  //   right: 20px;
  //   z-index: 10;
  //   transition: all .5s;
  // }

  &__title {
    position: relative;
    z-index: 11;
    background: colors.$absorbing;
    border-bottom: 2px solid colors.$grey;

    &-field {
      width: 100%;
      padding: 15px !important;
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

  &__skeleton {
    max-width: 800px;
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

@include media.lg() {
  .wooj {
    &__paper {
      padding: 10px;
    }

    &__title {
      &-field {
        padding: 15px !important;
        font-size: 26px;
      }
    }
  }
}

@include media.sm() {
  .wooj {
    &__board {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 10px 0px 80px 0px;
      height: 100%;
    }

    &__actions {
      position: relative;
      flex-direction: row;
      padding: 0px;
      margin-bottom: 10px;
    }

    &__paper {
      padding: 5px;
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
        font-size: 22px;
      }
    }
  }
}
</style>
