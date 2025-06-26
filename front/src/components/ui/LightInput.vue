<script setup>
const props = defineProps({
  cssClass: { type: String, default: "" },
  placeholder: { type: String, default: "" }
})
const content = defineModel()
</script>

<template>
  <div class="ui-light-input">
    <input class="ui-light-input__field" :class="cssClass" type="text" v-model="content"
      :placeholder="props.placeholder" />
  </div>
</template>

<style lang="scss">
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