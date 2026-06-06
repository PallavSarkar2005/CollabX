"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { io, Socket } from "socket.io-client";

import Navbar from "@/components/layout/Navbar";
import ActivityBar from "@/components/layout/ActivityBar";
import Sidebar from "@/components/layout/Sidebar";
import CodeEditor from "@/components/editor/CodeEditor";
import BottomPanel from "@/components/layout/BottomPanel";
import AIAssistant from "@/components/ai/AIAssistant";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export interface FileItem {
  id: string;
  name: string;
  language: string;
  content: string;
}

export default function RoomPage() {
  const params = useParams();

  const roomId = params.roomId as string;

  const [socket, setSocket] = useState<Socket | null>(null);

  const [output, setOutput] = useState("");

  const [loading, setLoading] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);

  const [files, setFiles] = useState<FileItem[]>([
    {
      id: "1",
      name: "main.js",
      language: "javascript",
      content: 'console.log("Hello CollabX");',
    },
  ]);

  const [activeFileId, setActiveFileId] = useState("1");

  const activeFile = files.find((file) => file.id === activeFileId) || files[0];

  /* CREATE SOCKET */

  useEffect(() => {
    const newSocket = io("http://localhost:5000");

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  /* SOCKET CONNECT */

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      console.log("CONNECTED:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("DISCONNECTED");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket]);

  /* JOIN ROOM */

  useEffect(() => {
    if (!socket) return;
    if (!roomId) return;

    socket.emit("join-room", {
      roomId,
      username: localStorage.getItem("username") || "Guest",
    });
  }, [socket, roomId]);

  /* LOAD FILES */

  useEffect(() => {
    if (!socket) return;

    socket.on("load-files", (loadedFiles: FileItem[]) => {
      if (loadedFiles && loadedFiles.length > 0) {
        setFiles(loadedFiles);

        setActiveFileId(loadedFiles[0].id);
      }

      setIsLoaded(true);
    });

    return () => {
      socket.off("load-files");
    };
  }, [socket]);

  /* FILE UPDATE SYNC */

  useEffect(() => {
    if (!socket) return;

    socket.on("files-updated", (updatedFiles: FileItem[]) => {
      setFiles(updatedFiles);
    });

    return () => {
      socket.off("files-updated");
    };
  }, [socket]);

  /* ACTIVE FILE SYNC */

  useEffect(() => {
    if (!socket) return;

    socket.on("active-file-updated", (fileId: string) => {
      setActiveFileId(fileId);
    });

    return () => {
      socket.off("active-file-updated");
    };
  }, [socket]);

  /* SAVE FILES */

  useEffect(() => {
    if (!socket) return;
    if (!roomId) return;
    if (!isLoaded) return;

    console.log("FILES BEING SAVED:", files);

    socket.emit("save-files", {
      roomId,
      files,
    });
  }, [files, roomId, socket, isLoaded]);

  /* ACTIVE FILE UPDATE */

  useEffect(() => {
    if (!socket) return;
    if (!roomId) return;

    socket.emit("active-file-change", {
      roomId,
      activeFile: activeFileId,
    });
  }, [activeFileId, socket, roomId]);

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e] text-white overflow-hidden">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <ActivityBar />

        <PanelGroup direction="horizontal">
          {/* SIDEBAR */}

          <Panel defaultSize={16} minSize={12}>
            <Sidebar
              files={files}
              setFiles={setFiles}
              activeFileId={activeFileId}
              setActiveFileId={setActiveFileId}
            />
          </Panel>

          <PanelResizeHandle className="resize-handle" />

          {/* EDITOR */}

          <Panel defaultSize={64}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={72}>
                <CodeEditor
                  file={activeFile}
                  files={files}
                  setFiles={setFiles}
                  setOutput={setOutput}
                  setLoading={setLoading}
                />
              </Panel>

              <PanelResizeHandle className="resize-handle" />

              <Panel defaultSize={28} minSize={18}>
                <BottomPanel output={output} loading={loading} />
              </Panel>
            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="resize-handle" />

          {/* AI */}

          <Panel defaultSize={20} minSize={16}>
            <AIAssistant />
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
