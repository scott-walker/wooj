import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueDevTools from "vite-plugin-vue-devtools"

const PATH_SRC = fileURLToPath(new URL("./src", import.meta.url))
const vueOptions = {
  template: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith("swiper-"),
    },
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(vueOptions), vueDevTools()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("axios")) {
            return "axios"
          } else if (id.includes("lodash")) {
            return "lodash"
          } else if (id.includes("prosemirror")) {
            return "prosemirror"
          } else if (id.includes("vue")) {
            return "vue"
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": PATH_SRC,
      "@utils": `${PATH_SRC}/utils`,
      "@services": `${PATH_SRC}/services`,
      "@directives": `${PATH_SRC}/directives`,
      "@plugins": `${PATH_SRC}/plugins`,
      "@components": `${PATH_SRC}/components`,
      "@composables": `${PATH_SRC}/composables`,
      "@ui": `${PATH_SRC}/components/ui`,
      "@stores": `${PATH_SRC}/stores`,
      "@layouts": `${PATH_SRC}/layouts`,
      "@views": `${PATH_SRC}/views`,
      "@assets": `${PATH_SRC}/assets`,
      "@styles": `${PATH_SRC}/assets/styles`,
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
