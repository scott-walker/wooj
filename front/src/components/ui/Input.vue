<script setup>
import { inject, useTemplateRef, onMounted } from 'vue'

const props = defineProps({
  type: { type: String, default: "text" },
  fieldClass: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  autocomplete: { type: Boolean, default: false },
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
  props.focused && input.value.focus()
})
</script>

<template>
  <div class="ui-input">
    <input
      ref="input"
      class="ui-input__field"
      :class="props.fieldClass"
      :type="props.type"
      v-model="content"
      :placeholder="props.placeholder"
      :maxlength="props.max"
      :autocomplete="props.autocomplete ? 'on' : 'off'"
      @input="onChange" />
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "@styles/colors";

$grey: color.change(colors.$grey, $lightness: 80%);

.ui-input {
  &__field {
    padding: 10px 20px;
    box-shadow: none !important;
    outline: none;
    border: none;
    border-bottom: 2px solid $grey;
    box-sizing: border-box;
    transition: all .2s;
    width: 100%;
    color: colors.$basic;
    font-size: 18px;

    &::placeholder {
      color: $grey;
      font-style: italic;
      font-weight: bold;
    }

    &:hover,
    &:focus {
      background-color: color.change(colors.$grey, $lightness: 96%);
    }
  }
}
</style>