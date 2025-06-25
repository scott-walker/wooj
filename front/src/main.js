import "bulma"
import "@styles/app.scss"

import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"
import initUtils from "@utils"
import initServices from "@services"
import InjectPlugin from "@plugins/InjectPlugin"
import SwiperPlugin from "@plugins/SwiperPlugin"

const utils = initUtils({
  httpClient: {
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  },
})
const services = initServices(utils)
const app = createApp(App)

app.use(InjectPlugin, { utils, services })
app.use(SwiperPlugin)
app.use(createPinia())
app.use(router)

app.mount("#app")
