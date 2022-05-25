import type { Room } from "./models";

export interface Notification {
  type: "error" | "success" | "info";
  title: string;
}

export enum Layouts {
  DEFAULT = "default",
  WITH_TOAST = "with-toast",
}

export enum PageRoutes {
  HOME = "/",
  HELP = "/help",
  LOGIN = "/login",
  CHATS = "/chats",
}

export type ClientHandler = (notification: Notification) => void;

export type RoomHandler = (notification: Notification, room: Room) => void;
