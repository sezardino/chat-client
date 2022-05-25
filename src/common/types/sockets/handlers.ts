import type {
  ClientHandler,
  CreateRoomDto,
  JoinRoomDto,
  LoginDto,
  NewMessageDto,
  SendMessageDto,
  User,
  Room,
} from "@/common";
import type { Message } from "../models";

import type { ServerEvents, ClientEvents } from "./events";

export interface SocketSrvToClEvt {
  [ServerEvents.LOGIN_SUCCESS]: (user: User) => void;
  [ServerEvents.LOGIN_FAIL]: (err: string) => void;
  [ServerEvents.OUT_FAIL]: (err: string) => void;
  [ServerEvents.NEW_MESSAGE]: (messages: Message[]) => void;
  [ServerEvents.OUT_SUCCESS]: () => void;
  [ServerEvents.CREATE_ROOM_FAIL]: (err: string) => void;
  [ServerEvents.CREATE_ROOM_SUCCESS]: (room: Room) => void;
  [ServerEvents.JOIN_ROOM_SUCCESS]: (room: Room) => void;
  [ServerEvents.JOIN_ROOM_FAIL]: (err: string) => void;
}

export interface SocketClToSrvEvt {
  [ClientEvents.LOGIN]: (dto: LoginDto) => void;
  [ClientEvents.LOGOUT]: (userId: User["id"]) => void;
  [ClientEvents.CREATE_ROOM]: (dto: CreateRoomDto) => void;
  [ClientEvents.JOIN_ROOM]: (dto: JoinRoomDto) => void;
  [ClientEvents.SEND_MESSAGE]: (dto: SendMessageDto) => void;
  [ClientEvents.DISCONNECT]: (userId: User["id"]) => void;
}
