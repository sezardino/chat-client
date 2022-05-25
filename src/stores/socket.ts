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
  SendMessageDto,
  NewMessageDto,
  RoomHandler,
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
    sendMessage(body: string) {
      const appStore = useApp();

      if (!this.socket || !appStore.user) {
        return;
      }

      const successHandler = (notification: Notification) => {
        appStore.addToast(notification);
      };

      const dto: SendMessageDto = {
        room: appStore.rooms[0].id,
        message: { from: appStore.user.id, body },
      };
      this.socket.emit("send-message", dto, successHandler);
    },
    createRoom(id: string, successHandler: ClientHandler) {
      if (!this.socket) {
        return;
      }

      const appStore = useApp();

      const handler: RoomHandler = (notification, room) => {
        appStore.addToast(notification);

        if (notification.type === "error") {
          return;
        }

        successHandler(notification);
        appStore.addRoom(room);
      };

      const dto: CreateRoomDto = { id };
      this.socket.emit("create-room", dto, handler);
    },
    joinRoom(roomId: string, successHandler: ClientHandler) {
      if (!this.socket) {
        return;
      }

      const appStore = useApp();

      const handler: RoomHandler = (notification, room) => {
        appStore.addToast(notification);

        if (notification.type === "error") {
          return;
        }

        successHandler(notification);
        appStore.addRoom(room);
      };

      const dto: JoinRoomDto = { roomId };
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

        appStore.user = { name, id: this.socket.id };
        successHandler();
      };

      const dto: LoginDto = { name, id: this.socket.id };
      this.socket.emit("login", dto, handler);
    },
    subscribeOnNewMessages(roomId: Room["id"]) {
      const appStore = useApp();

      if (!this.socket || !appStore.user) {
        return;
      }
      console.log(roomId);
      this.socket.on(`new-message-${roomId}`, (dto: NewMessageDto) => {
        console.log(dto);
        appStore.setMessages(dto.messages);
      });
    },
    unSubscribeOnNewMessages(roomId: string) {
      const appStore = useApp();

      if (!this.socket || !appStore.user) {
        return;
      }

      this.socket.off(`new-message-${roomId}`);
    },
  },
});
