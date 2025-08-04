<script setup>
import _ from "lodash"
import { Sortable, Plugins } from "@shopify/draggable"
import { onMounted, onUnmounted } from "vue"

import { useLayoutStore } from "@stores/layout"
import { useMediaStore } from "@stores/media"
import { useToastsStore } from "@stores/toasts"

import Button from "@ui/Button.vue"

const layoutStore = useLayoutStore()
const mediaStore = useMediaStore()
const toastsStore = useToastsStore()

const initDnd = () => {
  const sortable = new Sortable(document.querySelector('.dnd-container'), {
    draggable: '.dnd-target',
    sortAnimation: {
      duration: 200,
      easingFunction: 'ease-in-out',
    },
    classes: {
      'container:dragging': ['dragging'],
      'source:dragging': ['dragging'],
      'mirror': ['dragging-mirror'],
      // 'container:placed': ['placed'],
      'source:placed': ['placed'],
      // 'draggable:over': ['placed'],
    },
    plugins: [Plugins.SortAnimation]
  });

  // The type of the first argument is SortableEventNames
  sortable.on('sortable:sort', (evt) => {
    // The type of evt is SortableSortEvent
  })

  // The type of the first argument is SortableEventNames
  sortable.on('drag:out:container', (evt) => {
    // The type of evt is DragOutContainerEvent
  })
}

const onAddToast = () => {
  const i = _.random(0, 2)
  const j = _.random(0, 2)
  const k = _.random(0, 2)

  const messages = ['Новое уведомление', 'Новое уведомление Новое уведомление', 'Новое уведомление Новое уведомление Новое уведомление']
  const types = ['info', 'success', 'alert']
  const durations = [3, 4, 5]

  toastsStore.add({
    message: messages[j],
    type: types[i],
    duration: durations[k]
  })
}

onMounted(async () => {
  layoutStore.setStatusBar({ title: "DEBUG", icon: "gauge" })

  initDnd()
})
onUnmounted(() => layoutStore.unsetStatusBar())
</script>

<template>
  <div class="view-index">
    <!-- <p class="view-index__title">WOOJ v{{ version }}</p>
    <p class="view-index__subtitle">Создавай быстро простые заметки</p> -->

    <div class="box">
      <Button text="Вызвать тост" @click="onAddToast" />
    </div>
    <!-- 
    <div class="box">
      <p contenteditable="true">Выдели этот текст на мобильном, и появится панель!</p>
      <BoublePanel />
    </div> -->

    <div class="dnd-container">
      <div class="dnd-target" v-for="i in 5"
        :style="{ height: `${(i + 10) * i}px` }"></div>
    </div>

    <div class="media-detector">
      <div>Width: {{ mediaStore.width }}</div>
      <div>Height: {{ mediaStore.height }}</div>
      <div>Viewport Width: {{ mediaStore.vpWidth }}</div>
      <div>Viewport Height: {{ mediaStore.vpHeight }}</div>
      <div>isPortrait: {{ mediaStore.isPortrait }}</div>
      <div>isLandscape: {{ mediaStore.isLandscape }}</div>
      <div>isMobile: {{ mediaStore.isMobile }}</div>
      <div>isTablet: {{ mediaStore.isTablet }}</div>
      <div>isDesctop: {{ mediaStore.isDesctop }}</div>
      <div>isXs: {{ mediaStore.isXs }}</div>
      <div>isSmall: {{ mediaStore.isSmall }}</div>
      <div>isMiddle: {{ mediaStore.isMiddle }}</div>
      <div>isLarge: {{ mediaStore.isLarge }}</div>
      <div>isXl: {{ mediaStore.isXl }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.view-index {
  .box {
    margin-bottom: 20px;
  }

  &__title {
    font-size: 38px;
    font-weight: bold;
  }

  .dnd-container {
    width: 500px;
    height: 500px;
    border: 1px solid crimson;
  }

  .dnd-target {
    width: 50px;
    height: 50px;
    margin: 5px;
    background: greenyellow;
    // margin: 5px;

    &.dragging {
      opacity: .5;

      &-mirror {
        background: yellow;
        opacity: .5;
      }
    }
  }

  .placed {
    transition: all .2s;
    outline: 2px solid crimson;
  }

  .media-detector {
    margin-top: 20px;
    padding: 20px;
    outline: 2px solid crimson;
    font-weight: bold;
  }
}
</style>