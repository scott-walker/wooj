<script setup>
import { ref, computed, reactive } from "vue"
import useUserStore from "@stores/user"
import Button from "@ui/Button.vue"
import Input from "@ui/Input.vue"
import PasswordInput from "@ui/PasswordInput.vue"

const userStore = useUserStore()
const loginForm = reactive({
  email: "",
  password: "",
})
const registerForm = reactive({
  email: "",
  password: "",
})
const isShowedLogin = ref(true)
const isShowedRegister = computed(() => !isShowedLogin.value)
const isDissqbledLoginButton = computed(() => !loginForm.email || !loginForm.password)
const isDissqbledRegisterButton = computed(() => !registerForm.email || !registerForm.password)

// Для Transition
const tabKey = computed(() => isShowedLogin.value ? 'login' : 'register')

const onLogin = () => userStore.login(loginForm)
const onRegister = () => userStore.register(registerForm)
</script>

<template>
  <div class="view-auth auth" :key="tabKey">
    <div class="auth-tabs">
      <a class="auth-tabs__item" :class="{ active: isShowedLogin }" @click="isShowedLogin = true">
        Войти
      </a>
      <a class="auth-tabs__item" :class="{ active: isShowedRegister }" @click="isShowedLogin = false">
        Зарегистрироваться
      </a>
    </div>

    <form v-if="isShowedLogin" class="auth-form" novalidate @submit.prevent="onLogin">
      <div class="auth-form__field">
        <Input type="email" placeholder="Email" v-model="loginForm.email" />
      </div>
      <div class="auth-form__field">
        <PasswordInput placeholder="Пароль" :with-checker="false" v-model="loginForm.password" autocomplete />
      </div>
      <div class="auth-form__field">
        <Button class="auth-form__button" text="Войти" :disabled="isDissqbledLoginButton" />
      </div>
    </form>

    <form v-else-if="isShowedRegister" class="auth-form" novalidate @submit.prevent="onRegister">
      <div class="auth-form__field">
        <Input type="email" placeholder="Email" v-model="registerForm.email" />
      </div>
      <div class="auth-form__field">
        <PasswordInput placeholder="Пароль" :with-checker="true" v-model="registerForm.password" autocomplete />
      </div>
      <div class="auth-form__field">
        <Button class="auth-form__button" text="Зарегистрироваться" :disabled="isDissqbledRegisterButton" />
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "@styles/colors";
@use "@styles/media";
@use "@styles/common";

.auth {
  background: colors.$absorbing;
  @include common.card($isHoverable: false);
  width: fit-content;

  &-tabs {
    display: flex;
    justify-content: center;
    width: 100%;

    &__item {
      padding: 20px;
      width: 100%;
      text-align: center;
      border-bottom: 2px solid color.change(colors.$grey, $lightness: 80%);
      color: colors.$basic;
      transition: all .3s;
      user-select: none;
      cursor: pointer;

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

  &-form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    padding: 20px 40px;

    &__field {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: 10px;

      &:last-child {
        flex-grow: 1;
        margin-bottom: 0px;
        margin-top: 10px;
      }
    }

    &__button {
      font-size: 16px;
    }
  }
}

@include media.sm() {
  .auth {
    &-tabs {
      &__item {
        padding: 15px;
      }
    }

    &-form {
      padding: 20px 25px;

      &__button {
        font-size: 14px;
      }
    }
  }
}
</style>
