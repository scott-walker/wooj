import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Index",
      component: () => import("@views/All.vue"),
    },
    {
      path: "/pinned",
      name: "Pinned",
      component: () => import("@views/Pinned.vue"),
    },
    // {
    //   path: "/published",
    //   name: "Published",
    //   component: PublishedView,
    // },
    // {
    //   path: "/drafts",
    //   name: "Drafts",
    //   component: DraftsView,
    // },
    // {
    //   path: "/archive",
    //   name: "Archive",
    //   component: ArchiveView,
    // },
    {
      path: "/trash",
      name: "Trash",
      component: () => import("@views/Trash.vue"),
    },
    {
      path: "/topic/:topicId(\\d+)",
      name: "Topic",
      component: () => import("@views/Topic.vue"),
      props: true,
    },
    {
      path: "/wooj/:woojId(\\d+)",
      name: "Wooj",
      component: () => import("@views/Wooj.vue"),
      props: true,
    },
  ],
})

export default router
