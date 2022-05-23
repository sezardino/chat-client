import { defineStore } from "pinia";
import type { Notification } from "@/types";

interface Store {
  user: string | null;
  toasts: Notification[];
}

export const useApp = defineStore({
  id: "app",
  state: (): Store => ({
    user: null,
    toasts: [],
  }),
  getters: {},
  actions: {
    setUser(user: string | null) {
      this.user = user;
    },
    addToast(notification: Notification, deleteDelay = 5000) {
      this.toasts.push(notification);

      setTimeout(() => {
        this.deleteToast(notification.title);
      }, deleteDelay);
    },
    deleteToast(title: Notification["title"]) {
      this.toasts = this.toasts.filter((toast) => toast.title !== title);
    },
  },
});
