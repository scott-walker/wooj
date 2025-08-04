import "normalize.css"
import "@styles/app.scss"

import { createApp } from "vue"
import { createPinia } from "pinia"
import { PerfectScrollbarPlugin } from "vue3-perfect-scrollbar"
import Vue3TouchEvents from "vue3-touch-events"

import App from "./App.vue"
import router from "./router"
import initUtils from "@utils"
import initServices from "@services"
import InjectPlugin from "@plugins/InjectPlugin"
import SwiperPlugin from "@plugins/SwiperPlugin"
import DeferredTimerPlugin from "@plugins/DeferredTimerPlugin"

const utils = initUtils({
  httpClient: {
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  },
})
const services = initServices(utils)
const app = createApp(App)

app.use(Vue3TouchEvents)
app.use(PerfectScrollbarPlugin, {
  componentName: "Scrollbar",
})
app.use(InjectPlugin, { utils, services })
app.use(SwiperPlugin)
app.use(DeferredTimerPlugin)

app.use(createPinia())
app.use(router)

app.mount("#app")
