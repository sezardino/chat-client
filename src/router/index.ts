import { useApp } from "@/stores";
import { Layouts } from "@/types";
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { layout: Layouts.DEFAULT },
    },
    {
      path: "/help",
      name: "help",
      component: () => import("../views/HelpView.vue"),
      meta: { layout: Layouts.DEFAULT },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: { layout: Layouts.WITH_TOAST },
    },
    {
      path: "/chats",
      name: "chats",
      component: () => import("../views/ChatsView.vue"),
      meta: { auth: true, layout: Layouts.WITH_TOAST },
    },
  ],
});

router.beforeEach((to, _, next) => {
  const store = useApp();

  if (to.meta.auth && !store.user) {
    next("/login");
    return;
  }

  next();
});

export default router;
