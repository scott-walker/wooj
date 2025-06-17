<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="header header-fixed u-unselectable header-animated">
    <div class="header-brand">
      <div class="nav-item no-hover">
        <a>
          <h6 class="title uppercase">WOOJ</h6>
        </a>
      </div>
      <div class="nav-item nav-btn" id="header-btn">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="header-nav" id="header-menu" role="button">
      <div class="nav-right">
        <RouterLink :to="{ name: 'Index' }" custom v-slot="{ isActive, href, navigate }">
          <div class="nav-item" :class="{ 'active': isActive }">
            <a :href="href" @click="navigate">Главная</a>
          </div>
        </RouterLink>

        <RouterLink :to="{ name: 'Notes' }" custom v-slot="{ isActive, href, navigate }">
          <div class="nav-item" :class="{ 'active': isActive }">
            <a :href="href" @click="navigate">Заметки</a>
          </div>
        </RouterLink>

        <RouterLink :to="{ name: 'Auth' }" custom v-slot="{ isActive, href, navigate }">
          <div class="nav-item" :class="{ 'active': isActive }">
            <a :href="href" @click="navigate">Войти</a>
          </div>
        </RouterLink>

        <!-- <RouterLink :to="{ name: 'SignUp' }" custom v-slot="{ isActive, href, navigate }">
          <div class="nav-item" :class="{ 'active': isActive }">
            <a :href="href" @click="navigate">Заметки</a>
          </div>
        </RouterLink> -->
      </div>
    </div>
  </div>
</template>
