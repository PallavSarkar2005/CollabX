"use client"

import {
  ChevronRight,
  FileCode2,
  Folder
} from "lucide-react"

interface Props {
  files: {
    id: string
    name: string
  }[]
  activeFile: string
  setActiveFile: (id: string) => void
}

export default function FileExplorer({
  files,
  activeFile,
  setActiveFile
}: Props) {

  return (
    <div className="h-full bg-[#0b0d13] border-r border-white/10 flex flex-col">

      <div className="h-12 border-b border-white/10 flex items-center px-4 gap-2">

        <Folder className="w-4 h-4 text-blue-400" />

        <span className="text-sm font-medium text-white/80">
          Explorer
        </span>

      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">

        {files.map((file) => {

          const active = activeFile === file.id

          return (
            <button
              key={file.id}
              onClick={() => setActiveFile(file.id)}
              className={`
              w-full
              flex
              items-center
              gap-2
              px-3
              py-2
              rounded-lg
              text-sm
              transition-all
              ${active
                ? "bg-blue-500/20 text-white"
                : "hover:bg-white/[0.05] text-white/60"
              }
              `}
            >

              <ChevronRight className="w-3 h-3" />

              <FileCode2 className="w-4 h-4" />

              {file.name}

            </button>

          )

        })}

      </div>

    </div>
  )
}