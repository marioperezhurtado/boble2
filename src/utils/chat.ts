import { io } from "socket.io-client";
import { createEffect, createSignal, onCleanup } from "solid-js";
import type { Messages } from "~/db/getMessages";
import type { ServerToClientEvents, ClientToServerEvents } from "~/server";
import type { Socket } from "socket.io-client";

const socket: Socket<
  ServerToClientEvents, ClientToServerEvents
> = io("http://localhost:8000");

export function sendMessage(message: Messages[number]) {
  socket.emit("message", message);
}

export function useMessages(initialMessages: Messages, chatId: string) {
  const [messages, setMessages] = createSignal(initialMessages);

  createEffect(() => socket.emit("join", chatId));

  socket.on("message", (message) => {
    setMessages((messages) => [...messages, message]);
  });

  onCleanup(() => socket.off("message"));

  return messages;
}
