"use client";

import { useState, useRef, useEffect } from "react";

import { Bot, ArrowUp, Loader2, User } from "lucide-react";

import { motion } from "framer-motion";

import ReactMarkdown from "react-markdown";

import { askAI } from "@/services/aiService";

interface Message {
  role: "user" | "ai";

  content: string;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",

      content:
        "👋 Hi, I'm your AI coding assistant. Ask me anything about code.",
    },
  ]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,

      {
        role: "user",

        content: userMessage,
      },
    ]);

    setInput("");

    setLoading(true);

    try {
      const response = await askAI(userMessage);

      setMessages((prev) => [
        ...prev,

        {
          role: "ai",

          content: response,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,

        {
          role: "ai",

          content: "❌ AI request failed.",
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
      bg-[#0b0f15]
      "
    >
      <div
        className="
        flex-1
        overflow-y-auto
        p-4
        space-y-4
        "
      >
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className={`
                flex
                gap-3

                ${msg.role === "user" ? "justify-end" : "justify-start"}
              `}
          >
            {msg.role === "ai" && (
              <div
                className="
                  w-8
                  h-8
                  rounded-xl
                  bg-purple-500/10
                  flex
                  items-center
                  justify-center
                  shrink-0
                  "
              >
                <Bot
                  size={16}
                  className="
                    text-purple-400
                    "
                />
              </div>
            )}

            <div
              className={`
                  max-w-[85%]
                  rounded-2xl
                  px-4
                  py-3
                  text-sm
                  leading-relaxed

                  ${
                    msg.role === "user"
                      ? `
                        bg-gradient-to-r
                        from-cyan-500
                        to-purple-500
                        text-white
                      `
                      : `
                        bg-white/[0.04]
                        text-white/85
                      `
                  }
                `}
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>

            {msg.role === "user" && (
              <div
                className="
                  w-8
                  h-8
                  rounded-xl
                  bg-cyan-500/10
                  flex
                  items-center
                  justify-center
                  shrink-0
                  "
              >
                <User
                  size={16}
                  className="
                    text-cyan-400
                    "
                />
              </div>
            )}
          </motion.div>
        ))}

        {loading && (
          <div
            className="
            flex
            items-center
            gap-2
            text-white/50
            text-sm
            "
          >
            <Loader2
              size={16}
              className="
              animate-spin
              "
            />
            AI thinking...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div
        className="
        p-4
        border-t
        border-white/[0.04]
        bg-[#0b0f15]
        "
      >
        <div
          className="
          flex
          items-center
          gap-2
          "
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="
            Ask AI anything...
            "
            className="
            flex-1
            h-12
            rounded-2xl
            bg-white/[0.03]
            focus:bg-white/[0.05]
            px-4
            text-sm
            outline-none
            transition-all
            "
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="
            w-12
            h-12
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500
            to-purple-500
            flex
            items-center
            justify-center
            hover:scale-105
            transition-all
            disabled:opacity-50
            "
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
