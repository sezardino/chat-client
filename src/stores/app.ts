import { defineStore } from "pinia";
import {
  getErrNotification,
  getSuccessNotification,
  socketClient,
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

export const useAppStore = defineStore({
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
    connect() {
      socketClient.connect();
    },
    async login(name: string, successHandler: () => void) {
      try {
        const user = await socketClient.login(name);

        this.setUser(user);
        this.addToast(getSuccessNotification("Login successful"));
        successHandler();
      } catch (error) {
        this.addToast(getErrNotification(error as string));
      }
    },
    async logout() {
      if (!this.user) {
        return;
      }

      try {
        await socketClient.logout(this.user.id);

        this.setUser(null);
        this.setRooms([]);
        this.addToast(getSuccessNotification("Logout successful"));
      } catch (error) {
        this.addToast(getErrNotification(error as string));
      }
    },
    async createRoom(name: Room["name"], successHandler: () => void) {
      if (!this.user) {
        return this.addToast(
          getErrNotification("You must be logged in to create a room")
        );
      }

      try {
        const newRoom = await socketClient.createRoom({
          name,
          userId: this.user.id,
        });

        this.addRoom(newRoom);
        this.addToast(getSuccessNotification("Room created"));
        successHandler();
      } catch (error) {
        this.addToast(getErrNotification(error as string));
      }
    },
    async joinRoom(roomName: Room["name"], successHandler: () => void) {
      if (!this.user) {
        return this.addToast(
          getErrNotification("You must be logged in to join a room")
        );
      }

      try {
        const room = await socketClient.joinRoom({
          roomName,
          userId: this.user.id,
        });
        this.addRoom(room);
        this.addToast(getSuccessNotification("Room joined"));
        successHandler();
      } catch (error) {
        this.addToast(getErrNotification(error as string));
      }
    },
    async sendMessage(body: string) {
      if (!this.user) {
        return this.addToast(
          getErrNotification("You must be logged in to send a message")
        );
      }

      if (!this.rooms[0]) {
        return this.addToast(
          getErrNotification("You must be in a room to send a message")
        );
      }

      try {
        const message: Pick<Message, "body" | "from"> = {
          body,
          from: this.user,
        };
        await socketClient.sendMessage({
          room: this.rooms[0].id,
          message,
        });
      } catch (error) {
        this.addToast(getErrNotification(error as string));
      }
    },

    async subscribe() {
      if (!this.user) {
        return;
      }

      if (!this.rooms[0]) {
        return;
      }

      await socketClient.subscribe(this.setMessages);
    },
  },
});
