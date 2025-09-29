<script setup lang="ts">
import { ref, useTemplateRef } from "vue"
import { Cropper, CircleStencil } from "vue-advanced-cropper"
import useUserStore from "@stores/user"
import Loader from "@ui/Loader.vue"
import IconLink from "@ui/IconLink.vue"
import "vue-advanced-cropper/dist/style.css"

const userStore = useUserStore()
const file = useTemplateRef("file")
const isCropping = ref(false)
const isCroppingReady = ref(false)
const currentAvatar = ref(userStore.avatar)
const uploadedAvatar = ref<string | null>(null)
const uploadedAvatarBlob = ref<Blob | null>(null)

const onSelectPhoto = () => file.value?.click()
const onUploadPhoto = (event: Event) => {
  const image = (event.target as HTMLInputElement).files?.[0] as File
  const reader = new FileReader()

  reader.readAsDataURL(image)
  reader.onload = () => {
    uploadedAvatar.value = URL.createObjectURL(image)
    isCropping.value = true

    setTimeout(() => (isCroppingReady.value = true), 1000)
  }
}
const onCroppPhoto = ({ canvas }: { canvas: HTMLCanvasElement }) => {
  canvas.toBlob((blob) => {
    uploadedAvatarBlob.value = blob
  })
}
const onCloseCropper = () => {
  isCropping.value = false
  isCroppingReady.value = false
}
const onSavePhoto = async () => {
  await userStore.changeAvatar(uploadedAvatarBlob.value as File)

  currentAvatar.value = userStore.avatar
  onCloseCropper()
}
</script>

<template>
  <div class="avatar">
    <Transition name="avatar-transition" mode="out-in">
      <div v-if="isCropping" class="avatar__cropper">
        <div v-if="!isCroppingReady" class="avatar__cropper-loader">
          <Loader :size="50" />
        </div>

        <div class="avatar__cropper-actions">
          <IconLink class="avatar__cropper-reject" icon="xmark" type="danger" @click="onCloseCropper" />
          <IconLink class="avatar__cropper-approve" icon="check" @click="onSavePhoto" />
        </div>

        <cropper
          class="avatar__cropper-element"
          :stencil-component="CircleStencil"
          :src="uploadedAvatar"
          @change="onCroppPhoto"
        />
      </div>

      <div v-else class="avatar__preview">
        <img v-if="currentAvatar" class="avatar__preview-avatar" :src="currentAvatar" />
        <div v-else class="avatar__preview-avatar default"></div>

        <IconLink class="avatar__preview-uploader" icon="arrow-up-from-bracket" @click="onSelectPhoto" />
        <input class="avatar__preview-uploader-file" ref="file" type="file" @change="onUploadPhoto" />
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "@styles/colors";

.avatar {
  &__preview {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &-avatar {
      width: 128px;
      height: 128px;
      border-radius: 50%;
      object-fit: cover;

      &.default {
        background-color: colors.$primary;
      }
    }

    &-uploader {
      opacity: 0;
      position: absolute;
      background: colors.$absorbing;
      transition: all 0.3s;

      &-file {
        display: none;
      }
    }

    &:hover {
      .avatar__preview-uploader {
        opacity: 1;
      }
    }
  }

  &__cropper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    min-width: 200px;
    min-height: 200px;
    transition: all 0.3s;
    background: color.adjust(colors.$grey, $lightness: -10%);
    border-radius: 10px;
    overflow: hidden;

    &-loader {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      z-index: 50;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: white;
    }

    &-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      z-index: 10;
      top: 10px;
      left: 10px;
      right: 10px;
      gap: 10px;
    }

    &-approve,
    &-reject {
      background: colors.$absorbing;
    }

    &-element {
      width: 200px;
      background: colors.$absorbing;
    }
  }
}

.avatar-transition {
  &-enter-active,
  &-leave-active {
    transition: all 0.15s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0.2;
  }
}
</style>
