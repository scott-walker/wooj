<script setup>
import { computed, reactive } from "vue"
import useUserStore from "@stores/user"
import useWoojsStore from "@stores/woojs"
import Button from "@ui/Button.vue"
import Input from "@ui/Input.vue"
import PasswordInput from "@ui/PasswordInput.vue"

const userStore = useUserStore()
const woojsStore = useWoojsStore()
const form = reactive({
  email: "",
  password: "",
})
const isDissqbledButton = computed(() => !form.email || !form.password)

const onSubmit = async () => {
  await userStore.login(form)
  await woojsStore.fetchAll()
}
</script>

<template>
  <div class="view-auth">
    <div class="auth">
      <div class="auth__top">
        <h1 class="auth__top-title">WOOJ</h1>
        <p class="auth__top-title-subtitle">Создавай быстро простые заметки</p>
      </div>

      <div class="auth__form">
        <!-- <p class="title is-size-4 mb-2">Войти / Зарегаться</p> -->
        <!-- <div class="content">
          <p>
            Введи данные, если ты уже зареган - войдешь, <br>
            если не зареган - все равно войдешь
          </p>
        </div> -->

        <div class="auth__form-field">
          <Input type="email" placeholder="Email" v-model="form.email" />
        </div>
        <div class="auth__form-field">
          <PasswordInput type="email" placeholder="Пароль" :with-checker="false" v-model="form.password" />
        </div>
        <div class="auth__form-field">
          <Button text="Погнали" :disabled="isDissqbledButton" @click="onSubmit" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// @use "sass:color";
@use "@styles/colors";
@use "@styles/common";

.view-auth {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: colors.$grey;
  width: 100vw;
  height: 100vh;

  .auth {
    &__top {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding: 20px;

      &-title {
        font-size: 52px;
        font-weight: 900;
      }

      &-subtitle {
        font-size: 22px;
      }
    }

    &__form {
      padding: 20px 40px;
      background: colors.$absorbing;
      @include common.card();

      &-field {
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
