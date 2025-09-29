<script setup lang="ts">
import _ from "lodash"
import { ref, useTemplateRef, watch } from "vue"

const props = defineProps({
  placeholder: { type: String, default: "" },
  min: { type: Number, default: 2 },
  max: { type: Number, default: 255 },
  locked: { type: Boolean, default: false },
})

const text = defineModel()
const focused = defineModel("focused")
const emit = defineEmits(["change"])
const block = useTemplateRef("block")
const isError = ref(false)
const isShowedPlaceholder = ref(!text.value)

/**
 * Постаивть курсор в конец поля
 * @param element
 */
const setEndOfContent = (element: HTMLElement) => {
  const range = document.createRange()
  const selection = window.getSelection()

  range.selectNodeContents(element)
  range.collapse(false)

  selection?.removeAllRanges()
  selection?.addRange(range)
}

/**
 * Обработчик изменения текста
 */
const onInput = (event: Event) => {
  const target = event.target as HTMLElement
  const length = target.innerText.trim().length

  if (length > props.max) {
    target.innerText = target.innerText.substring(0, props.max)

    setEndOfContent(block.value as HTMLElement)
  }

  isShowedPlaceholder.value = !length
}

/**
 * Обработчик нажатия Enter
 */
const onEnter = (event: KeyboardEvent | FocusEvent) => {
  const target = event.target as HTMLElement
  const length = target.innerText.length

  if (_.isEqual(text.value, target.innerText)) {
    return
  }

  if (length < props.min || length > props.max) {
    isError.value = true
    return
  }

  text.value = target.innerText.replace(/<\/?[^>]+(>|$)/g, "")
  focused.value = false

  emit("change", text.value)
}

/**
 * Обработчик фокуса
 */
const onFocus = () => {
  focused.value = true
  isError.value = false
}

watch(
  () => focused.value,
  (focused) => {
    if (focused) {
      block.value?.focus()

      setEndOfContent(block.value as HTMLElement)
    } else {
      block.value?.blur()
    }
  },
)

watch(
  () => text.value,
  (text) => (isShowedPlaceholder.value = !text),
)
</script>

<template>
  <div class="ui-editable-block">
    <div v-show="isShowedPlaceholder" class="ui-editable-block__placeholder">{{ placeholder }}</div>
    <div
      ref="block"
      class="ui-editable-block__content"
      :class="{ editable: !props.locked, error: isError }"
      :contenteditable="!props.locked"
      @keydown.enter.exact.prevent="onEnter"
      @input="onInput"
      @focus="onFocus"
      @blur="onEnter"
    >
      {{ text }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "@styles/colors";

$grey: color.change(colors.$grey, $lightness: 80%);

.ui-editable-block {
  display: inline-block;
  padding: 0;
  min-width: 100px;
  border: none;
  border-bottom: 3px solid transparent;
  transition: all 0.3s;
  background: none;
  color: colors.$basic;
  box-sizing: border-box;
  text-wrap: wrap;
  font-size: 32px;
  overflow: hidden;

  &__placeholder {
    position: absolute;
    z-index: 1;
    width: 100%;
    text-wrap: nowrap;
    font-weight: normal;
    overflow: hidden;
    color: color.change(colors.$grey, $lightness: 70%);
  }

  &__content {
    position: relative;
    z-index: 2;

    &.editable {
      &:focus,
      &:hover {
        outline: none;
        border-top: none;
        border-right: none;
        border-left: none;
        border-color: color.change(colors.$grey, $lightness: 80%);
      }

      &.error {
        border-color: color.change(crimson, $lightness: 70%);
      }
    }
  }
}
</style>
