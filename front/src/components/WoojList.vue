<script setup>
import _ from "lodash"
import { Sortable, Plugins } from "@shopify/draggable"
import { useTemplateRef, computed, onMounted, onUnmounted, watch, nextTick } from "vue"
import Tag from "@ui/Tag.vue"
import Skeleton from "@ui/Skeleton.vue"
import WoojCard from "@components/WoojCard.vue"
import Empty from "@components/Empty.vue"

let sortableDriver = null

const props = defineProps({
  id: String,
  title: String,
  woojs: Array,
  emptyText: { type: String, default: "Тут пусто" },
  loaded: { type: Boolean, default: true },
  hasSort: { type: Boolean, default: true },
  hasPin: { type: Boolean, default: true },
  hasEdit: { type: Boolean, default: true },
  hasRemove: { type: Boolean, default: true },
  hasRestore: { type: Boolean, default: false },
})

const items = useTemplateRef("items")
const emit = defineEmits(["sort", "pin", "edit", "remove", "restore"])

const getRandMargin = (i) => {
  return {}
  // const FACTOR = 5;

  // const vector = i % 2 === 0 ? -1 : 1;
  // const top = _.random(0, FACTOR) * vector
  // const left = _.random(0, FACTOR) * vector

  // return {
  //   top: `${top}px`,
  //   left: `${left}px`,
  // }
}

const title = computed(() => props.title)
const woojs = computed(() => props.woojs)
const nums = computed(() => woojs.value.length)
const isEmpty = computed(() => props.loaded && !nums.value)
const woojPositions = computed(() => woojs.value.reduce((map, wooj) => {
  map[wooj.id] = getRandMargin(wooj.id)

  return map
}, {}))

const initSortable = () => {
  sortableDriver = new Sortable(document.querySelectorAll('.wooj-list__items'), {
    draggable: '.wooj-list__item',
    handle: '.wooj-card__wrapper',
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
    nextTick(() => {
      const elements = Array.from(items.value.querySelectorAll('.wooj-list__item'))
      const positions = elements.map(item => parseInt(item.dataset.id))

      emit("sort", positions)
    })
  })
}

watch(() => props.loaded, (value) => nextTick(() => {
  value && props.hasSort && initSortable()
}))

onMounted(() => props.hasSort && props.loaded && initSortable())
onUnmounted(() => sortableDriver && sortableDriver.destroy())
</script>

<template>
  <div class="wooj-list">
    <div class="wooj-list__header">
      <h1 class="wooj-list__header-title">
        {{ title }}
      </h1>
      <Tag v-if="nums">{{ nums }}</Tag>
      <div class="wooj-list__header-panel">
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
  </div>
</template>

<style lang="scss" scoped>
.wooj-list {
  &__header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;

    &-title {
      display: flex;
      align-items: center;
      font-size: 32px;
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
    border-color: hsla(232, 31%, 85%, 0.6);
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
        cursor: grab;

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
</style>