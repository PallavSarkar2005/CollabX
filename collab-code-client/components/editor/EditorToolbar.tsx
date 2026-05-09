"use client";

import { Play, ChevronDown } from "lucide-react";

interface Props {
  language: string;

  setLanguage: (language: string) => void;

  run: () => void;

  loading: boolean;
}

const languages = ["javascript", "java", "python", "cpp", "typescript"];

export default function EditorToolbar({
  language,

  setLanguage,

  run,

  loading,
}: Props) {
  return (
    <div
      className="
      h-14
      border-b
      border-white/10
      flex
      items-center
      justify-between
      px-4
      bg-[#0b0d13]
      "
    >
      <div
        className="
        relative
        "
      >
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="
          appearance-none
          bg-[#151922]
          border
          border-white/10
          rounded-xl
          px-4
          py-2
          pr-10
          text-sm
          outline-none
          hover:border-purple-500/40
          transition-all
          "
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        <ChevronDown
          className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          w-4
          h-4
          text-white/50
          pointer-events-none
          "
        />
      </div>

      <button
        onClick={run}
        disabled={loading}
        className="
        flex
        items-center
        gap-2
        px-5
        py-2
        rounded-xl
        bg-gradient-to-r
        from-cyan-500
        to-purple-500
        hover:scale-105
        transition-all
        disabled:opacity-50
        "
      >
        <Play className="w-4 h-4" />

        {loading ? "Running..." : "Run Code"}
      </button>
    </div>
  );
}
