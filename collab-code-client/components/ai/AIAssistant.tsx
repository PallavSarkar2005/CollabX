"use client";

import { Sparkles } from "lucide-react";

export default function AIAssistant() {
  return (
    <div className="h-full flex flex-col bg-[#0b0d13] border-l border-white/10">
      <div className="h-12 border-b border-white/10 flex items-center gap-2 px-4">
        <Sparkles className="w-4 h-4 text-purple-400" />

        <span className="text-sm font-medium text-white/80">AI Assistant</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
          <p className="text-sm text-white/70 leading-relaxed">
            AI code suggestions will appear here.
          </p>
        </div>
      </div>

      <div className="p-4 border-t border-white/10">
        <input
          placeholder="Ask AI anything..."
          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 outline-none"
        />
      </div>
    </div>
  );
}
