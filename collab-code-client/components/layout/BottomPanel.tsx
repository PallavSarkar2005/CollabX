"use client";

import { useState } from "react";

import TerminalPanel from "../terminal/TerminalPanel";

import ChatBox from "../chat/ChatBox";

export default function BottomPanel({
  output,

  loading,
}: {
  output: string;

  loading: boolean;
}) {
  const [activeTab, setActiveTab] = useState("terminal");

  return (
    <div
      className="
      h-full
      bg-[#05070c]
      flex
      flex-col
      "
    >
      <div
        className="
        h-10
        border-b
        border-white/[0.04]
        flex
        items-center
        px-3
        gap-2
        shrink-0
        "
      >
        <button
          onClick={() => setActiveTab("terminal")}
          className={`
            px-3
            py-1
            rounded-lg
            text-xs
            transition-all

            ${
              activeTab === "terminal"
                ? `
                  bg-white/[0.06]
                  text-white
                `
                : `
                  text-white/40
                `
            }
          `}
        >
          Terminal
        </button>

        <button
          onClick={() => setActiveTab("chat")}
          className={`
            px-3
            py-1
            rounded-lg
            text-xs
            transition-all

            ${
              activeTab === "chat"
                ? `
                  bg-white/[0.06]
                  text-white
                `
                : `
                  text-white/40
                `
            }
          `}
        >
          Team Chat
        </button>
      </div>

      <div
        className="
        flex-1
        min-h-0
        overflow-hidden
        "
      >
        {activeTab === "terminal" ? (
          <TerminalPanel output={output} loading={loading} />
        ) : (
          <div
            className="
            h-full
            p-3
            overflow-hidden
            "
          >
            <ChatBox />
          </div>
        )}
      </div>
    </div>
  );
}
