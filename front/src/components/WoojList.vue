<script setup>
import _ from "lodash"
import { computed } from "vue"
import WoojCard from "@components/WoojCard.vue"

const props = defineProps({
  id: String,
  title: String,
  woojs: Array
})
const title = computed(() => props.title)
const woojs = computed(() => props.woojs)
const woojNums = computed(() => woojs.value ? woojs.value.length : null)
const sliderId = computed(() => `wooj-list-${props.id}`)
const slideItems = computed(() => _.chunk(woojs.value, 3))
const slideNums = computed(() => slideItems.value.length)
</script>

<template>
  <div class="wooj-list">
    <h1 class="title">{{ title }} <span v-if="woojNums" class="tag is-light ml-2">{{ woojNums }}</span></h1>

    <div v-if="woojs" class="wooj-list__board has-background-white-ter">
      <Swiper :id="sliderId" :itemsNum="slideNums">
        <template #item="{ index }">
          <div class="wooj-list__items">
            <div v-for="wooj of slideItems[index]" :key="wooj.id" class="wooj-list__item">
              <WoojCard :data="wooj" />
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
    // max-height: calc(100vh - 300px);
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