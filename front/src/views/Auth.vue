<script setup>
import { ref, computed, reactive } from "vue"
import useUserStore from "@stores/user"
import useWoojsStore from "@stores/woojs"
import Button from "@ui/Button.vue"
import Input from "@ui/Input.vue"
import PasswordInput from "@ui/PasswordInput.vue"

const userStore = useUserStore()
const woojsStore = useWoojsStore()
const loginForm = reactive({
  email: "",
  password: "",
})
const registerForm = reactive({
  email: "",
  password: "",
})
const loginErrors = reactive({
  message: null
})
const registerErrors = reactive({
  message: null,
  email: null,
  password: null,
})
const isShowedLogin = ref(true)
const isShowedRegister = computed(() => !isShowedLogin.value)
const isDissqbledLoginButton = computed(() => !loginForm.email || !loginForm.password)
const isDissqbledRegisterButton = computed(() => !registerForm.email || !registerForm.password)

const onLogin = async () => {
  loginErrors.message = null

  try {
    await userStore.login(loginForm)
    await woojsStore.fetchAll()
  } catch ({ message }) {
    loginErrors.message = message
  }
}

const onRegister = async () => {
  registerErrors.message = null
  registerErrors.email = null
  registerErrors.password = null

  try {
    await userStore.register(registerForm)
    // await woojsStore.fetchAll()
  } catch ({ message, errors }) {
    registerErrors.message = message
    registerErrors.email = errors?.email?.join("")
    registerErrors.password = errors?.password?.join("")
  }
}
</script>

<template>
  <div class="view-auth">
    <div class="auth">
      <div class="auth__top">
        <h1 class="auth__top-title">WOOJ</h1>
        <p class="auth__top-title-subtitle">Создавай быстро простые заметки</p>
      </div>

      <div class="auth__card">
        <div class="auth__card-tabs">
          <a class="auth__card-tabs-item" :class="{ active: isShowedLogin }" @click="isShowedLogin = true">
            Войти
          </a>
          <a class="auth__card-tabs-item" :class="{ active: isShowedRegister }" @click="isShowedLogin = false">
            Зарегистрироваться
          </a>
        </div>

        <div v-show="isShowedLogin" class="auth__form auth__form-login">
          <div class="auth__form-field">
            <Input type="email" placeholder="Email" v-model="loginForm.email" />
          </div>
          <div class="auth__form-field">
            <PasswordInput placeholder="Пароль" :with-checker="false" v-model="loginForm.password" />
          </div>
          <div class="auth__form-field">
            <div class="auth__form-errors">
              <div v-if="loginErrors.message" class="auth__form-errors-item">{{ loginErrors.message }}</div>
            </div>
            <Button text="Войти" :disabled="isDissqbledLoginButton" @click="onLogin" />
          </div>
        </div>

        <div v-show="isShowedRegister" class="auth__form auth__form-register">
          <div class="auth__form-field">
            <Input type="email" placeholder="Email" v-model="registerForm.email" />
          </div>
          <div class="auth__form-field">
            <PasswordInput placeholder="Пароль" :with-checker="true" v-model="registerForm.password" />
          </div>
          <div class="auth__form-field">
            <div class="auth__form-errors">
              <!-- <div v-if="registerErrors.message" class="auth__form-errors-item">{{ registerErrors.message }}</div> -->
              <div v-if="registerErrors.email" class="auth__form-errors-item">{{ registerErrors.email }}</div>
              <div v-if="registerErrors.password" class="auth__form-errors-item">{{ registerErrors.password }}</div>
            </div>
            <Button text="Зарегистрироваться" :disabled="isDissqbledRegisterButton" @click="onRegister" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
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

    &__card {
      // padding: 20px 40px;
      background: colors.$absorbing;
      @include common.card($isHoverable: false);

      &-tabs {
        display: flex;
        justify-content: center;
        width: 100%;

        &-item {
          padding: 20px;
          width: 100%;
          text-align: center;
          border-bottom: 2px solid color.change(colors.$grey, $lightness: 80%);
          color: colors.$basic;
          transition: all .3s;

          &.active {
            font-weight: bold;
            background-color: colors.$primary;
            border-color: colors.$basic;
          }

          &:hover {
            font-weight: bold;
            border-color: colors.$basic;
          }
        }
      }
    }

    &__form {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      padding: 20px 40px;
      min-height: 220px;

      &-field {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        margin-bottom: 10px;

        &:last-child {
          flex-grow: 1;
        }
      }

      &-errors {
        display: flex;
        flex-direction: column;
        gap: 0px;
        margin-bottom: 10px;

        &-item {
          font-size: 12px;
          color: crimson;
        }
      }
    }
  }
}
</style>
