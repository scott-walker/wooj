import { ref } from "vue"
import MediaDetector from "@utils/MediaDetector"

// const md = inject("mediaDetector")
const md = new MediaDetector()

const width = ref(null)
const height = ref(null)

const isPortrait = ref(null)
const isLandscape = ref(null)

const isMobile = ref(null)
const isTablet = ref(null)
const isDesctop = ref(null)

const isXs = ref(null)
const isSm = ref(null)
const isMd = ref(null)
const isLg = ref(null)
const isXl = ref(null)

const updateSize = () => {
  width.value = md.width
  height.value = md.height

  isPortrait.value = md.isPortrait()
  isLandscape.value = md.isLandscape()

  isMobile.value = md.isMobileScreen()
  isTablet.value = md.isTabletScreen()
  isDesctop.value = md.isDesctopScreen()

  isXs.value = md.isXs()
  isSm.value = md.isSm()
  isMd.value = md.isMd()
  isLg.value = md.isLg()
  isXl.value = md.isXl()
}

const updateOrientation = () => {
  width.value = md.width
  height.value = md.height

  isPortrait.value = md.isPortrait()
  isLandscape.value = md.isLandscape()
}

md.onResize("global", updateSize)
md.onOrientation("global", updateOrientation)

// onMounted(() => {
//   console.log("MD onMounted")
//   md.onResize("global", updateSize)
//   md.onOrientation("global", updateOrientation)
// })

// onUnmounted(() => {
//   console.log("MD onUnmounted")
//   md.offResize("global", updateSize)
//   md.offOrientation("global", updateOrientation)
// })

export const useMediaDetector = () => {
  updateSize()

  return {
    width,
    height,

    isPortrait,
    isLandscape,

    isMobile,
    isTablet,
    isDesctop,

    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
  }
}
