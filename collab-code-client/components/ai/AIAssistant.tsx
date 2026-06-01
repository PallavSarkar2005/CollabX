"use client";

import { useEffect, useRef, useState } from "react";

import { Bot, Send, User } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AIAssistant() {
  const [prompt, setPrompt] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello 👋 I am your AI coding assistant. Ask me anything about code.",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // AUTO SCROLL

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // SEND TO AI

  const sendPrompt = async () => {
    if (!prompt.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentPrompt = prompt;

    setPrompt("");

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/ai", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          prompt: currentPrompt,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "No response from AI.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Failed to connect to AI server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
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
      {/* HEADER */}

      <div
        className="
        h-12
        border-b
        border-white/10
        flex
        items-center
        px-4
        gap-2
        "
      >
        <Bot size={18} className="text-pink-400" />

        <span
          className="
          text-sm
          font-semibold
          text-white
          "
        >
          AI Assistant
        </span>
      </div>

      {/* CHAT */}

      <div
        className="
        flex-1
        overflow-y-auto
        p-4
        flex
        flex-col
        gap-4
        "
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`
            flex
            items-start
            gap-3

            ${msg.role === "user" ? "justify-end" : "justify-start"}
            `}
          >
            {msg.role === "assistant" && (
              <div
                className="
                w-8
                h-8
                rounded-full
                bg-pink-500/20
                flex
                items-center
                justify-center
                "
              >
                <Bot size={16} />
              </div>
            )}

            <div
              className={`
              max-w-[85%]
              rounded-2xl
              px-4
              py-3
              text-sm
              whitespace-pre-wrap
              leading-7

              ${
                msg.role === "user"
                  ? "bg-cyan-500 text-black"
                  : "bg-[#1e1e1e] text-white border border-white/10"
              }
              `}
            >
              {msg.content}
            </div>

            {msg.role === "user" && (
              <div
                className="
                w-8
                h-8
                rounded-full
                bg-cyan-500/20
                flex
                items-center
                justify-center
                "
              >
                <User size={16} />
              </div>
            )}
          </div>
        ))}

        {/* LOADING */}

        {loading && (
          <div
            className="
            text-white/50
            text-sm
            "
          >
            AI is thinking...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}

      <div
        className="
        h-16
        border-t
        border-white/10
        px-3
        flex
        items-center
        gap-3
        "
      >
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendPrompt();
            }
          }}
          placeholder="Ask AI anything..."
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
          onClick={sendPrompt}
          disabled={loading}
          className="
          w-10
          h-10
          rounded-md
          bg-gradient-to-r
          from-cyan-500
          to-purple-500
          flex
          items-center
          justify-center
          hover:opacity-90
          transition
          disabled:opacity-50
          "
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
