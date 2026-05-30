import "dotenv/config";

import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import prisma from "./config/db";
import codeRoutes from "./routes/codeRoutes";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/code", codeRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

interface User {
  socketId: string;
  username: string;
}

type RoomUsers = {
  [roomId: string]: User[];
};

const rooms: RoomUsers = {};

const saveTimers: Record<string, NodeJS.Timeout> = {};

io.on("connection", (socket) => {
  console.log(`⚡ User connected: ${socket.id}`);

  socket.on(
    "join-room",

    async ({ roomId, username }: { roomId: string; username: string }) => {
      socket.join(roomId);

      if (!rooms[roomId]) {
        rooms[roomId] = [];
      }

      const existingUser = rooms[roomId].find(
        (user) => user.socketId === socket.id,
      );

      if (!existingUser) {
        rooms[roomId].push({
          socketId: socket.id,
          username,
        });
      }

      io.to(roomId).emit(
        "room-users",

        rooms[roomId].map((user) => user.username),
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
          console.error(error);
        }
      }, 1500);
    },
  );

  socket.on(
    "file-update",

    ({ roomId, files }) => {
      socket.to(roomId).emit(
        "files-updated",

        files,
      );
    },
  );

  socket.on(
    "active-file-change",

    ({ roomId, activeFile }) => {
      socket.to(roomId).emit(
        "active-file-updated",

        activeFile,
      );
    },
  );

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
          io.to(roomId).emit("user-left", {
            username: user.username,
          });

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

app.get("/", (_req, res) => {
  res.send("🚀 CollabX backend running");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
