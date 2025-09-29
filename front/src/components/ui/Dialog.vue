<script setup lang="ts">
import Modal from "@ui/Modal.vue"
import Button from "@ui/Button.vue"

const show = defineModel()
const emit = defineEmits(["approve"])
const props = defineProps({
  title: { type: String, default: "" },
  type: { type: String, default: "primary" },
  center: { type: Boolean, default: false },
})

const onClose = () => (show.value = false)
const onApprove = () => {
  emit("approve")
  onClose()
}
</script>

<template>
  <Modal v-model="show" :title="title" :center="center" class="ui-dialog">
    <div class="ui-dialog__wrapper">
      <div class="ui-dialog__content">
        <slot />
      </div>

      <div class="ui-dialog__buttons">
        <Button text="Да" :type="props.type" @click="onApprove" />
        <Button text="Нет" type="default" @click="onClose" />
      </div>
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
.ui-dialog {
  &__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
  }

  &__content {
    font-size: 18px;
  }

  &__buttons {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
    margin-top: 20px;
  }
}
</style>
