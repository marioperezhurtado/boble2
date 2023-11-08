import express from "express";
import { createServer } from "http";
import { Server as WebSocketServer } from "socket.io";
import type { Message } from "$lib/db/message/getMessages";

export type ClientToServerEvents = {
  join: (chatId: string) => void;
  message: (message: Message) => void;
};

export type ServerToClientEvents = {
  message: (message: Message) => void;
};

const app = express();
const server = createServer(app);
const io = new WebSocketServer<
  ClientToServerEvents, ServerToClientEvents
>(server, {
  // Allow CORS
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("> Client connected");

  socket.on("join", (chatId) => {
    console.log("> User joined to chat: ", chatId);
    socket.join(chatId);
  });

  socket.on("message", async (message) => {
    console.log("> Message in chat: ", message.chatId, " - ", message.text);

    io.to(message.chatId).emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("> Client disconnected");
  });
});

server.listen(8000, () => {
  console.log(">> Server is listening on port 8000");
});
