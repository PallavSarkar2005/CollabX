"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  output: string;
  loading: boolean;
};

type Message = {
  id: number;
  text: string;
  sender: "me" | "other";
};

export default function BottomPanel({ output, loading }: Props) {
  const [activeTab, setActiveTab] = useState<"terminal" | "chat">("terminal");

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // AUTO SCROLL

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // SEND MESSAGE

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: message,
      sender: "me",
    };

    setMessages((prev) => [...prev, newMessage]);

    // MOCK OTHER USER REPLY

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: `Reply: ${message}`,
          sender: "other",
        },
      ]);
    }, 700);

    setMessage("");
  };

  return (
    <div
      className="
      h-full
      flex
      flex-col
      bg-[#111111]
      "
    >
      {/* TABS */}

      <div
        className="
        h-12
        border-b
        border-white/10
        flex
        items-center
        px-4
        gap-3
        "
      >
        <button
          onClick={() => setActiveTab("terminal")}
          className={`
          px-4
          py-2
          rounded-md
          text-sm
          transition

          ${
            activeTab === "terminal"
              ? "bg-[#252526] text-white"
              : "text-white/50"
          }
          `}
        >
          Terminal
        </button>

        <button
          onClick={() => setActiveTab("chat")}
          className={`
          px-4
          py-2
          rounded-md
          text-sm
          transition

          ${activeTab === "chat" ? "bg-[#252526] text-white" : "text-white/50"}
          `}
        >
          Chat
        </button>
      </div>

      {/* CONTENT */}

      <div
        className="
        flex-1
        overflow-y-auto
        p-4
        "
      >
        {/* TERMINAL */}

        {activeTab === "terminal" && (
          <div
            className="
            font-mono
            text-sm
            text-white
            space-y-2
            "
          >
            <div className="text-cyan-400">💻 CollabX Terminal</div>

            {loading ? (
              <div className="text-yellow-400">Running code...</div>
            ) : (
              <pre
                className="
                whitespace-pre-wrap
                "
              >
                {output || "Run code to see output"}
              </pre>
            )}
          </div>
        )}

        {/* CHAT */}

        {activeTab === "chat" && (
          <div
            className="
            flex
            flex-col
            gap-3
            "
          >
            {messages.length === 0 && (
              <div
                className="
                text-white/40
                text-sm
                "
              >
                No messages yet.
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`
                max-w-[70%]
                px-4
                py-3
                rounded-xl
                text-sm
                break-words

                ${
                  msg.sender === "me"
                    ? "bg-cyan-500 text-black self-end"
                    : "bg-[#252526] text-white self-start"
                }
                `}
              >
                {msg.text}
              </div>
            ))}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* INPUT */}

      {activeTab === "chat" && (
        <div
          className="
          h-16
          border-t
          border-white/10
          flex
          items-center
          gap-3
          px-4
          "
        >
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Message your team..."
            className="
            flex-1
            h-10
            bg-[#1e1e1e]
            border
            border-white/10
            rounded-md
            px-4
            outline-none
            text-sm
            "
          />

          <button
            onClick={sendMessage}
            className="
            h-10
            px-5
            rounded-md
            bg-cyan-500
            hover:bg-cyan-400
            transition
            text-black
            font-medium
            "
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}
