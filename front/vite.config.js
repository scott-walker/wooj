import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueDevTools from "vite-plugin-vue-devtools"

const PATH_SRC = fileURLToPath(new URL("./src", import.meta.url))
const PATH_STYLES = `${PATH_SRC}/assets/styles`

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": PATH_SRC,
      "@utils": `${PATH_SRC}/utils`,
      "@services": `${PATH_SRC}/services`,
      "@plugins": `${PATH_SRC}/plugins`,
      "@components": `${PATH_SRC}/components`,
      "@layouts": `${PATH_SRC}/layouts`,
      "@views": `${PATH_SRC}/views`,
      "@styles": PATH_STYLES,
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `
  //         @import "${PATH_STYLES}/_common.scss";
  //       `,
  //     },
  //   },
  // },
})
