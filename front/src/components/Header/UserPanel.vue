<script setup>
import { ref, computed } from "vue"

import { useMediaStore } from "@stores/media"
import useUserStore from "@stores/user"

import IconLink from "@ui/IconLink.vue"
import Modal from "@ui/Modal.vue"
import EditableBlock from "@ui/EditableBlock.vue"
import PasswordInput from "@ui/PasswordInput.vue"
import Button from "@ui/Button.vue"
import Avatar from "./Avatar.vue"

const mediaStore = useMediaStore()
const userStore = useUserStore()

const user = computed(() => userStore.user)
const isShowProfile = ref(false)
const isUpdatingPassword = ref(false)
const name = ref(user.value.name)
const password = ref("")
const disabledSavePassword = computed(() => password.value.length < 6)

const onClickProfile = () => (isShowProfile.value = true)
const onUpdateName = () => userStore.update({ name: name.value })
const onUpdatePassword = async () => {
  isUpdatingPassword.value = true

  await userStore.update({ password: password.value })

  isUpdatingPassword.value = false
  password.value = ""
}
const onLogout = () => {
  isShowProfile.value = false
  userStore.logout()
}
</script>

<template>
  <div class="user-panel">
    <div v-if="mediaStore.isSmall" class="user-panel__user" @click="onClickProfile">
      <img v-if="userStore.avatar" class="user-panel__user-avatar" :src="userStore.avatar" />
      <div v-else class="user-panel__user-avatar default"></div>
    </div>
    <div v-else class="user-panel__user" @click="onClickProfile">
      <img v-if="userStore.avatar" class="user-panel__user-avatar" :src="userStore.avatar" />
      <div v-else class="user-panel__user-avatar default"></div>

      <div class="user-panel__user-name">{{ user.name }}</div>
    </div>

    <div v-if="!mediaStore.isSmall" class="user-panel__logout">
      <IconLink icon="right-from-bracket" @click="userStore.logout" />
    </div>

    <Modal v-model="isShowProfile" title="Профиль" :center="true">
      <div class="profile">
        <div class="profile__avatar">
          <Avatar />
        </div>
        <EditableBlock class="profile__name" v-model="name" :max="20" @change="onUpdateName" />
        <div class="profile__email">{{ user.email }}</div>
        <form class="profile__form">
          <PasswordInput v-model="password" :with-checker="true" placeholder="Новый пароль" />
          <Button
            :disabled="disabledSavePassword"
            text="Сохранить пароль"
            :loading="isUpdatingPassword"
            @click="onUpdatePassword" />
        </form>
        <div v-if="mediaStore.isSmall" class="profile__logout">
          <Button type="danger" text="Выйти" @click="onLogout" />
        </div>
      </div>
    </Modal>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "@styles/colors";

.user-panel {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  gap: 10px;

  &__user {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    height: 100%;
    padding: 0 15px;
    cursor: pointer;
    transition: all .3s;

    &:hover {
      background-color: colors.$primary;

      &-name {
        font-size: 18px;
        font-weight: bold;
      }
    }

    &-avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      object-fit: cover;

      &.default {
        background-color: colors.$primary;
      }
    }

    &-name {
      font-size: 18px;
      font-weight: bold;
    }
  }
}

.profile {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-width: 300px;
  max-width: 600px;
  padding: 40px;

  &__avatar {}

  &__name {
    margin-top: 25px;
    min-width: none;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
  }

  &__email {
    margin-top: 7px;
    font-size: 18px;
    font-style: italic;
    color: color.change(colors.$grey, $lightness: 50%);
  }

  &__form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-top: 20px;
    gap: 10px;
  }

  &__logout {
    margin-top: 20px;
  }
}
</style>
