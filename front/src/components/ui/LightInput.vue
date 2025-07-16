<script setup>
import { inject, useTemplateRef, onMounted, nextTick } from 'vue'

const props = defineProps({
  fieldClass: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  focused: { type: Boolean, default: false },
  max: { type: Number, default: 255 },
})
const content = defineModel()
const emit = defineEmits(["update", "save"])
const input = useTemplateRef('input')
const deferredTimer = inject("createDeferredTimer")()

const onChange = () => {
  emit("update", content.value)

  deferredTimer.start(1000, () => emit("save", content.value))
}

onMounted(() => {
  nextTick(() => props.focused && input.value.focus())
})
</script>

<template>
  <div class="ui-light-input">
    <input
      ref="input"
      class="ui-light-input__field"
      :class="props.fieldClass"
      type="text"
      v-model="content"
      :placeholder="props.placeholder"
      :maxlength="props.max"
      @input="onChange" />
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "@styles/colors";

$grey: color.change(colors.$grey, $lightness: 80%);

.ui-light-input {
  &__field {
    padding: 10px 20px;
    box-shadow: none !important;
    outline: none;
    border: none;
    border-bottom: 2px solid transparent;
    // border-radius: 10px;
    transition: all .3s;
    width: 100%;
    color: colors.$basic;

    &::placeholder {
      color: $grey;
      font-style: italic;
      // font-weight: bold;
    }

    &:hover,
    &:focus {
      border-color: $grey;
    }
  }
}
</style>