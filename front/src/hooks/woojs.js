import { useRouter } from "vue-router"
import { ref, computed, inject } from "vue"

export default () => {
  const router = useRouter()
  const { woojService } = inject("services")

  const rawWoojs = ref(null)
  const hiddenIdsMap = ref({})
  const pinnedIdsMap = ref({})

  const fetchAll = async () => {
    rawWoojs.value = await woojService.getAll()
  }

  const fetchPinned = async () => {
    rawWoojs.value = await woojService.getPinned()
  }

  const pin = async (woojId) => {
    pinnedIdsMap.value[woojId] = true

    await woojService.pin(woojId)
  }

  const unpin = async (woojId) => {
    pinnedIdsMap.value[woojId] = false

    await woojService.unpin(woojId)
  }

  const fetchTrash = async () => {
    rawWoojs.value = await woojService.getTrash()
  }

  const clearTrash = async () => {
    rawWoojs.value = []

    await woojService.clearTrash()
  }

  const hideWooj = (woojId) => (hiddenIdsMap.value[woojId] = true)

  /**
   * Лайкнуть
   */
  const onTogglePin = async (wooj) => {
    if (wooj.is_pinned) {
      unpin(wooj.id)
    } else {
      pin(wooj.id)
    }
  }

  /**
   * Редактировать
   */
  const onEdit = (wooj) => {
    router.push({ name: "Wooj", params: { woojId: wooj.id } })
  }

  /**
   * Удалить
   */
  const onRemove = async (wooj) => {
    hideWooj(wooj.id)

    await woojService.delete(wooj.id)
  }

  /**
   * Восстановить
   */
  const onRestore = async (wooj) => {
    hideWooj(wooj.id)

    await woojService.restore(wooj.id)
  }

  const onClearTrash = () => clearTrash()

  const checkIsHidden = (wooj) => {
    return hiddenIdsMap.value[wooj.id]
  }

  const checkIsPin = (wooj) => {
    return pinnedIdsMap.value[wooj.id] !== undefined ? pinnedIdsMap.value[wooj.id] : wooj.is_pinned
  }

  const woojs = computed(() => {
    if (!rawWoojs.value) {
      return null
    }

    const woojs = []

    for (const wooj of rawWoojs.value) {
      checkIsHidden(wooj) || woojs.push({ ...wooj, is_pinned: checkIsPin(wooj) })
    }

    return woojs
  })

  return {
    woojs,
    fetchAll,
    fetchPinned,
    pin,
    unpin,
    fetchTrash,
    clearTrash,
    hideWooj,
    onTogglePin,
    onEdit,
    onRemove,
    onRestore,
    onClearTrash,
  }
}
