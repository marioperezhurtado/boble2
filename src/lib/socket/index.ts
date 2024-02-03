import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server as WebSocketServer } from "socket.io";
import type { Message } from "$lib/db/message/getMessages";

dotenv.config();

export type ClientToServerEvents = {
  join: (chatId: string) => void;
  message: (message: Message) => void;
  deleteMessage: (messageId: string, chatId: string) => void;
};

export type ServerToClientEvents = {
  message: (message: Message) => void;
  deleteMessage: (messageId: string, chatId: string) => void;
};

const app = express();
const server = createServer(app);
const io = new WebSocketServer<
  ClientToServerEvents, ServerToClientEvents
>(server, {
  // Allow CORS
  cors: {
    origin: process.env.PUBLIC_SITE_URL,
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

  socket.on("deleteMessage", async (messageId, chatId) => {
    console.log("> Message deleted in chat: ", chatId, " - ", messageId);

    io.to(chatId).emit("deleteMessage", messageId, chatId);
  });

  socket.on("disconnect", () => {
    console.log("> Client disconnected");
  });
});

server.listen(8000, () => {
  console.log(">> Server is listening on port 8000");
});
