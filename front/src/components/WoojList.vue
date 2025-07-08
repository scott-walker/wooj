<script setup>
import _ from "lodash"
import { Sortable, Plugins } from "@shopify/draggable"
import { computed, onMounted, onUnmounted } from "vue"
import Tag from "@ui/Tag.vue"
import WoojCard from "@components/WoojCard.vue"
import Empty from "@components/Empty.vue"

const props = defineProps({
  id: String,
  title: String,
  woojs: Array,
  emptyText: { type: String, default: "Тут пусто" },
  hasSort: { type: Boolean, default: true },
  hasPin: { type: Boolean, default: true },
  hasEdit: { type: Boolean, default: true },
  hasRemove: { type: Boolean, default: true },
  hasRestore: { type: Boolean, default: false },
})

let sortable = null

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
const woojs = computed(() => props.woojs || [])
const nums = computed(() => woojs.value.length)
const isEmpty = computed(() => !nums.value)
const woojPositions = computed(() => woojs.value.reduce((map, wooj) => {
  map[wooj.id] = getRandMargin(wooj.id)

  return map
}, {}))

const initSortable = () => {
  console.log("initSortable")

  sortable = new Sortable(document.querySelectorAll('.wooj-list__items'), {
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
}

onMounted(() => props.hasSort && initSortable())
onUnmounted(() => sortable && sortable.destroy())
</script>

<template>
  <div class="wooj-list">
    <div class="wooj-list__header">
      <h1 class="wooj-list__header-title">
        {{ title }}
      </h1>
      <Tag>{{ nums }}</Tag>
      <div class="wooj-list__header-panel">
        <slot name="panel" :isEmpty="isEmpty" />
      </div>
    </div>

    <Empty v-if="isEmpty" :title="props.emptyText" />

    <div v-else-if="woojs" class="wooj-list__board">
      <div class="wooj-list__items" :class="{ sortable: props.hasSort }">
        <div v-for="wooj, i of props.woojs" :key="wooj.id" class="wooj-list__item" :style="woojPositions[wooj.id]">
          <WoojCard
            :data="wooj"
            :hasPin="props.hasPin"
            :hasEdit="props.hasEdit"
            :hasRemove="props.hasRemove"
            :hasRestore="props.hasRestore"
            @pin="$emit('pin', $event)"
            @edit="$emit('edit', $event)"
            @remove="$emit('remove', $event)"
            @restore="$emit('restore', $event)" />
        </div>
      </div>
    </div>

    <div v-else class="skeleton grid is-col-min-10 is-gap-2">
      <div v-for="i of 8" :key="i" class="cell skeleton-block m-0"></div>
    </div>
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