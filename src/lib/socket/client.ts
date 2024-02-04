import { io } from "socket.io-client";
import type { Message } from "$lib/db/message/getMessages";
import type { ServerToClientEvents, ClientToServerEvents } from "$lib/socket";
import type { Socket } from "socket.io-client";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

export function joinChat(chatId: string) {
  socket.emit("join", chatId);
}

export function sendMessage(message: Message) {
  socket.emit("message", message);
}

export function removeMessage(messageId: string, chatId: string) {
  socket.emit("deleteMessage", messageId, chatId);
}

export function onMessage(callback: (message: Message) => void) {
  socket.on("message", callback);
}

export function onDeleteMessage(callback: (messageId: string, chatId: string) => void) {
  socket.on("deleteMessage", callback);
}

export function unsubscribeFromMessages() {
  socket.off("message");
  socket.off("deleteMessage");
}
