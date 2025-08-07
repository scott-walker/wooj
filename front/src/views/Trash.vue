<script setup>
import { ref, computed, onBeforeMount } from "vue"

import { useMediaStore } from "@stores/media"
import { useWoojs } from "@composables/woojs"

import Button from "@ui/Button.vue"
import Dialog from "@ui/Dialog.vue"
import WoojList from "@components/WoojList.vue"

const mediaStore = useMediaStore()
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
          :text="mediaStore.isSmall ? 'Очистить' : 'Очистить корзину'"
          :size="mediaStore.isSmall ? 'small' : 'default'"
          :icon="mediaStore.isSmall ? null : 'times'"
          type="danger"
          @click="onClear" />

        <Dialog
          v-model="isShowedDeleteDialog"
          title="Очистить корзину"
          type="danger"
          :center="mediaStore.isSmall"
          @approve="topic.clearTrash">
          Ты действительно хочешь очистить корзину?
        </Dialog>
      </template>
    </WoojList>
  </div>
</template>
