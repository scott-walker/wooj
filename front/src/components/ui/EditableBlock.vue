<script setup>
import { ref, useTemplateRef, watch } from 'vue'

const props = defineProps({
  min: { type: Number, default: 2 },
  max: { type: Number, default: 255 },
  locked: { type: Boolean, default: false },
})

const text = defineModel()
const focused = defineModel("focused")
const emit = defineEmits(["change"])
const block = useTemplateRef("block")
const isError = ref(false)

/**
 * Постаивть курсор в конец поля
 * @param element 
 */
const setEndOfContent = (element) => {
  const range = document.createRange()
  const selection = window.getSelection()

  range.selectNodeContents(element)
  range.collapse(false)

  selection.removeAllRanges()
  selection.addRange(range)
}

const onInput = (event) => {
  const length = event.target.innerText.length

  if (length > props.max) {
    event.target.innerText = event.target.innerText.substring(0, props.max)

    setEndOfContent(block.value)
  }
}

const onFocus = () => (isError.value = false)

const onBlur = (event) => {
  const length = event.target.innerText.length

  if (length < props.min || length > props.max) {
    isError.value = true
    return
  }

  text.value = event.target.innerText
  focused.value = false

  emit("change", text.value)
}

watch(() => focused.value, (focused) => {
  if (focused) {
    block.value.focus()

    setEndOfContent(block.value)
  }
})
</script>

<template>
  <div
    ref="block"
    class="ui-editable-block"
    :class="{ editable: !props.locked, error: isError }"
    :contenteditable="!props.locked"
    @keydown.enter.exact.prevent
    @input="onInput"
    @focus="onFocus"
    @blur="onBlur">
    {{ text }}
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
  font-size: 32px;
  transition: all .3s;
  background: none;
  color: colors.$basic;
  text-wrap: wrap;

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
</style>