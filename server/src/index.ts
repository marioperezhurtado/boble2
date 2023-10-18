import express from "express"
import { createServer } from "http";
import { Server as WebSocketServer } from "socket.io";

const app = express();
const server = createServer(app);
const io = new WebSocketServer(server, {
  // Allow CORS
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("> Client connected");

  socket.on("message", (data) => {
    console.log("> Received message:", data);
    socket.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("> Client disconnected");
  });
});

server.listen(8000, () => {
  console.log(">> Server is listening on port 8000");
});
