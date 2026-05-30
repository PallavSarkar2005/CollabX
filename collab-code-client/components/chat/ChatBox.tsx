"use client";

import { useEffect, useRef, useState } from "react";

import { socket } from "@/services/socket";

import { useParams } from "next/navigation";

import { SendHorizonal } from "lucide-react";

interface MessageType {
  username: string;

  message: string;

  time: string;
}

export default function ChatBox() {
  const params = useParams();

  const roomId = params.roomId as string;

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<MessageType[]>([]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const username = "User-" + (socket.id?.slice(0, 4) || "anon");

  useEffect(() => {
    socket.on(
      "receive-message",

      (data: MessageType) => {
        setMessages((prev) => [...prev, data]);
      },
    );

    return () => {
      socket.off("receive-message");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit(
      "send-message",

      {
        roomId,

        username,

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
      bg-[#05070c]
      "
    >
      <div
        className="
        flex-1
        overflow-y-auto
        min-h-0
        px-4
        py-3
        space-y-3
        "
      >
        {messages.length === 0 && (
          <div
            className="
            text-sm
            text-white/30
            "
          >
            No messages yet.
          </div>
        )}

        {messages.map((msg, index) => {
          const isMine = msg.username === username;

          return (
            <div
              key={index}
              className={`
                  flex

                  ${isMine ? "justify-end" : "justify-start"}
                `}
            >
              <div
                className="
                  flex
                  flex-col
                  gap-1
                  max-w-[70%]
                  "
              >
                <span
                  className="
                    text-[10px]
                    text-white/35
                    px-1
                    "
                >
                  {msg.username}
                </span>

                <div
                  className={`
                      px-4
                      py-2.5
                      rounded-2xl
                      text-sm
                      leading-relaxed
                      break-words

                      ${
                        isMine
                          ? `
                            bg-gradient-to-r
                            from-cyan-500
                            to-purple-500
                            text-white
                          `
                          : `
                            bg-white/[0.06]
                            text-white/85
                          `
                      }
                    `}
                >
                  {msg.message}
                </div>
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      <div
        className="
        p-3
        border-t
        border-white/[0.04]
        bg-[#05070c]
        shrink-0
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
            h-11
            rounded-xl
            bg-white/[0.04]
            px-4
            text-sm
            text-white
            outline-none
            focus:bg-white/[0.06]
            transition-all
            "
          />

          <button
            onClick={sendMessage}
            className="
            w-11
            h-11
            rounded-xl
            bg-gradient-to-r
            from-cyan-500
            to-purple-500
            flex
            items-center
            justify-center
            hover:scale-105
            transition-all
            shrink-0
            "
          >
            <SendHorizonal size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
