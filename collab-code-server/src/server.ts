import "dotenv/config";

import express from "express";
import http from "http";
import cors from "cors";

import { Server } from "socket.io";

import prisma from "./config/db";

import aiRoutes from "./routes/aiRoutes";
import codeRoutes from "./routes/codeRoutes";

const app = express();

app.use(cors());

app.use(express.json());

/* ROUTES */

app.use("/api/code", codeRoutes);

app.use("/api/ai", aiRoutes);

/* HEALTH */

app.get("/", (_req, res) => {
  res.send("🚀 CollabX backend running");
});

/* HTTP SERVER */

const server = http.createServer(app);

/* SOCKET.IO */

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

/* TYPES */

interface User {
  socketId: string;
  username: string;
}

type RoomUsers = {
  [roomId: string]: User[];
};

const rooms: RoomUsers = {};

const saveTimers: Record<string, NodeJS.Timeout> = {};

/* SOCKET CONNECTION */

io.on("connection", (socket) => {
  console.log(`⚡ User connected: ${socket.id}`);

  /* JOIN ROOM */

  socket.on(
    "join-room",

    async ({ roomId, username }: { roomId: string; username: string }) => {
      socket.join(roomId);

      if (!rooms[roomId]) {
        rooms[roomId] = [];
      }

      const exists = rooms[roomId].find((u) => u.socketId === socket.id);

      if (!exists) {
        rooms[roomId].push({
          socketId: socket.id,
          username,
        });
      }

      io.to(roomId).emit(
        "room-users",

        rooms[roomId].map((u) => u.username),
      );

      let room = await prisma.room.findUnique({
        where: {
          id: roomId,
        },
      });

      if (!room) {
        room = await prisma.room.create({
          data: {
            id: roomId,
            code: "",
          },
        });
      }

      socket.emit("load-code", room.code);

      socket.to(roomId).emit("user-joined", {
        username,
      });

      console.log(`🚀 ${username} joined room ${roomId}`);
    },
  );

  /* CODE CHANGE */

  socket.on(
    "code-change",

    ({ roomId, code }: { roomId: string; code: string }) => {
      socket.to(roomId).emit("code-update", code);

      if (saveTimers[roomId]) {
        clearTimeout(saveTimers[roomId]);
      }

      saveTimers[roomId] = setTimeout(async () => {
        try {
          await prisma.room.upsert({
            where: {
              id: roomId,
            },

            update: {
              code,
            },

            create: {
              id: roomId,
              code,
            },
          });

          console.log(`💾 Room ${roomId} saved`);
        } catch (error) {
          console.log(error);
        }
      }, 1500);
    },
  );

  /* CHAT */

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
      io.to(roomId).emit(
        "receive-message",

        {
          username,
          message,
          time: new Date().toLocaleTimeString(),
        },
      );
    },
  );

  /* TYPING */

  socket.on(
    "typing",

    ({ roomId, username }: { roomId: string; username: string }) => {
      socket.to(roomId).emit("user-typing", username);
    },
  );

  socket.on(
    "stop-typing",

    ({ roomId }: { roomId: string }) => {
      socket.to(roomId).emit("user-stop-typing");
    },
  );

  /* FILES */

  socket.on(
    "file-update",

    ({ roomId, files }) => {
      socket.to(roomId).emit("files-updated", files);
    },
  );

  socket.on(
    "active-file-change",

    ({ roomId, activeFile }) => {
      socket.to(roomId).emit("active-file-updated", activeFile);
    },
  );

  /* DISCONNECT */

  socket.on(
    "disconnect",

    () => {
      Object.keys(rooms).forEach((roomId) => {
        const user = rooms[roomId].find((u) => u.socketId === socket.id);

        rooms[roomId] = rooms[roomId].filter((u) => u.socketId !== socket.id);

        io.to(roomId).emit(
          "room-users",

          rooms[roomId].map((u) => u.username),
        );

        if (user) {
          io.to(roomId).emit(
            "user-left",

            {
              username: user.username,
            },
          );

          console.log(`❌ ${user.username} left room ${roomId}`);
        }

        if (rooms[roomId].length === 0) {
          delete rooms[roomId];
        }
      });

      console.log(`🔌 Disconnected: ${socket.id}`);
    },
  );
});

/* START SERVER */

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
