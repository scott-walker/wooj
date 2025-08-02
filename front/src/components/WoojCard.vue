<script setup>
import { computed } from "vue"

const props = defineProps({
  data: Object,
  hasMove: { type: Boolean, default: true },
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
        v-if="hasMove"
        class="wooj-card__panel-button icon wooj-card__mover"
        @mousedown="$emit('move', wooj)">
        <i class="fas fa-arrows-up-down-left-right"></i>
      </span>
      <span
        v-if="hasPin"
        class="wooj-card__panel-button icon"
        @click.stop="$emit('pin', wooj)">
        <i class="fas" :class="wooj.is_pinned ? 'fa-thumbtack-slash' : 'fa-thumbtack'"></i>
      </span>
      <span
        v-if="hasEdit"
        class="wooj-card__panel-button icon"
        @click="$emit('edit', wooj)">
        <i class="fas fa-edit"></i></span>
      <span
        v-if="hasRemove"
        class="wooj-card__panel-button icon"
        @click="$emit('remove', wooj)">
        <i class="fas fa-trash"></i>
      </span>
      <span
        v-if="hasRestore"
        class="wooj-card__panel-button icon"
        @click="$emit('restore', wooj)">
        <i class="fa fa-undo"></i>
      </span>
    </div>

    <div class="wooj-card__wrapper" :class="{ 'pinned': wooj.is_pinned }">
      <div class="wooj-card__title">{{ title }}</div>
      <div class="wooj-card__content wooj-content" v-html="content" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

  &:hover {
    .wooj-card__panel {
      opacity: 1;
    }
  }

  &__mover {
    cursor: grab;
  }

  &__wrapper {
    width: 100%;
    // min-height: 100%;
    // max-height: 100%;

    min-width: 40px;
    max-width: 210px;
    padding: 25px 30px;
    border: 3px solid colors.$absorbing;
    background: colors.$absorbing;
    overflow: hidden;

    &.pinned {
      background: linear-gradient(349deg, rgba(212, 255, 56, 1) 12%, rgba(255, 255, 255, 1) 12%);
      // background: linear-gradient(352deg, colors.$primary 18%, rgba(255, 255, 255, 1) 18%);
    }
  }

  &__title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 10px;
    overflow-wrap: break-word;
  }

  &__content {
    max-height: 90px;
    overflow: hidden;
  }
}

@include media.sm() {
  .wooj-card {

    min-width: 40px;
    max-width: 210px;

    &__panel {
      display: flex;
      position: absolute;
      top: -15px;
      right: -15px;
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

    &__wrapper {
      width: 100%;
      min-height: 100%;
      max-height: 100%;
      padding: 10px;

      &.pinned {
        background: linear-gradient(349deg, rgba(212, 255, 56, 1) 12%, rgba(255, 255, 255, 1) 12%);
        // background: linear-gradient(352deg, colors.$primary 18%, rgba(255, 255, 255, 1) 18%);
      }
    }

    &__title {
      font-size: 18px;
      margin-bottom: 15px;
    }

    &__content {
      // max-height: 90px;
      overflow: hidden;
    }
  }
}
</style>