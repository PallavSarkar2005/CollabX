"use client";

import { ChevronDown, FileCode2, Plus, Trash2, Pencil } from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  language: string;
  content: string;
}

interface SidebarProps {
  files: FileItem[];

  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;

  activeFileId: string;

  setActiveFileId: (id: string) => void;
}

export default function Sidebar({
  files,
  setFiles,
  activeFileId,
  setActiveFileId,
}: SidebarProps) {
  const createFile = () => {
    const name = prompt("File name");

    if (!name) return;

    const extension = name.split(".").pop() || "js";

    const languageMap: Record<string, string> = {
      js: "javascript",
      ts: "typescript",
      py: "python",
      java: "java",
      cpp: "cpp",
      c: "c",
    };

    const newFile = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name,
      language: languageMap[extension] || "plaintext",
      content: "",
    };

    setFiles((prev) => [...prev, newFile]);

    setActiveFileId(newFile.id);
  };

  const deleteFile = (id: string) => {
    if (files.length === 1) {
      alert("At least one file is required.");

      return;
    }

    const confirmed = confirm("Delete this file?");

    if (!confirmed) return;

    const updated = files.filter((f) => f.id !== id);

    setFiles(updated);

    if (activeFileId === id) {
      setActiveFileId(updated[0].id);
    }
  };

  const renameFile = (id: string) => {
    const file = files.find((f) => f.id === id);

    if (!file) return;

    const newName = prompt("Rename file", file.name);

    if (!newName) return;

    setFiles((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              name: newName,
            }
          : f,
      ),
    );
  };

  return (
    <div
      className="
      h-full
      bg-[#252526]
      border-r
      border-white/10
      flex
      flex-col
      "
    >
      {/* HEADER */}

      <div
        className="
        h-10
        flex
        items-center
        justify-between
        px-4
        border-b
        border-white/10
        "
      >
        <span
          className="
          text-xs
          uppercase
          tracking-[0.15em]
          text-white/50
          "
        >
          Explorer
        </span>

        <button
          onClick={createFile}
          className="
          p-1
          hover:bg-white/10
          rounded
          "
        >
          <Plus size={16} />
        </button>
      </div>

      {/* PROJECT */}

      <div className="p-3">
        <div
          className="
          flex
          items-center
          gap-2
          text-sm
          text-white/80
          mb-3
          "
        >
          <ChevronDown size={16} />
          COLLABX-PROJECT
        </div>

        {/* FILES */}

        <div
          className="
          space-y-1
          "
        >
          {files.map((file) => (
            <div
              key={file.id}
              className={`
                group
                flex
                items-center
                justify-between
                px-2
                py-2
                rounded-md
                cursor-pointer

                ${
                  activeFileId === file.id
                    ? "bg-[#37373d]"
                    : "hover:bg-[#2a2d2e]"
                }
                `}
              onClick={() => setActiveFileId(file.id)}
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  "
              >
                <FileCode2
                  size={16}
                  className="
                    text-cyan-400
                    "
                />

                {file.name}
              </div>

              <div
                className="
                  hidden
                  group-hover:flex
                  items-center
                  gap-1
                  "
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    renameFile(file.id);
                  }}
                >
                  <Pencil size={14} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    deleteFile(file.id);
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
