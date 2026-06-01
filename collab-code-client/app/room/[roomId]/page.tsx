"use client";

import { useState } from "react";

import Navbar from "@/components/layout/Navbar";
import ActivityBar from "@/components/layout/ActivityBar";
import Sidebar from "@/components/layout/Sidebar";

import CodeEditor from "@/components/editor/CodeEditor";

import BottomPanel from "@/components/layout/BottomPanel";

import AIAssistant from "@/components/ai/AIAssistant";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export default function RoomPage() {
  const [output, setOutput] = useState("");

  const [loading, setLoading] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e] text-white overflow-hidden">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <ActivityBar />

        <PanelGroup direction="horizontal">
          {/* SIDEBAR */}

          <Panel defaultSize={16} minSize={12}>
            <Sidebar />
          </Panel>

          <PanelResizeHandle className="resize-handle" />

          {/* CENTER */}

          <Panel defaultSize={64}>
            <PanelGroup direction="vertical">
              {/* EDITOR */}

              <Panel defaultSize={72}>
                <CodeEditor setOutput={setOutput} setLoading={setLoading} />
              </Panel>

              <PanelResizeHandle className="resize-handle" />

              {/* TERMINAL */}

              <Panel defaultSize={28} minSize={18}>
                <BottomPanel output={output} loading={loading} />
              </Panel>
            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="resize-handle" />

          {/* AI */}

          <Panel defaultSize={20} minSize={16}>
            <AIAssistant />
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
