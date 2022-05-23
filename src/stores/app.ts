import type { Notification } from "@/types";
import { defineStore } from "pinia";

interface Store {
  toasts: Notification[];
}

export const useApp = defineStore({
  id: "app",
  state: (): Store => ({
    toasts: [],
  }),
  getters: {},
  actions: {
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
