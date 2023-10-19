import { io } from "socket.io-client";
import { createSignal, onCleanup } from "solid-js";

const socket = io("http://localhost:8000");

export function sendMessage(text: string) {
  socket.emit("message", text);
}

export function useMessages() {
  const [messages, setMessages] = createSignal<string[]>([]);

  socket.on("message", (message: string) => {
    setMessages((messages) => [...messages, message]);
  });

  onCleanup(() => socket.off("message"));

  return messages;
}
