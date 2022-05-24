import type { DefaultEventsMap } from "@socket.io/component-emitter";
import { io, Socket } from "socket.io-client";
import { defineStore } from "pinia";

import type {
  Notification,
  CreateRoomDto,
  LoginDto,
  Room,
  ClientHandler,
  JoinRoomDto,
} from "@/types";
import { useApp } from "@/stores";

interface Store {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
}

export const useSocketStore = defineStore({
  id: "socket",
  state: (): Store => ({
    socket: null,
  }),
  getters: {},
  actions: {
    connect() {
      if (!import.meta.env.VITE_API_URL) {
        return;
      }

      this.socket = io(import.meta.env.VITE_API_URL, {
        transports: ["websocket", "polling"],
      });
    },
    sendMessage() {
      if (!this.socket) {
        return;
      }
      this.socket.emit("send-message", "Hello");
    },
    createRoom(id: string, successHandler: ClientHandler) {
      if (!this.socket) {
        return;
      }

      const appStore = useApp();
      const newRoom: Room = { id };

      const handler = (notification: Notification) => {
        appStore.addToast(notification);

        if (notification.type === "error") {
          return;
        }

        successHandler(notification);
        appStore.addRoom(newRoom);
      };

      const dto: CreateRoomDto = newRoom;
      this.socket.emit("create-room", dto, handler);
    },
    joinRoom(room: string, successHandler: ClientHandler) {
      if (!this.socket) {
        return;
      }

      const appStore = useApp();
      const newRoom: Room = { id: room };

      const handler = (notification: Notification) => {
        appStore.addToast(notification);

        if (notification.type === "error") {
          return;
        }

        successHandler(notification);
        appStore.addRoom(newRoom);
      };

      const dto: JoinRoomDto = { room };
      this.socket.emit("join-room", dto, handler);
    },
    disconnect() {
      if (!this.socket) {
        return;
      }

      this.socket.disconnect();
      this.socket = null;
    },
    logout() {
      const appStore = useApp();
      if (!this.socket) {
        return;
      }

      const handler = (notification: Notification) => {
        appStore.addToast(notification);

        if (notification.type === "error") {
          return;
        }

        appStore.user = null;
      };

      this.socket.emit("logout", handler);
    },
    login(name: string, successHandler: () => void) {
      const appStore = useApp();
      if (!this.socket) {
        return;
      }

      const handler = (notification: Notification) => {
        appStore.addToast(notification);

        if (notification.type === "error" || !this.socket) {
          return;
        }

        appStore.user = { name, id: this.socket.id, rooms: [] };
        successHandler();
      };

      const dto: LoginDto = { name, id: this.socket.id };
      this.socket.emit("login", dto, handler);
    },
  },
});
