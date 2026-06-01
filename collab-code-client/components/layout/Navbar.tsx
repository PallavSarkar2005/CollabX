"use client";

import { Bell, Play, Users } from "lucide-react";

export default function Navbar() {
  const handleRunCode = () => {
    window.dispatchEvent(new CustomEvent("run-code"));
  };

  return (
    <div
      className="
      h-12
      bg-[#181818]
      border-b
      border-white/10
      flex
      items-center
      justify-between
      px-4
      "
    >
      {/* LEFT */}

      <div className="flex items-center gap-4">
        <div
          className="
          text-cyan-400
          font-bold
          text-lg
          "
        >
          CollabX
        </div>

        <input
          placeholder="Search files, code, commands..."
          className="
          w-[420px]
          h-9
          bg-[#252526]
          border
          border-white/10
          rounded-md
          px-4
          text-sm
          outline-none
          "
        />
      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-3">
        <div
          className="
          h-9
          px-4
          rounded-md
          bg-[#252526]
          border
          border-white/10
          flex
          items-center
          gap-2
          text-sm
          "
        >
          <Users size={15} />3 Online
        </div>

        {/* ONLY RUN BUTTON */}

        <button
          onClick={handleRunCode}
          className="
          h-9
          px-5
          rounded-md
          bg-cyan-500
          hover:bg-cyan-400
          transition
          text-black
          font-semibold
          flex
          items-center
          gap-2
          "
        >
          <Play size={16} />
          Run Code
        </button>

        <button
          className="
          w-9
          h-9
          rounded-md
          bg-[#252526]
          border
          border-white/10
          flex
          items-center
          justify-center
          "
        >
          <Bell size={15} />
        </button>
      </div>
    </div>
  );
}
