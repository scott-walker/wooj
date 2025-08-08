<script setup>
import { ref, computed } from "vue"
import Button from "./Button.vue"

const emit = defineEmits(["close"])
const props = defineProps({
  editor: { type: Object },
  hasClose: { type: Boolean, default: false }
})

// Bold
const isBoldDisabled = computed(() => !props.editor.can().chain().focus().toggleBold().run())
const isBoldActive = computed(() => props.editor.isActive('bold'))
const onBold = () => {
  props.editor.chain().focus().toggleBold().run()
}

// Italic
const isItalicDisabled = computed(() => !props.editor.can().chain().focus().toggleItalic().run())
const isItalicActive = computed(() => props.editor.isActive('italic'))
const onItalic = () => {
  props.editor.chain().focus().toggleItalic().run()
}

// Underline
const isUnderlineDisabled = computed(() => !props.editor.can().chain().focus().toggleUnderline().run())
const isUnderlineActive = computed(() => props.editor.isActive('underline'))
const onUnderline = () => {
  props.editor.chain().focus().toggleUnderline().run()
}

// Strike
const isStrikeDisabled = computed(() => !props.editor.can().chain().focus().toggleStrike().run())
const isStrikeActive = computed(() => props.editor.isActive('strike'))
const onStrike = () => {
  props.editor.chain().focus().toggleStrike().run()
}

// Bullet list
const isBulletListDisabled = computed(() => !props.editor.can().chain().focus().toggleBulletList().run())
const isBulletListActive = computed(() => props.editor.isActive('bulletList'))
const onBulletList = () => {
  props.editor.chain().focus().toggleBulletList().run()
}

// Ordered list
const isOrderedListDisabled = computed(() => !props.editor.can().chain().focus().toggleOrderedList().run())
const isOrderedListActive = computed(() => props.editor.isActive('orderedList'))
const onOrderedList = () => {
  props.editor.chain().focus().toggleOrderedList().run()
}

// Headings
const isH1Disabled = computed(() => !props.editor.can().chain().focus().toggleHeading({ level: 1 }).run())
const isH1Active = computed(() => props.editor.isActive('heading', { level: 1 }))
// const isH2Disabled = computed(() => !props.editor.can().chain().focus().toggleHeading({ level: 2 }).run())
// const isH2Active = computed(() => props.editor.isActive('heading', { level: 2 }))
// const isH3Disabled = computed(() => !props.editor.can().chain().focus().toggleHeading({ level: 3 }).run())
// const isH3Active = computed(() => props.editor.isActive('heading', { level: 3 }))
// const isH4Disabled = computed(() => !props.editor.can().chain().focus().toggleHeading({ level: 4 }).run())
// const isH4Active = computed(() => props.editor.isActive('heading', { level: 4 }))
// const isH5Disabled = computed(() => !props.editor.can().chain().focus().toggleHeading({ level: 5 }).run())
// const isH5Active = computed(() => props.editor.isActive('heading', { level: 5 }))
// const isH6Disabled = computed(() => !props.editor.can().chain().focus().toggleHeading({ level: 6 }).run())
// const isH6Active = computed(() => props.editor.isActive('heading', { level: 6 }))
const onHeading = level => {
  props.editor.chain().focus().toggleHeading({ level }).run()
}

// Colors
const colorsMap = ref({
  purple: "#5f00d7",
  pink: "#d1007c",
  green: "#d4ff38",
})
const isColorPurpleDisabled = computed(() => !props.editor.can().chain().focus().setColor(colorsMap.value.purple).run())
const isColorPurpleActive = computed(() => props.editor.isActive("textStyle", { color: colorsMap.value.purple }))
const isColorPinkDisabled = computed(() => !props.editor.can().chain().focus().setColor(colorsMap.value.pink).run())
const isColorPinkActive = computed(() => props.editor.isActive("textStyle", { color: colorsMap.value.pink }))
const isColorGreenDisabled = computed(() => !props.editor.can().chain().focus().setColor(colorsMap.value.green).run())
const isColorGreenActive = computed(() => props.editor.isActive("textStyle", { color: colorsMap.value.green }))
const onColor = (color, isActive) => {
  if (isActive) {
    props.editor.chain().focus().unsetColor().run()
  } else {
    props.editor.chain().focus().setColor(color).run()
  }
}

// Code
const isCodeDisabled = computed(() => !props.editor.can().chain().focus().toggleCodeBlock().run())
const isCodeActive = computed(() => props.editor.isActive('codeBlock'))
const onCode = () => {
  props.editor.chain().focus().toggleCodeBlock().run()
}

// Blockquote
const isBlockquoteDisabled = computed(() => !props.editor.can().chain().focus().toggleBlockquote().run())
const isBlockquoteActive = computed(() => props.editor.isActive('blockquote'))
const onBlockquote = () => {
  props.editor.chain().focus().toggleBlockquote().run()
}

// HorizontalRule
const onHorizontalRule = () => {
  props.editor.chain().focus().setHorizontalRule().run()
}

