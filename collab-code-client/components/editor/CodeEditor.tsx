"use client";

import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { socket } from "@/services/socket";
import { useParams } from "next/navigation";

export default function CodeEditor() {

  const [code, setCode] = useState("");

  const params = useParams();
  const roomId = params.roomId as string;

  useEffect(() => {

    socket.on("connect", () => {
      const username = "User-" + socket.id?.slice(0, 4);

      socket.emit("join-room", {
        roomId,
        username
      });
    });

    socket.on("load-code", (savedCode: string) => {
      setCode(savedCode);
    });

    socket.on("code-update", (newCode: string) => {
      setCode(newCode);
    });

    return () => {
      socket.off("load-code");
      socket.off("code-update");
      socket.off("connect");
    };

  }, [roomId]);

  const handleChange = (value: string | undefined) => {

    const newCode = value || "";
    setCode(newCode);

    socket.emit("code-change", {
      roomId,
      code: newCode
    });

  };

  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      theme="vs-dark"
      value={code}
      onChange={handleChange}
    />
  );
}
