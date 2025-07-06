<script setup>
import { onMounted } from "vue"

const props = defineProps({
  id: String,
  itemsNum: Number,
  options: { type: Object, default: null }
})

const COLOR_PRIMARY = "#d4ff38"
const COLOR_BG = "#d5dce5"

const init = () => {
  const options = props.options || {}
  const swiper = document.querySelector(`#${props.id}`)

  Object.assign(swiper, {
    slidesPerView: 1,
    // grid: {
    //   rows: 2,
    // },
    spaceBetween: 10,
    grabCursor: true,
    pagination: {
      clickable: true,
      // renderBullet: function (index, className) {
      //   return `<span class="${className}">${index + 1}</span>`;
      // },
    },
    injectStyles: [`
      .swiper-pagination {
        position: relative;
        margin-top: 40px;
      }
      .swiper-pagination-bullet {
        width: 12px;
        height: 12px;
        opacity: 1;
        background: ${COLOR_BG};
        border: 5px solid transparent;
        transition: all .3s;
      }
      .swiper-pagination-bullet:hover {
        border-color: ${COLOR_PRIMARY};
      }
      .swiper-pagination-bullet-active {
        background: ${COLOR_PRIMARY};
      }
    `],
    breakpoints: {
      940: {
        slidesPerView: 2,
      },
      1330: {
        slidesPerView: 3,
      },
      1690: {
        slidesPerView: 4,
      },
      2500: {
        slidesPerView: 5,
      },
      3000: {
        slidesPerView: 6,
      },
    },
    ...options,
    on: {
      init() {
        // ...
      },
    },
  })

  swiper.initialize()
}

onMounted(init)
</script>

<template>
  <div class="ui-swiper">
    <swiper-container :id="id" class="ui-swiper__items" init="false">
      <swiper-slide v-for="i of props.itemsNum" :key="i" class="ui-swiper__item">
        <div class="ui-swiper__item-content">
          <slot name="item" :index="i - 1"></slot>
        </div>
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<style lang="scss">
@use "@styles/colors";

.ui-swiper {
  &__items {}

  &__item {
    &-content {
      // background: rgba(16, 0, 75, 0.1);
      // padding: 5px;
    }
  }
}
</style>
