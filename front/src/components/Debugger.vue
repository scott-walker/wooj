<script setup>
import { ref, onMounted, reactive } from "vue"
// import { useMediaStore } from "@stores/media"
import { useDebuggerStore } from "@stores/debugger"
import Button from "@ui/Button.vue"

// const mediaStore = useMediaStore()
const debuggerStore = useDebuggerStore()
const isShowed = ref(false)

const onToggle = () => (isShowed.value = !isShowed.value)
const onClear = () => debuggerStore.clear()

// const data = reactive({
//   actions: null,
//   scrollY: null,
//   pageYOffset: null,
//   offsetTop: null,
// })

onMounted(() => {
  const elements = document.querySelectorAll("div")
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const height = entry.contentRect.height

      debuggerStore.push({
        tag: entry.target.tagName,
        id: entry.target.getAttribute("id"),
        class: entry.target.className,
        height,
      })
    }
  })

  elements.forEach(el => !el.className.includes("debugger") && observer.observe(el))
  observer.observe(document.body)

  // let actions = null

  // debuggerStore.push({ test: 1, name: "43234" })

  // setTimeout(() => {
  //   actions = document.querySelector(".wooj__actions")
  // }, 1000)

  // window.addEventListener("scroll", () => {
  //   data.actions = actions ? actions.getBoundingClientRect().top : null
  //   data.scrollY = window.scrollY
  //   data.pageYOffset = window.pageYOffset
  //   data.offsetTop = window.visualViewport.offsetTop
  // }, { passive: true })
})
</script>

<template>
  <!-- <Teleport to="body"> -->
  <div class="debugger" :class="{ showed: isShowed }">
    <div class="debugger__panel">
      <Button
        class="debugger__panel-button"
        type="default"
        text="debug"
        @click="onToggle" />
    </div>

    <div v-show="isShowed" class="debugger__container">
      <!-- <div class="debugger__media">
        <div>{{ data }}</div>
        <div>Width: {{ mediaStore.width }}</div>
        <div>Height: {{ mediaStore.height }}</div>
        <div>Viewport Width: {{ mediaStore.vpWidth }}</div>
        <div>Viewport Height: {{ mediaStore.vpHeight }}</div>
        <div>isTouched: {{ mediaStore.isTouched }}</div>
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
      </div> -->

      <div class="debugger__console" v-if="debuggerStore.records.length">
        <pre class="debugger__console-record" v-for="record of debuggerStore.records">{{ record }}</pre>
      </div>

      <div class="debugger__actions">
        <Button
          class="debugger__actions-button"
          type="default"
          text="clear"
          @click="onClear" />
      </div>
    </div>
  </div>
  <!-- </Teleport> -->
</template>

<style lang="scss" scoped>
.debugger {
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  padding: 10px;

  &.showed {
    background: white;
    border-bottom: 3px solid black;
    width: 100%;
  }

  &__panel {
    width: 100%;
    background: white;

    &-button {
      padding: 5px 10px;
      font-size: 12px;
    }
  }

  &__container {
    margin: 10px;
    font-weight: bold;
  }

  &__console {
    margin-top: 10px;
    padding: 10px;
    overflow: auto;
    max-height: 200px;
    font-size: 12px;
    border: 1px solid black;
  }

  &__actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;

    &-button {
      padding: 5px 10px;
      font-size: 12px;
    }
  }
}
</style>