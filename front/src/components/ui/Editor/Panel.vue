<script setup>
import { ref, computed } from "vue"
import Button from "./Button.vue"

const props = defineProps({
  editor: Object,
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
</script>

<template>
  <div class="ui-editor-pamel">
    <section class="ui-editor-pamel__group">
      <Button @click="onBold" icon="bold" :disabled="isBoldDisabled" :active="isBoldActive" />
      <Button @click="onItalic" icon="italic" :disabled="isItalicDisabled" :active="isItalicActive" />
      <Button @click="onUnderline" icon="underline" :disabled="isUnderlineDisabled" :active="isUnderlineActive" />
      <Button @click="onStrike" icon="strikethrough" :disabled="isStrikeDisabled" :active="isStrikeActive" />
      <Button @click="onHeading(1)" icon="heading" :disabled="isH1Disabled" :active="isH1Active" />
      <!-- <Button @click="onHeading(2)" icon="heading" :disabled="isH2Disabled" :active="isH2Active" />
      <Button @click="onHeading(3)" icon="heading" :disabled="isH3Disabled" :active="isH3Active" />
      <Button @click="onHeading(4)" icon="heading" :disabled="isH4Disabled" :active="isH4Active" />
      <Button @click="onHeading(5)" icon="heading" :disabled="isH5Disabled" :active="isH5Active" />
      <Button @click="onHeading(6)" icon="heading" :disabled="isH6Disabled" :active="isH6Active" /> -->
    </section>

    <div class="ui-editor-pamel__delimiter"></div>

    <section class="ui-editor-pamel__group">
      <Button @click="onBulletList" icon="list-ul" :disabled="isBulletListDisabled" :active="isBulletListActive" />
      <Button @click="onOrderedList" icon="list-ol" :disabled="isOrderedListDisabled" :active="isOrderedListActive" />
    </section>

    <div class="ui-editor-pamel__delimiter"></div>

    <section class="ui-editor-pamel__group">
      <!-- <Button @click="onCode" icon="code" :disabled="isCodeDisabled" :active="isCodeActive" /> -->
      <!-- <Button @click="onBlockquote" icon="quote-right" :disabled="isBlockquoteDisabled" :active="isBlockquoteActive" /> -->
      <Button @click="onHorizontalRule" icon="window-minimize" />
    </section>

    <div class="ui-editor-pamel__delimiter"></div>

    <section class="ui-editor-pamel__group">
      <Button @click="onColor(null, true)" icon="circle" />
      <Button @click="onColor(colorsMap.purple, isColorPurpleActive)" icon="circle" :color="colorsMap.purple"
        :disabled="isColorPurpleDisabled" :active="isColorPurpleActive" />
      <Button @click="onColor(colorsMap.pink, isColorPinkActive)" icon="circle" :color="colorsMap.pink"
        :disabled="isColorPinkDisabled" :active="isColorPinkActive" />
      <!-- <Button @click="onColor(colorsMap.green, isColorGreenActive)" icon="circle" :color="colorsMap.green"
        :disabled="isColorGreenDisabled" :active="isColorGreenActive" /> -->
    </section>

    <div class="ui-editor-pamel__delimiter"></div>

    <section class="ui-editor-pamel__group">
      <Button @click="onUndo" icon="undo" :disabled="isUndoDisabled" />
      <Button @click="onRedo" icon="redo" :disabled="isRedoDisabled" />
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use "@styles/colors";

.ui-editor-pamel {
  display: flex;
  // justify-content: space-evenly;
  justify-content: flex-start;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 20px;
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  padding: 10px;
  box-shadow: rgba(16, 0, 75, 0.1) 0px 1px 3px 0px;
  background: colors.$absorbing;

  &__delimiter {
    width: 1px;
    background: rgba(16, 0, 75, 0.2);
  }

  &__group {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    gap: 5px;
    // padding: 0 15px;
    // border-right: 1px solid rgba(16, 0, 75, 0.2);

    &:first-child {
      // padding-left: 0;
    }

    &:last-child {
      // padding-right: 0;
      // border-right: none;
    }
  }
}
</style>
