<script setup>
import { ref, computed, useTemplateRef, onMounted, onUnmounted } from "vue"
import { useMediaStore } from "@stores/media"
import { useTap } from "@composables/tap"

const emit = defineEmits(["move", "edit", "pin", "remove", "restore", "active", "deactive"])
const props = defineProps({
  data: Object,
  hasMove: { type: Boolean, default: true },
  hasPin: { type: Boolean, default: true },
  hasEdit: { type: Boolean, default: true },
  hasRemove: { type: Boolean, default: true },
  hasRestore: { type: Boolean, default: false },
})

const mediaStore = useMediaStore()

const card = useTemplateRef("card")
const wrapper = useTemplateRef("wrapper")

const isActive = ref(false)
const wooj = computed(() => props.data || {})
const title = computed(() => wooj.value.title || "Новый WOOJ")
const content = computed(() => wooj.value.content || "Пока еще пусто...")
const hasPanel = computed(() => props.hasMove || props.hasPin || props.hasRemove || props.hasRestore)
const isTouched = computed(() => mediaStore.isTouched)
const isClicked = computed(() => !mediaStore.isTouched)
const hasMove = computed(() => !mediaStore.isTouched && props.hasMove)

const onActive = () => (isActive.value = true) && emit('active', wooj.value)
const onDeactive = () => (isActive.value = false) && emit('deactive', wooj.value)
const onLeave = ({ target }) => {
  if (target != card.value || !card.value.contains(target)) {
    onDeactive()
  }
}

const onTouchEdit = () => mediaStore.isTouched && emit('edit', wooj.value)
const onClickEdit = () => mediaStore.isTouched || emit('edit', wooj.value)

onMounted(() => {
  document.addEventListener("mousedown", onLeave)
  document.addEventListener("touchstart", onLeave)

  useTap(wrapper.value, {
    onTap: () => onTouchEdit(),
    onLongTap: () => onActive()
  })
})

onUnmounted(() => {
  document.addEventListener("mousedown", onLeave)
  document.addEventListener("touchstart", onLeave)
})
</script>

<template>
  <div
    ref="card"
    class="wooj-card"
    :class="{ touched: isTouched, clicked: isClicked, active: isActive }">
    <div v-if="hasPanel" class="wooj-card__panel">
      <span
        v-if="hasMove"
        class="wooj-card__panel-button icon wooj-card__mover"
        @mousedown="emit('move', wooj)">
        <i class="fas fa-arrows-up-down-left-right"></i>
      </span>
      <span
        v-if="hasPin"
        class="wooj-card__panel-button icon"
        @click.stop="emit('pin', wooj)">
        <i class="fas" :class="wooj.is_pinned ? 'fa-thumbtack-slash' : 'fa-thumbtack'"></i>
      </span>
      <!-- <span
        v-if="hasEdit"
        class="wooj-card__panel-button icon"
        @click="emit('edit', wooj)">
        <i class="fas fa-edit"></i></span> -->
      <span
        v-if="hasRemove"
        class="wooj-card__panel-button icon"
        @click="emit('remove', wooj)">
        <i class="fas fa-trash"></i>
      </span>
      <span
        v-if="hasRestore"
        class="wooj-card__panel-button icon"
        @click="emit('restore', wooj)">
        <i class="fa fa-undo"></i>
      </span>
    </div>

    <div
      ref="wrapper"
      class="wooj-card__wrapper"
      :class="{ 'pinned': wooj.is_pinned, 'editable': hasEdit }"
      @click="onClickEdit">
      <div class="wooj-card__title">{{ title }}</div>
      <div class="wooj-card__content wooj-content" v-html="content" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "@styles/colors";
@use "@styles/common";
@use "@styles/media";
@use "@styles/wooj";

.wooj-card {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: stretch;
  position: relative;
  border-radius: 100px;
  transition: all .3s;
  @include common.card();

  &__panel {
    position: absolute;
    z-index: 1;
    top: -10px;
    right: -10px;
    background: colors.$absorbing;
    border-radius: 10px;
    box-shadow: rgba(16, 0, 75, 0.2) 0px 1px 2px 0px;
    overflow: hidden;
    opacity: 0;
    transition: all .3s;

    &-button {
      cursor: pointer;

      &:hover {
        background: colors.$primary;
      }
    }
  }


  &.clicked {
    &:hover {
      .wooj-card__panel {
        opacity: 1;
      }
    }
  }

  &.touched {
    &.active {
      .wooj-card__panel {
        opacity: 1;
      }

      .wooj-card__wrapper {
        border-color: color.change(colors.$grey, $lightness: 88%);
      }
    }
  }

  &__mover {
    cursor: grab;
  }

  &__wrapper {
    max-width: 100%;
    padding: 17px;
    border: 3px solid colors.$absorbing;
    background: colors.$absorbing;
    overflow: hidden;

    &.editable {
      cursor: pointer;
    }

    &.pinned {
      background: linear-gradient(349deg, colors.$primary 12%, rgba(255, 255, 255, 1) 12%);
    }
  }

  &__title {
    font-size: 20px;
    font-weight: bold;
    overflow-wrap: break-word;
  }

  &__content {
    margin-top: 20px;
    max-height: 90px;
    overflow: hidden;
  }
}

@include media.sm() {
  .wooj-card {
    &__panel {
      display: flex;
      top: -15px;
      right: -15px;

      &-button {
        cursor: pointer;

        &:hover {
          background: colors.$primary;
        }
      }
    }

    &__wrapper {
      padding: 10px;
      min-width: 100%;
      max-width: 100%;
    }

    &__title {
      font-size: 18px;
    }

    &__content {
      margin-top: 15px;
      width: 100%;
      overflow: hidden;
    }
  }
}
</style>