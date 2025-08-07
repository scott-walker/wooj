<script setup>
import { ref, computed } from "vue"
import { useWoojs } from "@composables/woojs"
import Button from "@ui/Button.vue"
import LightInput from "@ui/LightInput.vue"

const { woojStore, createTopic } = useWoojs()
const emit = defineEmits(["created"])
const name = ref("")
const isDisabledButton = computed(() => !name.value.length)

const onCreate = async () => {
  await createTopic({ name: name.value })

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
@use "@styles/media";

.create-topic {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 20px;

  &__field {
    font-size: 22px;
  }

  &__button {
    font-size: 12px !important;
  }
}

@include media.sm() {
  .create-topic {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    gap: 10px;

    &__field {
      padding: 7px !important;
      font-size: 16px;
    }

    &__button {
      padding: 7px 10px !important;
      font-size: 12px !important;
    }
  }
}
</style>
