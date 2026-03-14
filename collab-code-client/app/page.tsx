"use client";

import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const router = useRouter();

  const createRoom = () => {
    const roomId = uuidv4();
    router.push(`/room/${roomId}`);
  };

  return (
    <main className="h-screen flex flex-col items-center justify-center gap-6">

      <h1 className="text-4xl font-bold">
        CollabX – Real Time Code Editor
      </h1>

      <button
        onClick={createRoom}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        Create Coding Room
      </button>

    </main>
  );
}