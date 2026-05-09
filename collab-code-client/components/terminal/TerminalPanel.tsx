"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  output: string;
  loading?: boolean;
}

export default function TerminalPanel({ output, loading }: Props) {
  const terminalRef = useRef<HTMLDivElement | null>(null);

  const terminalInstance = useRef<any>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const loadTerminal = async () => {
      const xterm = await import("xterm");

      await import("@xterm/xterm/css/xterm.css");

      terminalInstance.current = new xterm.Terminal({
        theme: {
          background: "#0b0d13",
          foreground: "#ffffff",
          cursor: "#8b5cf6",
        },

        fontSize: 14,
        cursorBlink: true,
        fontFamily: "JetBrains Mono, monospace",

        rows: 12,

        convertEol: true,
      });

      if (terminalRef.current) {
        terminalInstance.current.open(terminalRef.current);

        terminalInstance.current.writeln("");
        terminalInstance.current.writeln("🚀 CollabX Terminal");

        terminalInstance.current.writeln("");

        terminalInstance.current.writeln("Ready for execution...");

        terminalInstance.current.writeln("");
      }
    };

    loadTerminal();

    return () => {
      if (terminalInstance.current) {
        terminalInstance.current.dispose();
      }
    };
  }, [mounted]);

  useEffect(() => {
    if (!terminalInstance.current) return;

    terminalInstance.current.clear();

    terminalInstance.current.writeln("");

    terminalInstance.current.writeln("🚀 CollabX Terminal");

    terminalInstance.current.writeln("");

    if (loading) {
      terminalInstance.current.writeln("⚡ Executing code...");

      return;
    }

    if (output) {
      terminalInstance.current.writeln("$ Execution Result");

      terminalInstance.current.writeln("");

      const lines = output.split("\n");

      lines.forEach((line) => {
        terminalInstance.current.writeln(line);
      });
    } else {
      terminalInstance.current.writeln("Run code to see output...");
    }

    terminalInstance.current.writeln("");
  }, [output, loading]);

  if (!mounted) return null;

  return (
    <div
      className="
      h-[240px]
      bg-[#0b0d13]
      border-t
      border-white/10
      overflow-hidden
      "
    >
      <div ref={terminalRef} className="h-full w-full p-2" />
    </div>
  );
}
