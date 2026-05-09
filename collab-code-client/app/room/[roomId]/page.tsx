"use client";

import { useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import CodeEditor from "@/components/editor/CodeEditor";
import FileExplorer from "@/components/explorer/FileExplorer";
import AIAssistant from "@/components/ai/AIAssistant";

import { PanelLeftClose, PanelLeftOpen, Sparkles } from "lucide-react";

export default function RoomPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [aiCollapsed, setAiCollapsed] = useState(false);

  const files = [
    {
      id: "1",
      name: "main.js",
    },
    {
      id: "2",
      name: "server.ts",
    },
    {
      id: "3",
      name: "README.md",
    },
  ];

  return (
    <div
      className="
    h-screen
    overflow-hidden
    bg-[#07080d]
    text-white
    flex
    flex-col
    "
    >
      <Navbar />

      <div
        className="
      flex
      flex-1
      overflow-hidden
      "
      >
        <div
          className="
        w-[220px]
        border-r
        border-white/10
        bg-[#0b0d13]
        "
        >
          <FileExplorer files={files} activeFile="1" setActiveFile={() => {}} />
        </div>

        <div
          className={`
          transition-all
          duration-300
          border-r
          border-white/10
          bg-[#0b0d13]

          ${sidebarCollapsed ? "w-[56px]" : "w-[280px]"}
          `}
        >
          <div
            className="
          h-12
          border-b
          border-white/10
          flex
          items-center
          justify-between
          px-3
          "
          >
            {!sidebarCollapsed && (
              <span
                className="
              text-sm
              font-medium
              text-white/70
              "
              >
                Collaboration
              </span>
            )}

            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="
              p-2
              rounded-lg
              hover:bg-white/[0.05]
              transition
              "
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen size={18} />
              ) : (
                <PanelLeftClose size={18} />
              )}
            </button>
          </div>

          {!sidebarCollapsed && <Sidebar />}
        </div>

        <div
          className="
        flex-1
        overflow-hidden
        "
        >
          <CodeEditor />
        </div>

        <div
          className={`
          transition-all
          duration-300
          border-l
          border-white/10
          bg-[#0b0d13]

          ${aiCollapsed ? "w-[60px]" : "w-[320px]"}
          `}
        >
          <div
            className="
          h-12
          border-b
          border-white/10
          flex
          items-center
          justify-between
          px-3
          "
          >
            {!aiCollapsed && (
              <div
                className="
              flex
              items-center
              gap-2
              "
              >
                <Sparkles size={16} className="text-purple-400" />

                <span
                  className="
                text-sm
                font-medium
                text-white/70
                "
                >
                  AI Assistant
                </span>
              </div>
            )}

            <button
              onClick={() => setAiCollapsed(!aiCollapsed)}
              className="
              p-2
              rounded-lg
              hover:bg-white/[0.05]
              transition
              "
            >
              {aiCollapsed ? (
                <PanelLeftOpen size={18} />
              ) : (
                <PanelLeftClose size={18} />
              )}
            </button>
          </div>

          {!aiCollapsed && <AIAssistant />}
        </div>
      </div>
    </div>
  );
}
