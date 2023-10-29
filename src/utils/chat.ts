import { io } from "socket.io-client";
import type { Messages, Message } from "~/db/getMessages";
import type { ServerToClientEvents, ClientToServerEvents } from "~/server";
import type { Socket } from "socket.io-client";

const socket: Socket<
  ServerToClientEvents, ClientToServerEvents
> = io("http://localhost:8000");

export function sendMessage(message: Messages[number]) {
  socket.emit("message", message);
}

export function joinChat(chatId: string) {
  socket.emit("join", chatId);
}

export function subscribeToMessages(callback: (message: Message) => void) {
  socket.on("message", callback);
}

export function unsubscribeFromMessages() {
  socket.off("message");
}
