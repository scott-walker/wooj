<script setup>
import { reactive } from "vue"
import { useAuthStore } from "@stores/auth"

const authStore = useAuthStore()
const form = reactive({
  email: "",
  password: "",
})

const onSubmit = (form) => authStore.login(form)
</script>

<template>
  <section class="hero is-fullheight">
    <div class="hero-body is-flex is-flex-direction-column is-justify-content-center">
      <div class="has-text-centered mb-6">
        <h1 class="title is-size-1">WOOJ</h1>
        <p class="subtitle">Создавай быстро простые заметки</p>
      </div>

      <div class="card">
        <div class="card-content">
          <p class="title is-size-4 mb-2">Войти / Зарегаться</p>
          <div class="content">
            <p>
              Введи данные, если ты уже зареган - войдешь, <br>
              если не зареган - все равно войдешь
            </p>
          </div>

          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input class="input" type="email" placeholder="Email" v-model="form.email">
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <!-- <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span> -->
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input class="input" type="password" placeholder="Password" v-model="form.password">
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control is-flex is-justify-content-center">
              <button class="button is-link is-rounded" @click="onSubmit">
                Погнали
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
