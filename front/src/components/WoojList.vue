<script setup>
import _ from "lodash"
import { computed } from "vue"
import WoojCard from "@components/WoojCard.vue"

const props = defineProps({
  id: String,
  title: String,
  woojs: Array,
  emptyText: { type: String, default: "Тут пусто" },
  hasLike: { type: Boolean, default: true },
  hasEdit: { type: Boolean, default: true },
  hasRemove: { type: Boolean, default: true },
  hasRestore: { type: Boolean, default: false },
})

const ITEMS_PER_SLIDE = 3

const title = computed(() => props.title)
const nums = computed(() => props.woojs ? props.woojs.length : 0)
const isEmpty = computed(() => props.woojs instanceof Array && !props.woojs.length)

const sliderId = computed(() => `wooj-list-${props.id}`)
const slideItems = computed(() => _.chunk(props.woojs, ITEMS_PER_SLIDE))
const slideNums = computed(() => slideItems.value.length)
</script>

<template>
  <div class="wooj-list">
    <div class="wooj-list__header">
      <h1 class="title mb-0">{{ title }} <span class="tag is-light ml-2">{{ nums }}</span></h1>
      <div class="wooj-list__header-panel">
        <slot name="panel" :isEmpty="isEmpty" />
      </div>
    </div>

    <div v-if="isEmpty" class="wooj-list__empty has-background-white-ter">
      <div class="has-text-centered">
        <p class="title has-text-grey-light">{{ props.emptyText }}</p>
        <p class="subtitle has-text-grey-light">Вуджей же нет</p>
      </div>
    </div>

    <div v-else-if="woojs" class="wooj-list__board has-background-white-ter">
      <Swiper :id="sliderId" :itemsNum="slideNums">
        <template #item="{ index }">
          <div class="wooj-list__items">
            <div v-for="wooj of slideItems[index]" :key="wooj.id" class="wooj-list__item">
              <WoojCard
                :data="wooj"
                :hasLike="props.hasLike"
                :hasEdit="props.hasEdit"
                :hasRemove="props.hasRemove"
                :hasRestore="props.hasRestore"
                @like="$emit('like', $event)"
                @edit="$emit('edit', $event)"
                @remove="$emit('remove', $event)"
                @restore="$emit('restore', $event)" />
            </div>
          </div>
        </template>
      </Swiper>
    </div>

    <div v-else class="skeleton grid is-col-min-10 is-gap-2">
      <div v-for="i of 8" :key="i" class="cell skeleton-block m-0"></div>
    </div>
  </div>
</template>

<style lang="scss">
.wooj-list {
  &__header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 40px;
    margin-bottom: 20px;
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

    &:hover {
      border-color: hsla(232, 31%, 85%, 0.6);
    }
  }

  &__items {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: stretch;
    min-height: calc(100vh - 320px);
    max-height: calc(100vh - 200px);
  }

  &__item {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-top: 10px;
    margin-bottom: 20px;
    margin-right: 10px;

    &:last-child {
      flex-grow: 0;
    }
  }
}
</style>