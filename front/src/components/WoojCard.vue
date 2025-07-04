<script setup>
import { computed } from "vue"

const props = defineProps({
  data: Object,
  hasPin: { type: Boolean, default: true },
  hasEdit: { type: Boolean, default: true },
  hasRemove: { type: Boolean, default: true },
  hasRestore: { type: Boolean, default: false },
})

const wooj = computed(() => props.data)
const hasPanel = computed(() => props.hasPin || props.hasEdit || props.hasRemove || props.hasRestore)
</script>

<template>
  <div class="wooj-card" :class="{ 'wooj-card_pinned': wooj.is_pinned }">
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

    <div class="wooj-card__title title is-5 mb-3">{{ wooj.title }}</div>
    <div class="wooj-card__content" v-html="wooj.content" />
  </div>
</template>

<style lang="scss">
.wooj-card {
  flex-grow: 1;
  position: relative;
  padding: 25px 30px;
  border: 2px solid transparent;
  background: #ffffff;
  box-shadow: rgba(16, 0, 75, 0.05) 0px 5px 10px 0px;
  border-radius: 10px;
  transition: all .3s;

  &_pinned {
    background: #ffe7b9;
    border-color: #ffd990;
    // background-image: url("@assets/heart.png");
    // background-repeat: no-repeat;
    // background-size: cover;
    // background-position: bottom right;
  }

  &__panel {
    position: absolute;
    top: -10px;
    right: -10px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: rgba(16, 0, 75, 0.2) 0px 1px 2px 0px;
    overflow: hidden;
    opacity: 0;
    transition: all .3s;

    &-button {
      cursor: pointer;

      &:hover {
        background: rgba(255, 166, 0, 0.276);
      }
    }
  }

  &:hover {
    box-shadow: rgba(16, 0, 75, 0.15) 0px 10px 30px 0px;

    .wooj-card__panel {
      opacity: 1;
    }
  }

  &__content {
    max-height: 90px;
    overflow: hidden;

    // -webkit-box-shadow: 0px -16px 21px -5px rgba(0, 144, 255, 1) inset;
    // -moz-box-shadow: 0px -16px 21px -5px rgba(0, 144, 255, 1) inset;
    // box-shadow: 0px -16px 21px -5px rgba(255, 255, 255, 1) inset;
    // border: 1px solid rebeccapurple;
  }
}
</style>