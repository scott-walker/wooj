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
      "@components": `${PATH_SRC}/components`,
      "@views": `${PATH_SRC}/views`,
      "@styles": PATH_STYLES,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          // @import "${PATH_STYLES}/_common.scss";
        `,
      },
    },
  },
})
