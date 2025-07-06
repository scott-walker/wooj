<script setup>
import { ref, computed, inject } from "vue"
import { useRouter } from "vue-router"
import Wooj from "@components/Wooj.vue"

const props = defineProps(["woojId"])
const { woojService } = inject("services")
const router = useRouter()

const wooj = ref({
  title: "",
  content: "",
})
const isFilled = computed(() => Boolean(wooj.value.title && wooj.value.content))

const onSave = async () => {
  console.log("onSave")

  if (!isFilled.value) {
    console.log("is not filled")

    return
  }

  const { id } = await woojService.create({
    title: wooj.value.title,
    content: wooj.value.content,
  })

  router.push({ name: "Wooj", params: { woojId: id } })

  console.log("redirect")
}
</script>

<template>
  <div class="view-wooj">
    <Wooj :data="wooj" @save="onSave" />
  </div>
</template>

<style lang="scss">
.view-wooj {
  height: calc(100% - 40px);
}
</style>
