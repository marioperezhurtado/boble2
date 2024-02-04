import express from 'express';
import { createServer } from 'http';
import { Server as WebSocketServer } from 'socket.io';

import { handler } from "./build/handler.js";

const port = 3000;
const app = express();
const server = createServer(app);

const io = new WebSocketServer(server);

io.on("connection", (socket) => {
  socket.on("join", (chatId) => socket.join(chatId));

  socket.on("message", async (message) => {
    io.to(message.chatId).emit("message", message);
  });

  socket.on("deleteMessage", async (messageId, chatId) => {
    io.to(chatId).emit("deleteMessage", messageId, chatId);
  });
});

/* 
 * SvelteKit should handle everything else using Express middleware
 * https://kit.svelte.dev/docs/adapter-node#custom-server
*/
app.use(handler);

server.listen(port, () => {
  console.log("Listening on port", port);
});
