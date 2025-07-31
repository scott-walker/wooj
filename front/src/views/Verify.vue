<script setup>
import { onMounted } from "vue"
import useUserStore from "@stores/user"
import Button from "@ui/Button.vue"
// import Input from "@ui/Input.vue"
// import PasswordInput from "@ui/PasswordInput.vue"

const userStore = useUserStore()

const onResend = () => userStore.resend()
const onLogout = () => userStore.logout()

onMounted(() => userStore.startResendTimer())
</script>

<template>
  <div class="view-verify">
    <div class="verify">
      <div class="verify__top">
        <h1 class="verify__top-title">WOOJ</h1>
        <p class="verify__top-title-subtitle">Создавай быстро простые заметки</p>
      </div>

      <div class="verify__card">
        Подтверди свою почту <b>{{ userStore.user.email }}</b>

        <div class="verify__card-bottom">
          <Button
            v-if="userStore.resendTimer"
            disabled
            :text="`Повторно отправить через ${userStore.resendTimer} сек.`" />
          <Button v-else text="Выслать письмо повторно" @click="onResend" />

          <Button type="default" text="Выйти" @click="onLogout" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "@styles/colors";
@use "@styles/common";

.view-verify {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: colors.$grey;
  width: 100vw;
  height: 100vh;

  .verify {
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
      padding: 20px 40px;
      background: colors.$absorbing;
      @include common.card($isHoverable: false);

      &-bottom {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        margin-top: 20px;
      }
    }
  }
}
</style>
