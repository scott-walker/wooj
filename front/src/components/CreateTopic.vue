<script setup>
import { ref, computed } from "vue"
import useWoojs from "@hooks/woojs"
import Button from "@ui/Button.vue"
import LightInput from "@ui/LightInput.vue"

const { woojStore } = useWoojs()
const emit = defineEmits(["created"])
const name = ref("")
const isDisabledButton = computed(() => !name.value.length)

const onCreate = async () => {
  await woojStore.createTopic({ name: name.value })

  emit("created")
} 
</script>

<template>
  <div class="create-topic">
    <LightInput
      type="text"
      placeholder="Название топика"
      fieldClass="create-topic__field"
      :max="20"
      :focused="true"
      v-model="name" />
    <Button
      class="create-topic__button"
      text="Создать"
      icon="plus"
      :disabled="isDisabledButton"
      :loading="woojStore.isCreatingTopic"
      @click="onCreate" />
  </div>
</template>

<style lang="scss">
@use "@styles/colors";

.create-topic {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 20px;

  &__field {
    font-size: 32px;
    // border-color: colors.$primary !important;

    // &:focus {
    //   border-color: colors.$primary !important;
    // }
  }

  &__button {
    font-size: 18px !important;
  }
}
</style>
