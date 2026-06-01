"use client";

import { Files, Search, GitBranch, Sparkles, Settings } from "lucide-react";

const items = [Files, Search, GitBranch, Sparkles];

export default function ActivityBar() {
  return (
    <div
      className="
      w-14
      h-full
      bg-[#181818]
      border-r
      border-white/10
      flex
      flex-col
      items-center
      py-3
      "
    >
      <div
        className="
        w-9
        h-9
        rounded-xl
        bg-cyan-500/20
        flex
        items-center
        justify-center
        text-cyan-400
        font-bold
        "
      >
        C
      </div>

      <div className="flex flex-col gap-4 mt-6">
        {items.map((Icon, i) => (
          <button
            key={i}
            className="
            w-10
            h-10
            rounded-lg
            hover:bg-white/10
            flex
            items-center
            justify-center
            text-white/60
            hover:text-white
            "
          >
            <Icon size={20} />
          </button>
        ))}
      </div>

      <div className="mt-auto">
        <button
          className="
          w-10
          h-10
          rounded-lg
          hover:bg-white/10
          flex
          items-center
          justify-center
          text-white/60
          "
        >
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
}
