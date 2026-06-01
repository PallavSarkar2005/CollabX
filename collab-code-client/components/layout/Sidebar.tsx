"use client";

import { ChevronDown, Folder, FileCode2 } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="h-full bg-[#1e1e1e] border-r border-white/10">
      <div
        className="
        h-10
        flex
        items-center
        px-4
        text-xs
        uppercase
        tracking-[0.2em]
        text-white/40
        "
      >
        Explorer
      </div>

      <div className="px-3">
        <div className="flex items-center gap-2 text-sm text-white/80 mb-3">
          <ChevronDown size={16} />
          COLLABX-PROJECT
        </div>

        <div className="ml-4 space-y-2">
          <div className="flex items-center gap-2 text-white/70">
            <Folder size={16} />
            src
          </div>

          <div className="ml-5 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400">
              <FileCode2 size={16} />
              app.js
            </div>

            <div className="flex items-center gap-2 text-white/70">
              <FileCode2 size={16} />
              index.js
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
