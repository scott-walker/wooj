<script setup>
import { ref, computed, onMounted } from "vue"
import WoojList from "@components/WoojList.vue"
import useWoojs from "@hooks/woojs"

const { woojs, fetchTrash, onRestore, onClearTrash } = useWoojs()
const isLoaded = ref(false)

const isShowedButton = computed(() => {
  if (woojs.value instanceof Array) {
    return woojs.value.length
  }

  return woojs.value
})

onMounted(async () => {
  await fetchTrash()

  isLoaded.value = true
})
</script>

<template>
  <div class="view-trash">
    <WoojList
      v-if="isLoaded"
      id="trash"
      title="Корзина"
      emptyText="Корзина пуста"
      :woojs="woojs"
      :hasSort="false"
      :hasPin="false"
      :hasEdit="false"
      :hasRemove="false"
      :hasRestore="true"
      @restore="onRestore">
      <template #panel>
        <button v-if="isShowedButton" class="button is-danger" @click="onClearTrash">
          <span class="icon">
            <i class="fas fa-times"></i>
          </span>
          <span>Очистить корзину</span>
        </button>
      </template>
    </WoojList>
  </div>
</template>
