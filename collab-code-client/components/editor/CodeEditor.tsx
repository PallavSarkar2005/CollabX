"use client";

import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";

import { socket } from "@/services/socket";
import { useParams } from "next/navigation";
import { runCode } from "@/services/codeService";
import { useFiles } from "@/context/FileContext";
import TerminalPanel from "../terminal/TerminalPanel";
import EditorToolbar from "./EditorToolbar";
import FileTabs from "./FileTabs";
import { Activity, Wifi, WifiOff } from "lucide-react";
import toast from "react-hot-toast";

export default function CodeEditor() {
  const [output, setOutput] = useState("");

  const [loading, setLoading] = useState(false);

  const [connected, setConnected] = useState(false);

  const [editorTheme, setEditorTheme] = useState("vs-dark");

  const isRemoteChange = useRef(false);

  const params = useParams();

  const roomId = params.roomId as string;

  const {
    files,

    setFiles,

    activeFile,

    setActiveFile,
  } = useFiles();

  const currentFile = files.find((file) => file.id === activeFile)!;

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      setConnected(true);

      const username = "User-" + socket.id?.slice(0, 4);

      socket.emit("join-room", {
        roomId,
        username,
      });
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [roomId]);

  const updateFileContent = (value: string | undefined) => {
    if (isRemoteChange.current) {
      isRemoteChange.current = false;

      return;
    }

    const updated = files.map((file) => {
      if (file.id === activeFile) {
        return {
          ...file,
          content: value || "",
        };
      }

      return file;
    });

    setFiles(updated);
  };

  const addFile = () => {
    const newFile = {
      id: Date.now().toString(),

      name: `file${files.length + 1}.js`,

      language: "javascript",

      content: "",
    };

    setFiles([...files, newFile]);

    setActiveFile(newFile.id);

    toast.success("New file created");
  };

  const closeFile = (id: string) => {
    if (files.length === 1) return;

    const updated = files.filter((file) => file.id !== id);

    setFiles(updated);

    if (activeFile === id) {
      setActiveFile(updated[0].id);
    }
  };

  const executeCode = async () => {
    try {
      setLoading(true);

      setOutput("");

      const result = await runCode(currentFile.content, currentFile.language);

      setOutput(
        result.stdout || result.stderr || result.compile_output || "No output",
      );

      toast.success("Execution completed");
    } catch {
      toast.error("Execution failed");

      setOutput("Execution failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      h-full
      flex
      flex-col
      bg-[#0d1117]
      overflow-hidden
      "
    >
      <FileTabs
        files={files}
        activeFile={activeFile}
        setActiveFile={setActiveFile}
        addFile={addFile}
        closeFile={closeFile}
      />

      <div
        className="
        h-10
        border-b
        border-white/10
        flex
        items-center
        justify-between
        px-4
        bg-[#0b0f15]
        "
      >
        <div
          className="
          flex
          items-center
          gap-3
          "
        >
          <div
            className="
            flex
            items-center
            gap-2
            text-xs
            text-white/60
            "
          >
            <Activity size={14} className="text-green-400" />

            {currentFile.name}
          </div>

          <div
            className="
            px-2
            py-1
            rounded-md
            bg-white/[0.04]
            border
            border-white/10
            text-[11px]
            text-white/50
            uppercase
            "
          >
            {currentFile.language}
          </div>
        </div>

        <div
          className="
          flex
          items-center
          gap-3
          "
        >
          <button
            onClick={() =>
              setEditorTheme(editorTheme === "vs-dark" ? "light" : "vs-dark")
            }
            className="
            text-xs
            px-3
            py-1.5
            rounded-lg
            bg-white/[0.04]
            border
            border-white/10
            hover:bg-white/[0.08]
            transition
            "
          >
            Theme
          </button>

          <div
            className="
            flex
            items-center
            gap-2
            text-xs
            "
          >
            {connected ? (
              <>
                <Wifi size={14} className="text-green-400" />

                <span className="text-green-400">Connected</span>
              </>
            ) : (
              <>
                <WifiOff size={14} className="text-red-400" />

                <span className="text-red-400">Offline</span>
              </>
            )}
          </div>
        </div>
      </div>

      <EditorToolbar
        language={currentFile.language}
        setLanguage={(language) => {
          const updated = files.map((file) => {
            if (file.id === activeFile) {
              return {
                ...file,

                language,
              };
            }

            return file;
          });

          setFiles(updated);
        }}
        run={executeCode}
        loading={loading}
      />

      <div
        className="
        flex-1
        overflow-hidden
        "
      >
        <Editor
          height="100%"
          language={currentFile.language}
          theme={editorTheme}
          value={currentFile.content}
          onChange={updateFileContent}
          options={{
            fontSize: 15,

            minimap: {
              enabled: false,
            },

            smoothScrolling: true,

            cursorBlinking: "smooth",

            cursorSmoothCaretAnimation: "on",

            fontLigatures: true,

            padding: {
              top: 20,
            },

            wordWrap: "on",

            automaticLayout: true,

            scrollBeyondLastLine: false,

            renderLineHighlight: "all",

            roundedSelection: true,

            tabSize: 2,
          }}
        />
      </div>

      <TerminalPanel output={output} loading={loading} />
    </div>
  );
}
