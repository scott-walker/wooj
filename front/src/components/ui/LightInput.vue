<script setup>
import { inject } from 'vue'

const props = defineProps({
  cssClass: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  max: { type: Number, default: 255 },
})
const content = defineModel()
const emit = defineEmits(["update", "save"])

const deferredTimer = inject("createDeferredTimer")()

const onChange = () => {
  emit("update", content.value)

  deferredTimer.start(1000, () => emit("save", content.value))
}
</script>

<template>
  <div class="ui-light-input">
    <input class="ui-light-input__field" :class="cssClass" type="text" v-model="content"
      :placeholder="props.placeholder" :maxlength="props.max" @input="onChange" />
  </div>
</template>

<style lang="scss" scoped>
@use "@styles/colors";

.ui-light-input {
  &__field {
    padding: 10px 20px;
    box-shadow: none !important;
    outline: none;
    border: none;
    border-bottom: 2px solid transparent;
    border-radius: 10px;
    transition: all .2s;
    width: 100%;
    color: colors.$basic;

    &::placeholder {
      color: #adb5bd;
      font-style: italic;
    }

    &:hover,
    &:focus {
      border-color: rgba(16, 0, 75, 0.05);
    }
  }
}
</style>