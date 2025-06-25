<script setup>
import _ from "lodash"
import { computed } from "vue"

const props = defineProps({
  id: String,
  title: String,
  woojs: Array
})
const title = computed(() => props.title)
const woojs = computed(() => props.woojs)
const sliderId = computed(() => `wooj-list-${props.id}`)
const slideItems = computed(() => _.chunk(woojs.value, 3))
const slideNums = computed(() => slideItems.value.length - 1)
</script>

<template>
  <div class="wooj-list">
    <h1 class="title">{{ title }}</h1>

    <!-- <div v-if="woojs.length" class="grid is-col-min-10 is-gap-0">
      <div v-for="wooj of woojs" :key="wooj.id" class="cell pr-4 pt-2 pb-2 pl-0">
        <div class="box">
          <p class="title is-4">{{ wooj.title }}</p>
          <p class="content">{{ wooj.content }}</p>
        </div>
      </div>
    </div> -->
    <!-- <div v-if="woojs.length" class="wooj-list__items">
      <div v-for="wooj of woojs" :key="wooj.id" class="wooj-list__item">
        <div class="wooj-list__item-card box">
          <p class="title is-4">{{ wooj.title }}</p>
          <p class="content">{{ wooj.content }}</p>
        </div>
      </div>
    </div>
    <div v-else class="skeleton grid is-col-min-10 is-gap-2">
      <div v-for="i of 8" :key="i" class="cell skeleton-block m-0"></div>
    </div> -->

    <div class="wooj-list__board has-background-white-bis">
      <Swiper v-if="woojs.length" :id="sliderId" :itemsNum="slideNums">
        <template #item="{ index }">
          <div class="wooj-list__items">
            <div v-for="wooj of slideItems[index]" :key="wooj.id" class="wooj-list__item">
              <div class="wooj-list__item-card">
                <p class="title is-4 mb-3">{{ wooj.title }}</p>
                <p class="content">{{ wooj.content }}</p>
              </div>
            </div>
          </div>
        </template>
      </Swiper>
      <div v-else class="skeleton grid is-col-min-10 is-gap-2">
        <div v-for="i of 8" :key="i" class="cell skeleton-block m-0"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.wooj-list {
  &__board {
    padding: 20px;
    border: 2px solid transparent;
    border-radius: 10px;
    transition: all .5s;

    &:hover {
      border-color: hsl(232, 31%, 85%);
    }
  }

  &__items {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    // min-height: calc(100vh - 350px);
    max-height: calc(100vh - 350px);
  }

  &__item {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    // flex-wrap: wrap;
    margin-bottom: 25px;
    margin-right: 10px;

    &-card {
      padding: 25px 30px;
      background: #ffffff;
      // background: #ffea002a;
      // border: 1px solid #f1ebaa;
      box-shadow: rgba(16, 0, 75, 0.05) 0px 10px 10px 2px;
      border-radius: 10px;
      flex-grow: 1;
      min-width: 250px;
      max-width: 350px;

      .content {
        // min-height: 75px;
        max-height: 75px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>