"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface FileType {
  id: string;

  name: string;

  language: string;

  content: string;
}

interface FileContextType {
  files: FileType[];

  setFiles: React.Dispatch<React.SetStateAction<FileType[]>>;

  activeFile: string;

  setActiveFile: React.Dispatch<React.SetStateAction<string>>;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export function FileProvider({ children }: { children: ReactNode }) {
  const [files, setFiles] = useState<FileType[]>([
    {
      id: "1",

      name: "main.js",

      language: "javascript",

      content: 'console.log("CollabX")',
    },
  ]);

  const [activeFile, setActiveFile] = useState("1");

  return (
    <FileContext.Provider
      value={{
        files,

        setFiles,

        activeFile,

        setActiveFile,
      }}
    >
      {children}
    </FileContext.Provider>
  );
}

export function useFiles() {
  const context = useContext(FileContext);

  if (!context) {
    throw new Error("useFiles must be used inside FileProvider");
  }

  return context;
}
