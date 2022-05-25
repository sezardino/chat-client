import { createRouter, createWebHistory } from "vue-router";
import { Layouts, PageRoutes } from "@/common";
import Home from "@/views/HomeView.vue";
import { useApp } from "@/stores";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: PageRoutes.HOME,
      name: "home",
      component: Home,
      meta: { layout: Layouts.DEFAULT },
    },
    {
      path: PageRoutes.HELP,
      name: "help",
      component: () => import("../views/HelpView.vue"),
      meta: { layout: Layouts.DEFAULT },
    },
    {
      path: PageRoutes.LOGIN,
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: { layout: Layouts.WITH_TOAST },
    },
    {
      path: PageRoutes.CHATS,
      name: "chats",
      component: () => import("../views/ChatsView.vue"),
      meta: { auth: true, layout: Layouts.WITH_TOAST },
    },
  ],
});

router.beforeEach((to, _, next) => {
  const store = useApp();

  if (to.meta.auth && !store.user) {
    next(PageRoutes.LOGIN);
    return;
  }

  next();
});

export default router;
