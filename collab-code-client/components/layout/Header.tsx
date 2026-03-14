"use client";

export default function Header() {
  return (
    <header className="h-14 bg-black text-white flex items-center px-6 justify-between">

      <h1 className="font-bold text-lg">
        CollabX
      </h1>

      <div className="text-sm opacity-80">
        Real-time Collaborative Coding
      </div>

    </header>
  );
}