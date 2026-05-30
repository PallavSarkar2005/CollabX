"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { socket } from "@/services/socket";
import { useParams } from "next/navigation";

interface Message {
  username: string;

  message: string;

  time: string;
}

export default function ChatBox() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);

  const params = useParams();

  const roomId = params.roomId as string;

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on(
      "receive-message",

      (data) => {
        setMessages((prev) => [...prev, data]);
      },
    );

    return () => {
      socket.off("receive-message");
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit(
      "send-message",

      {
        roomId,

        username: "You",

        message,
      },
    );

    setMessage("");
  };

  return (
    <div
      className="
      h-full
      flex
      flex-col
      "
    >
      <div
        className="
        flex-1
        overflow-y-auto
        space-y-4
        pr-1
        "
      >
        <AnimatePresence>
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

                  ${msg.username === "You" ? "justify-end" : "justify-start"}
                `}
            >
              <div
                className={`
                    max-w-[85%]
                    rounded-2xl
                    px-4
                    py-3
                    backdrop-blur-xl
                    border
                    shadow-lg

                    ${
                      msg.username === "You"
                        ? `
                          bg-gradient-to-r
                          from-cyan-500
                          to-blue-500
                          border-cyan-400/20
                        `
                        : `
                          bg-white/[0.04]
                          border-white/10
                        `
                    }
                  `}
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    mb-1
                    "
                >
                  <Sparkles
                    className="
                      w-3
                      h-3
                      text-yellow-400
                      "
                  />

                  <span
                    className="
                      text-xs
                      font-medium
                      "
                  >
                    {msg.username}
                  </span>

                  <span
                    className="
                      text-[10px]
                      text-white/40
                      "
                  >
                    {msg.time}
                  </span>
                </div>

                <p
                  className="
                    text-sm
                    leading-relaxed
                    break-words
                    "
                >
                  {msg.message}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      <div
        className="
        mt-4
        flex
        items-center
        gap-2
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
          placeholder="
          Message your team...
          "
          className="
          flex-1
          h-12
          rounded-2xl
          bg-white/[0.04]
          border
          border-white/10
          px-4
          text-sm
          outline-none
          focus:border-cyan-400/40
          transition-all
          "
        />

        <motion.button
          whileTap={{
            scale: 0.95,
          }}
          whileHover={{
            scale: 1.05,
          }}
          onClick={sendMessage}
          className="
          w-12
          h-12
          rounded-2xl
          bg-gradient-to-r
          from-cyan-500
          to-blue-500
          flex
          items-center
          justify-center
          shadow-lg
          shadow-cyan-500/20
          "
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
