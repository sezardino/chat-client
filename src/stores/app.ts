import { defineStore } from "pinia";
import type { Message, Notification, Room, User } from "@/types";

interface Store {
  user: User | null;
  toasts: Notification[];
  rooms: Room[];
  messages: Message[];
}

export const useApp = defineStore({
  id: "app",
  state: (): Store => ({
    user: null,
    toasts: [],
    rooms: [],
    messages: [],
  }),
  getters: {},
  actions: {
    setUser(user: User | null) {
      this.user = user;
    },
    setMessages(messages: Message[]) {
      this.messages = messages;
    },
    addRoom(room: Room) {
      if (!this.user) {
        return;
      }

      this.rooms.push(room);
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
