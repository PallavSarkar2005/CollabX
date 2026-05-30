"use client";

import { useState } from "react";

import Navbar from "@/components/layout/Navbar";

import Sidebar from "@/components/layout/Sidebar";

import CodeEditor from "@/components/editor/CodeEditor";

import AIAssistant from "@/components/ai/AIAssistant";

import BottomPanel from "@/components/layout/BottomPanel";

import { PanelLeftClose, PanelLeftOpen, Sparkles } from "lucide-react";

export default function RoomPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [aiCollapsed, setAiCollapsed] = useState(false);

  const [output, setOutput] = useState("");

  const [loading, setLoading] = useState(false);

  return (
    <div
      className="
      h-screen
      bg-[#07080d]
      text-white
      flex
      flex-col
      overflow-hidden
      "
    >
      <Navbar />

      <div
        className="
        flex
        flex-1
        min-h-0
        overflow-hidden
        "
      >
        <div
          className={`
            transition-all
            duration-300
            border-r
            border-white/[0.04]
            bg-[#0b0f15]
            shrink-0

            ${sidebarCollapsed ? "w-[58px]" : "w-[240px]"}
          `}
        >
          <div
            className="
            h-12
            border-b
            border-white/[0.04]
            flex
            items-center
            justify-between
            px-3
            "
          >
            {!sidebarCollapsed && (
              <span
                className="
                text-[10px]
                uppercase
                tracking-[0.3em]
                text-white/25
                "
              >
                Explorer
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
                <PanelLeftOpen size={16} />
              ) : (
                <PanelLeftClose size={16} />
              )}
            </button>
          </div>

          <div
            className="
            h-[calc(100%-48px)]
            overflow-hidden
            "
          >
            {!sidebarCollapsed && <Sidebar />}
          </div>
        </div>

        <div
          className="
          flex-1
          flex
          flex-col
          min-w-0
          min-h-0
          overflow-hidden
          "
        >
          <div
            className="
            flex-1
            flex
            min-h-0
            overflow-hidden
            "
          >
            <div
              className="
              flex-1
              min-w-0
              min-h-0
              overflow-hidden
              "
            >
              <CodeEditor setOutput={setOutput} setLoading={setLoading} />
            </div>

            <div
              className={`
                transition-all
                duration-300
                border-l
                border-white/[0.04]
                bg-[#0b0f15]
                shrink-0
                flex
                flex-col
                min-h-0

                ${aiCollapsed ? "w-[58px]" : "w-[260px]"}
              `}
            >
              <div
                className="
                h-12
                border-b
                border-white/[0.04]
                flex
                items-center
                justify-between
                px-3
                shrink-0
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
                    <Sparkles
                      size={14}
                      className="
                      text-purple-400
                      "
                    />

                    <span
                      className="
                      text-[10px]
                      uppercase
                      tracking-[0.3em]
                      text-white/25
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
                    <PanelLeftOpen size={16} />
                  ) : (
                    <PanelLeftClose size={16} />
                  )}
                </button>
              </div>

              <div
                className="
                flex-1
                min-h-0
                overflow-hidden
                "
              >
                {!aiCollapsed && <AIAssistant />}
              </div>
            </div>
          </div>

          <div
            className="
            h-[240px]
            shrink-0
            border-t
            border-white/[0.04]
            "
          >
            <BottomPanel output={output} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
