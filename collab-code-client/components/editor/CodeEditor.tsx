"use client";

import { useEffect } from "react";

interface FileItem {
  id: string;
  name: string;
  language: string;
  content: string;
}

type Props = {
  file: FileItem;

  files: FileItem[];

  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;

  setOutput: (value: string) => void;

  setLoading: (value: boolean) => void;
};

export default function CodeEditor({
  file,
  files,
  setFiles,
  setOutput,
  setLoading,
}: Props) {
  const updateCode = (value: string) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === file.id
          ? {
              ...f,
              content: value,
            }
          : f,
      ),
    );
  };

  const executeCode = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sourceCode: file.content,
          language: file.language,
        }),
      });

      const data = await response.json();

      setOutput(
        data.stdout ||
          data.stderr ||
          data.compile_output ||
          data.message ||
          "No Output",
      );
    } catch (error: any) {
      setOutput(error.message || "Execution failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = () => {
      executeCode();
    };

    window.addEventListener("run-code", handler);

    return () => {
      window.removeEventListener("run-code", handler);
    };
  }, [file]);

  return (
    <div
      className="
      h-full
      flex
      flex-col
      bg-[#1e1e1e]
      "
    >
      {/* TAB BAR */}

      <div
        className="
        h-12
        border-b
        border-white/10
        flex
        items-center
        px-3
        "
      >
        <div
          className="
          px-4
          py-2
          bg-[#2d2d2d]
          border
          border-white/10
          rounded-t-md
          text-sm
          "
        >
          {file.name}
        </div>

        <div className="ml-auto">
          <select
            value={file.language}
            onChange={(e) => {
              const newLang = e.target.value;

              setFiles((prev) =>
                prev.map((f) =>
                  f.id === file.id
                    ? {
                        ...f,
                        language: newLang,
                      }
                    : f,
                ),
              );
            }}
            className="
            bg-[#252526]
            border
            border-white/10
            px-3
            py-2
            rounded-md
            text-sm
            "
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
        </div>
      </div>

      {/* EDITOR */}

      <div
        className="
        flex-1
        p-4
        overflow-hidden
        "
      >
        <textarea
          value={file.content}
          onChange={(e) => updateCode(e.target.value)}
          spellCheck={false}
          className="
          w-full
          h-full
          bg-transparent
          outline-none
          resize-none
          font-mono
          text-[15px]
          leading-7
          text-white
          "
        />
      </div>
    </div>
  );
}
