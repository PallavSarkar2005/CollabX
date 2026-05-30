"use client";

import { ChevronRight, FileCode, Plus } from "lucide-react";

import { motion } from "framer-motion";

import { useFiles } from "@/context/FileContext";

export default function FileExplorer() {
  const {
    files,

    activeFile,

    setActiveFile,

    setFiles,
  } = useFiles();

  const addFile = () => {
    const newFile = {
      id: Date.now().toString(),

      name: `file${files.length + 1}.js`,

      language: "javascript",

      content: "",
    };

    setFiles([...files, newFile]);

    setActiveFile(newFile.id);
  };

  return (
    <div
      className="
      h-full
      flex
      flex-col
      bg-[#070b11]
      border-r
      border-white/10
      "
    >
      <div
        className="
        h-14
        flex
        items-center
        justify-between
        px-4
        border-b
        border-white/10
        "
      >
        <h2
          className="
          text-sm
          font-semibold
          uppercase
          tracking-wider
          "
        >
          Explorer
        </h2>

        <button
          onClick={addFile}
          className="
          w-8
          h-8
          rounded-lg
          bg-white/5
          hover:bg-white/10
          flex
          items-center
          justify-center
          transition-all
          "
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div
        className="
        flex-1
        overflow-y-auto
        p-2
        space-y-1
        "
      >
        {files.map((file) => (
          <motion.button
            key={file.id}
            whileHover={{
              x: 4,
            }}
            onClick={() => setActiveFile(file.id)}
            className={`
              w-full
              flex
              items-center
              gap-3
              px-3
              py-2
              rounded-xl
              text-sm
              transition-all

              ${
                activeFile === file.id
                  ? "bg-blue-500/20 border border-blue-500/30"
                  : "hover:bg-white/5"
              }
            `}
          >
            <ChevronRight
              className="
              w-4
              h-4
              text-white/40
              "
            />

            <FileCode
              className="
              w-4
              h-4
              text-cyan-400
              "
            />

            <span
              className="
              truncate
              "
            >
              {file.name}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
