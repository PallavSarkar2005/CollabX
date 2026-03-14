"use client";

import Header from "./Header";
import Sidebar from "./Sidebar";

type Props = {
  children: React.ReactNode;
};

export default function RoomLayout({ children }: Props) {
  return (
    <div className="h-screen flex flex-col">

      {/* Header */}
      <Header />

      {/* Main Area */}
      <div className="flex flex-1 overflow-hidden">

        {/* Editor Section */}
        <div className="flex-1 bg-gray-900 text-white">
          {children}
        </div>

        {/* Sidebar */}
        <Sidebar />

      </div>

    </div>
  );
}