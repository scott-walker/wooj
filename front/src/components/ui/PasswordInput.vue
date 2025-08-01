<script setup>
import { ref, computed, watch } from 'vue'
import Input from '@ui/Input.vue'

const props = defineProps({
  placeholder: { type: String, default: "Пароль" },
  autocomplete: { type: Boolean, default: false },
  withChecker: { type: Boolean, default: false },
})
const password = defineModel()
const emit = defineEmits(["update", "save"])
const isVisinle = ref(false)
const level = ref(null)
const type = computed(() => isVisinle.value ? "text" : "password")

const levels = [
  { type: 1, text: "Слабый", pattern: /^[a-zа-я0-9]{1,8}$/ },
  { type: 2, text: "Средний", pattern: /^.{1,8}$/ },
  { type: 2, text: "Средний", pattern: /^[a-zа-я0-9]{8,}$/ },
  { type: 3, text: "Сильный", pattern: /^[A-Za-zА-Яа-я0-9]{8,}$/ },
  { type: 3, text: "Сильный", pattern: /^.{8,}$/ },
]
const onToggleVisible = () => isVisinle.value = !isVisinle.value

watch(() => password.value, value => {
  if (!props.withChecker) {
    return
  }

  level.value = levels.find(({ pattern }) => pattern.test(password.value))
})
</script>

<template>
  <div class="ui-password-input">
    <div class="ui-password-input__wrap">
      <Input
        class="ui-password-input__field"
        v-model="password"
        :type="type"
        :autocomplete="props.autocomplete"
        :placeholder="props.placeholder" />

      <i class="ui-password-input__icon fa-solid"
        :class="{ 'fa-eye': !isVisinle, 'fa-eye-slash': isVisinle }"
        @click="onToggleVisible"></i>
    </div>
    <div v-if="props.withChecker && level" class="ui-password-input__level" :class="`level-${level.type}`">
      {{ level.text }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "@styles/colors";

$grey: color.change(colors.$grey, $lightness: 80%);

.ui-password-input {
  position: relative;

  &__wrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
  }

  // &__field {
  //   padding: 10px 50px 10px 20px;
  //   box-shadow: none !important;
  //   outline: none;
  //   border: 2px solid $grey;
  //   // border-radius: 10px;
  //   transition: all .3s;
  //   width: 100%;
  //   color: colors.$basic;

  //   &::placeholder {
  //     color: $grey;
  //     font-style: italic;
  //     font-weight: bold;
  //   }

  //   &:hover,
  //   &:focus {
  //     border-color: $grey;
  //   }
  // }

  &__icon {
    position: absolute;
    right: 20px;
    cursor: pointer;
  }

  &__level {
    padding: 2px 18px;
    font-weight: bold;

    &.level-1 {
      color: color.change(crimson, $lightness: 60%);
    }

    &.level-2 {
      color: color.change(orange, $lightness: 50%);
    }

    &.level-3 {
      color: color.change(colors.$primary, $lightness: 40%);
    }
  }
}
</style>