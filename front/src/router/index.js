import { createRouter, createWebHistory } from "vue-router"
import Index from "@views/Index.vue"
import Notes from "@views/Notes.vue"
import Auth from "@views/Auth.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index,
    },
    {
      path: "/notes",
      name: "Notes",
      component: Notes,
    },
    {
      path: "/auth",
      name: "Auth",
      component: Auth,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
