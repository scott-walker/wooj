<script setup>
import { computed, onBeforeMount, onBeforeUpdate } from "vue"
import { useWoojStore } from "@stores/wooj"
// import Wooj from "@components/Wooj.vue"

const props = defineProps(["woojId"])

const store = useWoojStore()
const wooj = computed(() => store.activeWooj)

function init() {
  store.activateWooj(props.woojId)
}

onBeforeMount(init)
onBeforeUpdate(init)
</script>

<template>
  <div class="view-wooj">
    <!-- <Wooj v-if="wooj" :data="wooj" /> -->
  </div>
</template>
