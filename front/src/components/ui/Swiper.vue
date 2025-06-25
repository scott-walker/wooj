<script setup>
import { onMounted } from "vue"

const props = defineProps({
  id: String,
  itemsNum: Number,
  options: { type: Object, default: null }
})

const init = () => {
  const options = props.options || {}
  const swiper = document.querySelector(`#${props.id}`)

  Object.assign(swiper, {
    slidesPerView: 4,
    spaceBetween: 10,
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
        width: 15px;
        height: 15px;
        opacity: 1;
        background: rgba(0, 0, 0, 0.1);
        border: 2px solid transparent;
        transition: all .3s;
      }
      .swiper-pagination-bullet:hover {
        border-color: #2942ff;
      }
      .swiper-pagination-bullet-active {
        background: #2942ff;
      }
    `],
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      820: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 3,
      },
      1600: {
        slidesPerView: 4,
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
          <slot name="item" :index="i"></slot>
        </div>
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<style lang="scss">
.ui-swiper {
  &__items {}

  &__item {
    &-content {
      padding: 5px;
    }
  }
}
</style>
