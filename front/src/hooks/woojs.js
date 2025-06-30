import { useRouter } from "vue-router"
import { ref, computed, inject } from "vue"

export default () => {
  const router = useRouter()
  const { woojService } = inject("services")

  const rawWoojs = ref(null)
  const hiddenIdsMap = ref({})
  const likedIdsMap = ref({})

  const fetchAll = async () => {
    rawWoojs.value = await woojService.getAll()
  }

  const fetchLiked = async () => {
    rawWoojs.value = await woojService.getLiked()
  }

  const unsetLike = async (woojId) => {
    likedIdsMap.value[woojId] = false

    await woojService.unsetLike(woojId)
  }

  const setLike = async (woojId) => {
    likedIdsMap.value[woojId] = true

    await woojService.setLike(woojId)
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
  const onToggleLike = async (wooj) => {
    if (wooj.has_like) {
      unsetLike(wooj.id)
    } else {
      setLike(wooj.id)
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

  const checkHasLike = (wooj) => {
    return likedIdsMap.value[wooj.id] !== undefined ? likedIdsMap.value[wooj.id] : wooj.has_like
  }

  const woojs = computed(() => {
    if (!rawWoojs.value) {
      return null
    }

    const woojs = []

    for (const wooj of rawWoojs.value) {
      checkIsHidden(wooj) || woojs.push({ ...wooj, has_like: checkHasLike(wooj) })
    }

    return woojs
  })

  return {
    woojs,
    fetchAll,
    fetchLiked,
    setLike,
    unsetLike,
    fetchTrash,
    clearTrash,
    hideWooj,
    onToggleLike,
    onEdit,
    onRemove,
    onRestore,
    onClearTrash,
  }
}
