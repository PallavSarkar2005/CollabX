"use client";

import { X, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface FileItem {
  id: string;
  name: string;
  language: string;
}

interface Props {
  files: FileItem[];
  activeFile: string;
  setActiveFile: (id: string) => void;
  addFile: () => void;
  closeFile: (id: string) => void;
}

export default function FileTabs({
  files,
  activeFile,
  setActiveFile,
  addFile,
  closeFile,
}: Props) {
  return (
    <div
      className="
    h-12
    border-b
    border-white/10
    bg-[#0b0d13]
    flex
    items-center
    px-2
    gap-2
    overflow-x-auto
    "
    >
      {files.map((file) => {
        const active = activeFile === file.id;

        return (
          <motion.div
            key={file.id}
            layout
            onClick={() => setActiveFile(file.id)}
            className={`
            flex
            items-center
            gap-3
            px-4
            py-2
            rounded-xl
            cursor-pointer
            transition-all
            min-w-fit

            ${
              active
                ? "bg-white/10 border border-white/10"
                : "bg-transparent hover:bg-white/[0.05]"
            }
            `}
          >
            <span
              className={`
            text-sm
            ${active ? "text-white" : "text-white/60"}
            `}
            >
              {file.name}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                closeFile(file.id);
              }}
              className="
              text-white/40
              hover:text-red-400
              transition
              "
            >
              <X size={14} />
            </button>
          </motion.div>
        );
      })}

      <button
        onClick={addFile}
        className="
        ml-2
        p-2
        rounded-lg
        hover:bg-white/[0.05]
        text-white/50
        hover:text-white
        transition
        "
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
