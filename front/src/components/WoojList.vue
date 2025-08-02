<script setup>
import _ from "lodash"
import { Sortable, Plugins } from "@shopify/draggable"
import { ref, useTemplateRef, computed, onMounted, onUnmounted, watch, nextTick } from "vue"
import { useMediaDetector } from "@hooks/mediaDetector"

import Tag from "@ui/Tag.vue"
import IconLink from "@ui/IconLink.vue"
import Skeleton from "@ui/Skeleton.vue"
import EditableBlock from "@ui/EditableBlock.vue"
import Dialog from "@ui/Dialog.vue"
import WoojCard from "@components/WoojCard.vue"
import Empty from "@components/Empty.vue"

let sortableDriver = null

const props = defineProps({
  id: String,
  title: String,
  woojs: Array,
  emptyText: { type: String, default: "Тут пусто" },
  loaded: { type: Boolean, default: true },
  hasEditableTopic: { type: Boolean, default: false },
  hasSort: { type: Boolean, default: true },
  hasMove: { type: Boolean, default: true },
  hasPin: { type: Boolean, default: true },
  hasEdit: { type: Boolean, default: true },
  hasRemove: { type: Boolean, default: true },
  hasRestore: { type: Boolean, default: false },
})

const md = useMediaDetector()
const items = useTemplateRef("items")
const emit = defineEmits([
  "sort",
  "pin",
  "edit",
  "remove",
  "restore",
  "update-topic",
  "delete-topic"
])

const getRandMargin = (i) => {
  if (!md.isSm.value) {
    return null
  }

  const BODY_PADDING = 30

  return {
    "max-width": md.width.value / 2 - BODY_PADDING + "px"
  }

  const FACTOR = 7;

  const vector = i % 2 === 0 ? -1 : 1;
  const top = _.random(0, FACTOR) * vector
  const left = _.random(0, FACTOR) * vector

  return {
    top: `${top}px`,
    left: `${left}px`,
  }
}

const changedTitle = ref(props.title)
const isTitleFocused = ref(false)
const isShowedDeleteDialog = ref(false)
const positions = ref([])

const title = computed(() => props.title)
const woojs = computed(() => props.woojs)
const nums = computed(() => woojs.value.length)
const isEmpty = computed(() => props.loaded && !nums.value)
const woojPositions = computed(() => woojs.value.reduce((map, wooj) => {
  map[wooj.id] = getRandMargin(wooj.id)

  return map
}, {}))

const onUpdateTitle = () => {
  if (_.isEqual(changedTitle.value, title.value)) {
    return
  }

  emit("update-topic", { name: changedTitle.value })
}
const onDeleteTopic = () => emit("delete-topic")
const onEdit = () => (isTitleFocused.value = true)
const onDelete = () => (isShowedDeleteDialog.value = true)


const initSortable = () => {
  const getPositions = () => {
    const elements = items.value ? Array.from(items.value.querySelectorAll('.wooj-list__item')) : []

    return elements.map(item => parseInt(item.dataset.id))
  }

  sortableDriver = new Sortable(document.querySelectorAll('.wooj-list__items'), {
    draggable: '.wooj-list__item',
    handle: '.wooj-card__mover',
    sortAnimation: {
      duration: 300,
      easingFunction: 'ease-in-out',
    },
    classes: {
      'source:dragging': ['dragging'],
      'mirror': ['dragging-mirror'],
    },
    plugins: [Plugins.SortAnimation]
  });

  sortableDriver.on('sortable:stop', () => {
    nextTick(() => positions.value = getPositions())
  })

  positions.value = getPositions()
}

watch(() => props.loaded, (value) => nextTick(() => {
  value && props.hasSort && initSortable()
}))
watch(() => props.title, (title) => (changedTitle.value = title))
watch(() => positions.value, (currentPositions, prevPositions) => {
  if (!props.hasSort || !prevPositions.length || _.isEqual(currentPositions, prevPositions)) {
    return
  }

  emit("sort", currentPositions)
})

