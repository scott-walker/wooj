<script setup>
import { ref, computed } from "vue"
import useUserStore from "@stores/user"
import IconLink from "@ui/IconLink.vue"
import Modal from "@ui/Modal.vue"
import EditableBlock from "@ui/EditableBlock.vue"
import Input from "@ui/Input.vue"
import Button from "@ui/Button.vue"
import Avatar from "./Avatar.vue"

const userStore = useUserStore()
const user = computed(() => userStore.user)
const isShowProfile = ref(false)
const name = ref(user.value.name)
const password = ref("")

const onClickProfile = () => (isShowProfile.value = true)
const onSubmit = () => {
  console.log({
    avatar: null,
    name: name.value,
    password: password.value,
  })
}
</script>

<template>
  <div class="user-panel">
    <div class="user-panel__user" @click="onClickProfile">
      <figure class="user-panel__user-avatar image is-32x32">
        <img class="is-rounded" :src="userStore.avatar" />
      </figure>

      <div class="user-panel__user-name">{{ user.name }}</div>
    </div>
    <div class="user-panel__logout">
      <IconLink icon="right-from-bracket" @click="userStore.logout" />
    </div>

    <Modal v-model="isShowProfile" title="Профиль" :center="true">
      <div class="profile">
        <div class="profile__avatar">
          <Avatar />
        </div>
        <EditableBlock class="profile__name" v-model="name" :max="20" />
        <div class="profile__email">{{ user.email }}</div>
        <form class="profile__form" @submit.prevent="onSubmit">
          <Input v-model="password" type="password" placeholder="Новый пароль" />
          <Button text="Сохранить" />
        </form>
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
  gap: 5px;

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
    margin-top: 15px;
    width: 100%;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
  }

  &__email {
    margin-top: 5px;
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
}
</style>
