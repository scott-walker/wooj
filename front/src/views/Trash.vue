<script setup>
import { computed, onMounted } from "vue"
import WoojList from "@components/WoojList.vue"
import useWoojs from "@hooks/woojs"

const { woojs, fetchTrash, onRestore, onClearTrash } = useWoojs()

const isShowedButton = computed(() => {
  if (woojs.value instanceof Array) {
    return woojs.value.length
  }

  return woojs.value
})

onMounted(fetchTrash)
</script>

<template>
  <div class="view-trash">
    <WoojList
      id="trash"
      title="Корзина"
      emptyText="Корзина пуста"
      :woojs="woojs"
      :hasLike="false"
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
