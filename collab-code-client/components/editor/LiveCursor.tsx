"use client";

interface Props {
  username: string;
  x: number;
  y: number;
}

export default function LiveCursor({ username, x, y }: Props) {
  return (
    <div
      style={{
        left: x,
        top: y,
      }}
      className="absolute pointer-events-none z-50"
    >
      <div className="w-3 h-3 rounded-full bg-purple-500" />

      <div className="mt-1 text-xs bg-purple-500 text-white px-2 py-1 rounded-lg w-max">
        {username}
      </div>
    </div>
  );
}
