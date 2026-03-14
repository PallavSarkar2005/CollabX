import "dotenv/config";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import prisma from "./config/db";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

type Rooms = {
  [key: string]: string[];
};

const rooms: Rooms = {};
const saveTimers: Record<string, NodeJS.Timeout> = {};

io.on("connection", (socket) => {
  socket.on(
    "join-room",
    async ({ roomId, username }: { roomId: string; username: string }) => {
      socket.join(roomId);

      if (!rooms[roomId]) {
        rooms[roomId] = [];
      }

      rooms[roomId].push(username);

      io.to(roomId).emit("room-users", rooms[roomId]);

      let room = await prisma.room.findUnique({
        where: { id: roomId },
      });

      if (!room) {
        room = await prisma.room.create({
          data: { id: roomId, code: "" },
        });
      }

      socket.emit("load-code", room.code);
    },
  );

  socket.on(
    "code-change",
    ({ roomId, code }: { roomId: string; code: string }) => {
      socket.to(roomId).emit("code-update", code);

      if (saveTimers[roomId]) {
        clearTimeout(saveTimers[roomId]);
      }

      saveTimers[roomId] = setTimeout(async () => {
        await prisma.room.upsert({
          where: { id: roomId },
          update: { code },
          create: { id: roomId, code },
        });
      }, 2000);
    },
  );

  socket.on(
    "send-message",
    ({
      roomId,
      message,
      username,
    }: {
      roomId: string;
      message: string;
      username: string;
    }) => {
      io.to(roomId).emit("receive-message", {
        username,
        message,
        time: new Date().toLocaleTimeString(),
      });
    },
  );

  socket.on("disconnect", () => {});
});

app.get("/", (_req, res) => {
  res.send("CollabX backend running");
});

server.listen(5000);
