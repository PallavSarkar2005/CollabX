"use client";

import { useEffect, useState } from "react";

type Props = {
  setOutput: (value: string) => void;
  setLoading: (value: boolean) => void;
};

export default function CodeEditor({ setOutput, setLoading }: Props) {
  const [code, setCode] = useState(`console.log("Hello CollabX");`);

  const [language, setLanguage] = useState("javascript");

  // RUN CODE FUNCTION

  const executeCode = async () => {
    setLoading(true);

    try {
      let output = "";

      // JAVASCRIPT

      if (language === "javascript") {
        const logs: string[] = [];

        const oldLog = console.log;

        console.log = (...args) => {
          logs.push(args.join(" "));
        };

        try {
          eval(code);
        } catch (err: any) {
          logs.push(err.message);
        }

        console.log = oldLog;

        output = logs.join("\n");
      }

      // PYTHON
      else if (language === "python") {
        output = `Python runtime coming soon...

${code}`;
      }

      // JAVA
      else if (language === "java") {
        output = `Java runtime coming soon...

${code}`;
      }

      setOutput(output);
    } catch (err: any) {
      setOutput(err.message);
    } finally {
      setLoading(false);
    }
  };

  // LISTEN TO NAVBAR RUN BUTTON

  useEffect(() => {
    const handler = () => {
      executeCode();
    };

    window.addEventListener("run-code", handler);

    return () => {
      window.removeEventListener("run-code", handler);
    };
  }, [code, language]);

  return (
    <div
      className="
      h-full
      flex
      flex-col
      bg-[#1e1e1e]
      "
    >
      {/* TOP BAR */}

      <div
        className="
        h-12
        border-b
        border-white/10
        flex
        items-center
        justify-between
        px-4
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
            px-4
            py-2
            bg-[#2d2d2d]
            rounded-t-md
            border
            border-white/10
            text-sm
            "
          >
            main.js
          </div>

          <button
            className="
            text-xl
            text-white/50
            hover:text-white
            "
          >
            +
          </button>
        </div>

        {/* LANGUAGE */}

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="
          bg-[#252526]
          border
          border-white/10
          px-3
          py-2
          rounded-md
          text-sm
          outline-none
          "
        >
          <option value="javascript">JavaScript</option>

          <option value="python">Python</option>

          <option value="java">Java</option>
        </select>
      </div>

      {/* EDITOR */}

      <div
        className="
        flex-1
        p-6
        overflow-auto
        "
      >
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="
          w-full
          h-full
          bg-transparent
          outline-none
          resize-none
          font-mono
          text-[16px]
          leading-8
          text-white
          "
        />
      </div>
    </div>
  );
}
