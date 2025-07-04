import { createRouter, createWebHistory } from "vue-router"
import IndexView from "@views/Index.vue"
import AllView from "@views/All.vue"
import PinnedView from "@views/Pinned.vue"
import DraftsView from "@views/Drafts.vue"
import TrashView from "@views/Trash.vue"
import ArchiveView from "@views/Archive.vue"
import PublishedView from "@views/Published.vue"
import TopicView from "@views/Topic.vue"
import WoojView from "@views/Wooj.vue"
// import Auth from "@views/Auth.vue"
// import Clean from "../layouts/Clean.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Index",
      component: IndexView,
    },
    {
      path: "/all",
      name: "All",
      component: AllView,
    },
    {
      path: "/pinned",
      name: "Pinned",
      component: PinnedView,
    },
    {
      path: "/published",
      name: "Published",
      component: PublishedView,
    },
    {
      path: "/drafts",
      name: "Drafts",
      component: DraftsView,
    },
    {
      path: "/archive",
      name: "Archive",
      component: ArchiveView,
    },
    {
      path: "/trash",
      name: "Trash",
      component: TrashView,
    },
    {
      path: "/topic/:topicId(\\d+)",
      name: "Topic",
      component: TopicView,
      props: true,
    },
    {
      path: "/wooj/:woojId(\\d+)",
      name: "Wooj",
      component: WoojView,
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