onMounted(() => props.hasSort && props.loaded && initSortable())
onUnmounted(() => sortableDriver && sortableDriver.destroy())
</script>

<template>
  <div class="wooj-list">
    <div class="wooj-list__header">
      <EditableBlock
        ref="topicTitle"
        class="wooj-list__header-title"
        :key="changedTitle"
        v-model="changedTitle"
        v-model:focused="isTitleFocused"
        :locked="!hasEditableTopic"
        :max="20"
        @blur="onUpdateTitle" />

      <Tag v-if="nums">{{ nums }}</Tag>

      <div class="wooj-list__header-panel">
        <div v-if="hasEditableTopic" class="wooj-list__header-panel-edit">
          <IconLink icon="pencil" @click="onEdit" />
          <IconLink icon="xmark" type="danger" @click="onDelete" />
        </div>

        <slot name="panel" :isEmpty="isEmpty" />
      </div>
    </div>

    <Empty v-if="isEmpty" :title="props.emptyText" />

    <template v-else-if="loaded">
      <div class="wooj-list__board">
        <div class="wooj-list__items" :class="{ sortable: props.hasSort }" ref="items">
          <div
            class="wooj-list__item"
            v-for="wooj of woojs"
            :key="wooj.id"
            :data-id="wooj.id"
            :style="woojPositions[wooj.id]">
            <WoojCard
              :data="wooj"
              :hasMove="props.hasMove"
              :hasPin="props.hasPin"
              :hasEdit="props.hasEdit"
              :hasRemove="props.hasRemove"
              :hasRestore="props.hasRestore"
              @pin="emit('pin', $event)"
              @edit="emit('edit', $event)"
              @remove="emit('remove', $event)"
              @restore="emit('restore', $event)" />
          </div>
        </div>
      </div>
    </template>

    <Skeleton v-else type="blocks" :itemsNum="8" />

    <Dialog v-model="isShowedDeleteDialog" title="Удалить топик" type="danger" @approve="onDeleteTopic">
      Ты действительно хочешь сделать это?
    </Dialog>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "@styles/common";
@use "@styles/media";
@use "@styles/colors";

.wooj-list {
  &__header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 30px;
    margin-bottom: 20px;

    &-title {
      display: flex;
      align-items: center;
      padding: 5px 0;
      min-width: 100px;
      border: none;
      border-bottom: 3px solid transparent;
      font-size: 32px;
      transition: all .3s;
      background: none;
      color: colors.$basic;

      &.editable {

        &:focus,
        &:hover {
          outline: none;
          border-top: none;
          border-right: none;
          border-left: none;
          border-color: color.change(colors.$grey, $lightness: 80%);
        }
      }
    }

    &-panel {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 10px;

      &-edit {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        @include common.card();
        padding: 7px;
        border-radius: 7px;
        background-color: colors.$absorbing;
      }
    }
  }

  &__empty {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 200px);
    border-radius: 20px;
  }

  &__board {
    padding: 20px;
    border: 2px solid transparent;
    border-radius: 20px;
    transition: all .5s;
    border-color: color.change(colors.$grey, $lightness: 90%);
  }

  &__items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;

    &.sortable {
      .wooj-list__item {
        // cursor: grab;

        &.dragging {
          opacity: .5;
          cursor: grabbing;

          // &-mirror {

          // }
        }
      }
    }
  }

  &__item {
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 400px;
    user-select: none;

    &:last-child {
      flex-grow: 0;
    }
  }
}

@include media.sm() {
  .wooj-list {
    &__header {
      gap: 20px;
      margin-bottom: 20px;

      &-title {
        padding: 0;
        font-size: 22px;
      }

      &-panel {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;

        &-edit {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 10px;
          @include common.card();
          padding: 7px;
          border-radius: 7px;
          background-color: colors.$absorbing;
        }
      }
    }

    &__board {
      padding: 0;
      border: none;
    }

    &__items {
      gap: 10px;
    }

    &__item {
      flex-grow: 1;

      min-width: inherit;
      max-width: inherit;

      overflow: hidden;

      // min-width: 40px;
      // max-width: 210px;
    }
  }
}
</style>