// Undo
const isUndoDisabled = computed(() => !props.editor.can().chain().focus().undo().run())
const onUndo = () => {
  props.editor.chain().focus().undo().run()
}

// Redo
const isRedoDisabled = computed(() => !props.editor.can().chain().focus().redo().run())
const onRedo = () => {
  props.editor.chain().focus().redo().run()
}

// Close
const onClose = () => props.editor.chain().blur() && emit("close")
</script>

<template>
  <div class="ui-editor-panel">
    <div class="ui-editor-panel__offset"></div>
    <div class="ui-editor-panel__content">
      <section class="ui-editor-panel__group">
        <Button @click="onBold" icon="bold" :disabled="isBoldDisabled" :active="isBoldActive" />
        <Button @click="onItalic" icon="italic" :disabled="isItalicDisabled" :active="isItalicActive" />
        <Button @click="onUnderline" icon="underline" :disabled="isUnderlineDisabled" :active="isUnderlineActive" />
        <Button @click="onStrike" icon="strikethrough" :disabled="isStrikeDisabled" :active="isStrikeActive" />
      </section>

      <div class="ui-editor-panel__delimiter"></div>

      <section class="ui-editor-panel__group">
        <Button @click="onHeading(1)" icon="heading" :disabled="isH1Disabled" :active="isH1Active" />
        <!-- <Button @click="onHeading(2)" icon="heading" :disabled="isH2Disabled" :active="isH2Active" />
      <Button @click="onHeading(3)" icon="heading" :disabled="isH3Disabled" :active="isH3Active" />
      <Button @click="onHeading(4)" icon="heading" :disabled="isH4Disabled" :active="isH4Active" />
      <Button @click="onHeading(5)" icon="heading" :disabled="isH5Disabled" :active="isH5Active" />
      <Button @click="onHeading(6)" icon="heading" :disabled="isH6Disabled" :active="isH6Active" /> -->
      </section>

      <div class="ui-editor-panel__delimiter"></div>

      <section class="ui-editor-panel__group">
        <Button @click="onBulletList" icon="list-ul" :disabled="isBulletListDisabled" :active="isBulletListActive" />
        <Button @click="onOrderedList" icon="list-ol" :disabled="isOrderedListDisabled" :active="isOrderedListActive" />
      </section>

      <div class="ui-editor-panel__delimiter"></div>

      <section class="ui-editor-panel__group">
        <!-- <Button @click="onCode" icon="code" :disabled="isCodeDisabled" :active="isCodeActive" /> -->
        <!-- <Button @click="onBlockquote" icon="quote-right" :disabled="isBlockquoteDisabled" :active="isBlockquoteActive" /> -->
        <Button @click="onHorizontalRule" icon="window-minimize" />
      </section>

      <!-- <div class="ui-editor-panel__delimiter"></div> -->

      <!-- <section class="ui-editor-panel__group">
      <Button @click="onColor(null, true)" icon="circle" />
      <Button @click="onColor(colorsMap.purple, isColorPurpleActive)" icon="circle" :color="colorsMap.purple"
        :disabled="isColorPurpleDisabled" :active="isColorPurpleActive" />
      <Button @click="onColor(colorsMap.pink, isColorPinkActive)" icon="circle" :color="colorsMap.pink"
        :disabled="isColorPinkDisabled" :active="isColorPinkActive" />
      <Button @click="onColor(colorsMap.green, isColorGreenActive)" icon="circle" :color="colorsMap.green"
        :disabled="isColorGreenDisabled" :active="isColorGreenActive" />
    </section> -->

      <div class="ui-editor-panel__delimiter"></div>

      <section class="ui-editor-panel__group">
        <Button @click="onUndo" icon="undo" :disabled="isUndoDisabled" />
        <Button v-if="hasClose" @click="onClose" icon="caret-down" />
        <!-- <Button @click="onRedo" icon="redo" :disabled="isRedoDisabled" /> -->
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "@styles/media";
@use "@styles/colors";

.ui-editor-panel {
  border-radius: 5px;
  max-width: 100%;
  box-shadow: 0px 5px 20px 1px colors.$shadow;
  background: colors.$absorbing;
  overflow: hidden;

  &__offset {
    background: colors.$shadow;
    height: 2px;
  }

  &__content {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: wrap;
    gap: 20px;
    padding: 10px;
  }


  &__delimiter {
    width: 1px;
    background: color.change(colors.$basic, $alpha: 20%);
  }

  &__group {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    gap: 5px;
  }
}

@include media.lg() {
  .ui-editor-panel {
    &__content {
      gap: 10px;
    }
  }
}

@include media.sm() {
  .ui-editor-panel {
    &__offset {
      display: none;
    }

    &__content {
      justify-content: space-evenly;
      padding: 10px 5px;
      gap: 10px;
      box-shadow: 0px -15px 100px 5px colors.$shadow;
    }

    &__delimiter {
      display: none;
    }
  }
}
</style>
