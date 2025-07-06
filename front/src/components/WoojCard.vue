<script setup>
import { computed } from "vue"

const props = defineProps({
  data: Object,
  hasPin: { type: Boolean, default: true },
  hasEdit: { type: Boolean, default: true },
  hasRemove: { type: Boolean, default: true },
  hasRestore: { type: Boolean, default: false },
})

const wooj = computed(() => props.data || {})
const title = computed(() => wooj.value.title || "Новый WOOJ")
const content = computed(() => wooj.value.content || "Пока еще пусто...")
const hasPanel = computed(() => props.hasPin || props.hasEdit || props.hasRemove || props.hasRestore)
</script>

<template>
  <div class="wooj-card">
    <div v-if="hasPanel" class="wooj-card__panel">
      <span
        v-if="hasPin"
        class="wooj-card__panel-button icon is-medium"
        @click="$emit('pin', wooj)">
        <i class="fas" :class="wooj.is_pinned ? 'fa-thumbtack-slash' : 'fa-thumbtack'"></i>
      </span>
      <span
        v-if="hasEdit"
        class="wooj-card__panel-button icon is-medium"
        @click="$emit('edit', wooj)">
        <i class="fas fa-edit"></i></span>
      <span
        v-if="hasRemove"
        class="wooj-card__panel-button icon is-medium"
        @click="$emit('remove', wooj)">
        <i class="fas fa-trash"></i>
      </span>
      <span
        v-if="hasRestore"
        class="wooj-card__panel-button icon is-medium"
        @click="$emit('restore', wooj)">
        <i class="fa fa-undo"></i>
      </span>
    </div>


    <div class="wooj-card__wrapper" :class="{ 'pinned': wooj.is_pinned }">
      <div class="wooj-card__title">{{ title }}</div>
      <div class="wooj-card__content" v-html="content" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@styles/colors";

.wooj-card {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: stretch;
  position: relative;
  background: colors.$absorbing;
  box-shadow: rgba(16, 0, 75, 0.05) 0px 5px 10px 0px;
  border-radius: 100px;
  transition: all .3s;

  &__panel {
    position: absolute;
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

  &:hover {
    box-shadow: rgba(16, 0, 75, 0.15) 0px 10px 30px 0px;

    .wooj-card__panel {
      opacity: 1;
    }
  }

  &__wrapper {
    width: 100%;
    min-height: 100%;
    max-height: 100%;
    padding: 25px 30px;
    border: 3px solid colors.$absorbing;
    background: colors.$absorbing;
    overflow: hidden;

    &.pinned {
      // background: colors.$primary;
      background: linear-gradient(352deg, colors.$primary 18%, rgba(255, 255, 255, 1) 18%);
    }
  }

  &__title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  &__content {
    max-height: 90px;
    overflow: hidden;
  }
}
</style>