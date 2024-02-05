import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { Server as WebSocketServer } from 'socket.io';
import type { ClientToServerEvents, ServerToClientEvents } from '$lib/socket';
import type { ViteDevServer } from 'vite';

const webSocketServer = {
  name: "webSocketServer",
  configureServer(server: ViteDevServer) {
    if (!server.httpServer) return;

    const io = new WebSocketServer<
      ClientToServerEvents, ServerToClientEvents
    >(server.httpServer);

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
  }
}

export default defineConfig({
  plugins: [
    sveltekit(),
    webSocketServer,
    visualizer({
      emitFile: true,
      gzipSize: true,
      filename: "stats.html",
    }),
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  },
});
