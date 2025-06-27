<script setup>
import { ref, computed, onMounted, inject } from "vue"
import WoojList from "@components/WoojList.vue"

const { wooj: woojService } = inject("services")

const woojs = ref(null)
const isShowedButton = computed(() => {
  if (woojs.value instanceof Array) {
    return woojs.value.length
  }

  return woojs.value
})

const onClear = async () => {
  await woojService.clearTrash()

  woojs.value = []
}

onMounted(async () => {
  woojs.value = await woojService.getTrash()
})
</script>

<template>
  <div class="view-trash">
    <WoojList id="trash" title="Корзина" emptyText="Корзина пуста" :woojs="woojs" :hasLike="false" :hasEdit="false"
      :hasRemove="false" :hasRestore="true">
      <template #panel>
        <button v-if="isShowedButton" class="button is-danger" @click="onClear">
          <span class="icon">
            <i class="fas fa-times"></i>
          </span>
          <span>Очистить корзину</span>
        </button>
      </template>
    </WoojList>
  </div>
</template>
