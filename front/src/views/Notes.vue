<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
const items = [
  { id: 1, title: 'Test 1' },
  { id: 2, title: 'Test 2' },
  { id: 3, title: 'Test 3' },
  { id: 4, title: 'Test 4' },
  { id: 5, title: 'Test 5' },
  { id: 6, title: 'Test 6' },
  { id: 7, title: 'Test 7' },
]
</script>

<template>
  <div class="u-flex u-flex-wrap u-gap-4 mt-6 p-4">
    <div class="card" style="max-width: 350px;" v-for="item of items" :key="item.id">
      <div class="card__container">
        <div class="card__image"></div>
        <div class="card__title-container">
          <p class="title">{{ item.title }}</p>
          <span class="subtitle">Subtitle</span>
        </div>
      </div>
      <div class="content px-2">
        <p>Text and other content belong here, inside a <code>content</code> div.</p>
      </div>
      <!-- <div class="card__action-bar u-center">
        <button class="btn-link outline">Buttons</button>
        <button class="btn-link outline">Go here</button>
      </div> -->
      <!-- <div class="card__footer">
        <div class="u-text-center"><span>This is additional footer text in <code>card__footer</code>.</span></div>
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  &__image {
    background: #ffa600;
    background: linear-gradient(356deg, rgba(255, 166, 0, 1) 0%, rgba(255, 250, 153, 1) 100%);
  }

  &__title-container {}
}
</style>
