import type { DefaultEventsMap } from "@socket.io/component-emitter";
import type { Socket } from "socket.io-client";
import { defineStore } from "pinia";

import type {
  Notification,
  CreateRoomDto,
  Room,
  ClientHandler,
  JoinRoomDto,
  SendMessageDto,
  NewMessageDto,
  RoomHandler,
  Message,
} from "@/common";
import { useApp } from "@/stores";
import {
  socketClient,
  getErrNotification,
  getSuccessNotification,
} from "@/common";

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
      socketClient.connect();
    },
    async login(name: string, successHandler: () => void) {
      const appStore = useApp();
      try {
        const user = await socketClient.login(name);

        appStore.setUser(user);
        appStore.addToast(getSuccessNotification("Login successful"));
        successHandler();
      } catch (error) {
        appStore.addToast(getErrNotification(error as string));
      }
    },
    async logout() {
      const appStore = useApp();

      if (!appStore.user) {
        return;
      }

      try {
        await socketClient.logout(appStore.user.id);

        appStore.setUser(null);
        appStore.setRooms([]);
        appStore.addToast(getSuccessNotification("Logout successful"));
      } catch (error) {
        appStore.addToast(getErrNotification(error as string));
      }
    },
    async createRoom(name: Room["name"], successHandler: () => void) {
      const appStore = useApp();

      if (!appStore.user) {
        return appStore.addToast(
          getErrNotification("You must be logged in to create a room")
        );
      }

      try {
        const newRoom = await socketClient.createRoom({
          name,
          userId: appStore.user.id,
        });

        appStore.addRoom(newRoom);
        appStore.addToast(getSuccessNotification("Room created"));
        successHandler();
      } catch (error) {
        appStore.addToast(getErrNotification(error as string));
      }
    },
    async joinRoom(roomName: Room["name"], successHandler: () => void) {
      const appStore = useApp();

      if (!appStore.user) {
        return appStore.addToast(
          getErrNotification("You must be logged in to join a room")
        );
      }

      try {
        const room = await socketClient.joinRoom({
          roomName,
          userId: appStore.user.id,
        });
        appStore.addRoom(room);
        appStore.addToast(getSuccessNotification("Room joined"));
        successHandler();
      } catch (error) {
        appStore.addToast(getErrNotification(error as string));
      }
    },
    sendMessage(body: string) {
      const appStore = useApp();

      if (!appStore.user) {
        return appStore.addToast(
          getErrNotification("You must be logged in to send a message")
        );
      }

      if (!appStore.rooms[0]) {
        return appStore.addToast(
          getErrNotification("You must be in a room to send a message")
        );
      }

      try {
        const message: Pick<Message, "body" | "from"> = {
          body,
          from: appStore.user.id,
        };
        socketClient.sendMessage({ message, room: appStore.rooms[0].id });
      } catch (error) {
        appStore.addToast(getErrNotification(error as string));
      }
    },

    async subscribe() {
      const appStore = useApp();

      if (!appStore.user) {
        return;
      }

      if (!appStore.rooms[0]) {
        return;
      }

      await socketClient.subscribe(appStore.setMessages);
    },
  },
});
