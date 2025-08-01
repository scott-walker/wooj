<script setup>
import { onMounted } from "vue"
import useUserStore from "@stores/user"
import Button from "@ui/Button.vue"

const userStore = useUserStore()

const onResend = () => userStore.resend()
const onLogout = () => userStore.logout()

onMounted(() => userStore.startResendTimer())
</script>

<template>
  <div class="view-verify">
    Подтверди свою почту <b>{{ userStore.user.email }}</b>

    <div class="view-verify__bottom">
      <Button
        v-if="userStore.resendTimer"
        disabled
        :text="`Повторно отправить через ${userStore.resendTimer} сек.`" />
      <Button v-else text="Выслать письмо повторно" @click="onResend" />

      <Button type="default" text="Выйти" @click="onLogout" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "@styles/colors";
@use "@styles/common";

.view-verify {
  padding: 20px 40px;
  background: colors.$absorbing;
  @include common.card($isHoverable: false);
  font-size: 18px;

  &__bottom {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  }
}
</style>
