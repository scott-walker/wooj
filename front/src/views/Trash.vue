<script setup>
import { ref, computed, onBeforeMount } from "vue"
import Button from "@ui/Button.vue"
import Dialog from "@ui/Dialog.vue"
import WoojList from "@components/WoojList.vue"
import useWoojs from "@hooks/woojs"

const { topicParamsMap, setRouteListeners } = useWoojs()
const topic = computed(() => topicParamsMap.value.trash)
const isShowedButton = computed(() => topic.value.woojs.length)
const isShowedDeleteDialog = ref(false)

const onClear = () => (isShowedDeleteDialog.value = true)

onBeforeMount(() => setRouteListeners())
</script>

<template>
  <div class="view-trash">
    <WoojList
      :id="topic.id"
      :key="topic.id"
      :title="topic.title"
      :woojs="topic.woojs"
      :loaded="topic.isLoaded"
      :hasSort="false"
      :hasMove="false"
      :hasPin="false"
      :hasEdit="false"
      :hasRemove="false"
      :hasRestore="true"
      emptyText="Корзина пуста"
      @restore="topic.restore">
      <template #panel>
        <Button
          v-if="isShowedButton"
          text="Очистить корзину"
          icon="times"
          type="danger"
          @click="onClear" />

        <Dialog
          v-model="isShowedDeleteDialog"
          title="Очистить корзину"
          type="danger"
          @approve="topic.clearTrash">
          Ты действительно хочешь очистить корзину?
        </Dialog>
      </template>
    </WoojList>
  </div>
</template>
