import { defineStore } from "pinia";
import {
  getErrNotification,
  type Message,
  type Notification,
  type Room,
  type User,
} from "@/common";

interface Store {
  user: User | null;
  toasts: Notification[];
  rooms: Room[];
}

export const useApp = defineStore({
  id: "app",
  state: (): Store => ({
    user: null,
    toasts: [],
    rooms: [],
  }),
  getters: {},
  actions: {
    setUser(user: User | null) {
      this.user = user;
    },
    setRooms(rooms: Room[]) {
      this.rooms = rooms;
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
    setMessages(messages: Message[]) {
      if (!this.rooms[0]) {
        return this.addToast(getErrNotification("Room not found"));
      }

      this.rooms[0].messages = messages;
    },
  },
});
