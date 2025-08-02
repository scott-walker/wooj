<script setup>
import { ref, useTemplateRef } from "vue"
import { Cropper, CircleStencil } from "vue-advanced-cropper"
import useUserStore from "@stores/user"
import IconLink from "@ui/IconLink.vue"
import "vue-advanced-cropper/dist/style.css"

const userStore = useUserStore()
const file = useTemplateRef("file")
const isCropping = ref("")
const avatar = ref(userStore.avatar)
const avatarBlob = ref(null)

const onSelectPhoto = () => file.value.click()
const onUploadPhoto = (event) => {
  const image = event.target.files[0]
  const reader = new FileReader()

  reader.readAsDataURL(image)
  reader.onload = () => {
    avatar.value = URL.createObjectURL(image)
    isCropping.value = true
  };
}
const onCroppPhoto = ({ canvas }) => {
  canvas.toBlob(blob => {
    avatarBlob.value = blob
  })
}
const onSavePhoto = async () => {
  await userStore.changeAvatar(avatarBlob.value)

  avatar.value = userStore.avatar
  isCropping.value = false
}
</script>

<template>
  <div class="avatar">
    <div v-if="isCropping" class="avatar__cropper">
      <IconLink class="avatar__cropper-approve" icon="check" @click="onSavePhoto" />
      <cropper
        class="avatar__cropper-element"
        :stencil-component="CircleStencil"
        :src="avatar"
        @change="onCroppPhoto" />
    </div>

    <div v-else class="avatar__preview">
      <img v-if="avatar" class="avatar__preview-avatar" :src="avatar" />
      <div v-else class="avatar__preview-avatar default"></div>

      <IconLink class="avatar__preview-uploader" icon="arrow-up-from-bracket" @click="onSelectPhoto" />
      <input class="avatar__preview-uploader-file" ref="file" type="file" @change="onUploadPhoto">
    </div>
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
      transition: all .3s;

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
    position: relative;

    &-approve {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 10;
      background: colors.$absorbing;
    }

    &-element {
      width: 200px;
      // height: 300px;
      background: colors.$absorbing;
    }
  }
}
</style>
