<script setup>
import { Sortable, Plugins } from "@shopify/draggable"
import { ref, inject, onMounted, onUnmounted } from "vue"
import { useLayoutStore } from "@stores/layout"
const { userService } = inject("services")
const layoutStore = useLayoutStore()

const version = ref("0.0")
const target = ref(null)

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

onMounted(async () => {
  layoutStore.setStatusBar({ title: "Дашборд", icon: "gauge" })

  initDnd()
})
onUnmounted(() => layoutStore.unsetStatusBar())

</script>

<template>
  <div class="view-index">
    <p class="view-index__title">WOOJ v{{ version }}</p>
    <p class="view-index__subtitle">Создавай быстро простые заметки</p>

    <div class="dnd-container">
      <div class="dnd-target" v-for="i in 5"
        :style="{ height: `${(i + 10) * i}px` }"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.view-index {
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
}
</style>