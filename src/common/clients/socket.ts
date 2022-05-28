import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import type {
  SocketClToSrvEvt,
  SocketSrvToClEvt,
  SendMessageDto,
  CreateRoomDto,
  JoinRoomDto,
  LoginDto,
  Message,
  User,
  Room,
} from "@/common";
import { ClientEvents, ServerEvents, type NewMessageDto } from "../types";

class SocketClient {
  io: Socket<SocketSrvToClEvt, SocketClToSrvEvt> | null;

  constructor(private readonly url: string) {
    this.io = null;
  }

  connect() {
    if (!this.url) {
      throw new Error("No url provided");
    }

    this.io = io(this.url, { transports: ["websocket", "polling"] });
  }

  login(name: User["name"]): Promise<User> {
    return new Promise((resolve, reject) => {
      if (!this.io) {
        return reject("No socket connection");
      }

      const dto: LoginDto = { name, id: this.io.id };
      this.io.emit(ClientEvents.LOGIN, dto);

      this.io.once(ServerEvents.LOGIN_FAIL, reject);
      this.io.once(ServerEvents.LOGIN_SUCCESS, resolve);
    });
  }

  logout(userId: User["id"]): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.io) {
        return reject("No socket connection");
      }

      this.io.emit(ClientEvents.LOGOUT, userId);

      this.io.once(ServerEvents.OUT_FAIL, reject);
      this.io.once(ServerEvents.OUT_SUCCESS, resolve);
      this.io.disconnect();
      this.connect();
      resolve();
    });
  }

  createRoom(dto: CreateRoomDto): Promise<Room> {
    return new Promise((resolve, reject) => {
      if (!this.io) {
        return reject("No socket connection");
      }

      this.io.emit(ClientEvents.CREATE_ROOM, dto);

      this.io.once(ServerEvents.CREATE_ROOM_FAIL, reject);
      this.io.once(ServerEvents.CREATE_ROOM_SUCCESS, resolve);
    });
  }

  joinRoom(dto: JoinRoomDto): Promise<Room> {
    return new Promise((resolve, reject) => {
      if (!this.io) {
        return reject("No socket connection");
      }

      this.io.emit(ClientEvents.JOIN_ROOM, dto);

      this.io.once(ServerEvents.JOIN_ROOM_FAIL, reject);
      this.io.once(ServerEvents.JOIN_ROOM_SUCCESS, resolve);
    });
  }

  sendMessage(dto: SendMessageDto): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.io) {
        return reject("No socket connection");
      }

      this.io.emit(ClientEvents.SEND_MESSAGE, dto);

      this.io.once(ServerEvents.SEND_MESSAGE_FAIL, reject);
      this.io.once(ServerEvents.SEND_MESSAGE_SUCCESS, resolve);
    });
  }

  subscribe(cb: (messages: Message[]) => void): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.io) {
        return reject("No socket connection");
      }

      this.io.on(ServerEvents.NEW_MESSAGE, cb);
      resolve();
    });
  }
  disconnect(userId: User["id"]) {
    if (!this.io) {
      return;
    }

    this.io.emit(ClientEvents.DISCONNECT, userId);
  }
}

export const socketClient = new SocketClient(import.meta.env.VITE_API_URL);
