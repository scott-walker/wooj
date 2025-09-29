import "normalize.css"
import "@styles/app.scss"

import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"
import initUtils from "./utils"
import initServices from "./services"
import directives from "./directives"
import InjectPlugin from "@plugins/InjectPlugin"
// import SwiperPlugin from "@plugins/SwiperPlugin"
import DeferredTimerPlugin from "@plugins/DeferredTimerPlugin"

const utils = initUtils({
  httpClient: {
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  },
})
const services = initServices(utils)
const app = createApp(App)

app.use(InjectPlugin, { utils, services, directives })
// app.use(SwiperPlugin)
app.use(DeferredTimerPlugin)

app.use(createPinia())
app.use(router)

app.mount("#app")
