<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
// const items = [
//   { id: 1, title: 'Test 1' },
//   { id: 2, title: 'Test 2' },
//   { id: 3, title: 'Test 3' },
//   { id: 4, title: 'Test 4' },
//   { id: 5, title: 'Test 5' },
//   { id: 6, title: 'Test 6' },
//   { id: 7, title: 'Test 7' },
// ]
</script>

<template>
  <div class="hero fullscreen bg-gray-100">
    <div class="hero-body">
      <div class="content w-64">
        <div class="card u-round-lg">
          <div class="card__header px-3 u-center">
            <p class="font-bold uppercase">Войти / Зарегаться</p>
          </div>
          <div class="content px-3">
            <p class="leading-tight	">
              Введи данные, если ты уже зареган - войдешь, <br>
              если не зареган - все равно войдешь
            </p>

            <div class="input-control">
              <input type="email" class="input-contains-icon" placeholder="Email" /><span class="icon"><i
                  class="fa fa-wrapper fa-envelope"></i></span>
            </div>
            <div class="input-control">
              <input type="password" class="input-contains-icon" placeholder="Password" /><span class="icon"><i
                  class="fa fa-wrapper fa-lock"></i></span>
            </div>
          </div>

          <!-- <div class="card__footer level content">6:32 PM - 3 Jul 18</div> -->
          <div class="card__action-bar u-center">
            <button class="bg-pink-600 text-white font-bold btn--lg">Погнали</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// .card {
//   &__image {
//     background: #ffa600;
//     background: linear-gradient(356deg, rgba(255, 166, 0, 1) 0%, rgba(255, 250, 153, 1) 100%);
//   }

//   &__title-container {}
// }</style>
