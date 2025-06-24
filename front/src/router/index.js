import { createRouter, createWebHistory } from "vue-router"
import Index from "@views/Index.vue"
import Wooj from "@views/Wooj.vue"
// import Auth from "@views/Auth.vue"
// import Clean from "../layouts/Clean.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index,
    },
    {
      path: "/wooj/:woojId(\\d+)",
      name: "Wooj",
      component: Wooj,
      props: true,
    },
    // {
    //   path: "/auth",
    //   name: "Auth",
    //   component: Auth,
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
