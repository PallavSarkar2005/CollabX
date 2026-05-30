"use client";

import { Bot, Code2, Wand2, ArrowUp } from "lucide-react";

import { motion } from "framer-motion";

export default function AIAssistant() {
  return (
    <div
      className="
      h-full
      flex
      flex-col
      bg-[#0b0f15]/90
      min-h-0
      overflow-hidden
      "
    >
      <div
        className="
        flex-1
        overflow-y-auto
        min-h-0
        p-4
        space-y-4
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
          rounded-2xl
          bg-gradient-to-br
          from-purple-500/10
          to-cyan-500/5
          border
          border-purple-500/10
          p-4
          "
        >
          <div
            className="
            flex
            items-start
            gap-3
            "
          >
            <div
              className="
              w-10
              h-10
              rounded-xl
              bg-purple-500/10
              flex
              items-center
              justify-center
              "
            >
              <Bot
                className="
                w-5
                h-5
                text-purple-400
                "
              />
            </div>

            <div>
              <h3
                className="
                text-sm
                font-medium
                mb-1
                "
              >
                AI Pair Programmer
              </h3>

              <p
                className="
                text-xs
                text-white/55
                leading-relaxed
                "
              >
                Generate code, debug issues, optimize performance, and
                collaborate in real-time.
              </p>
            </div>
          </div>
        </motion.div>

        <div
          className="
          space-y-3
          "
        >
          <div
            className="
            text-[10px]
            uppercase
            tracking-[0.3em]
            text-white/25
            px-1
            "
          >
            Quick Actions
          </div>

          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="
            w-full
            p-3
            rounded-2xl
            bg-white/[0.03]
            hover:bg-white/[0.05]
            transition-all
            flex
            items-center
            gap-3
            text-left
            "
          >
            <Code2
              className="
              w-4
              h-4
              text-cyan-400
              "
            />

            <div>
              <div
                className="
                text-sm
                "
              >
                Explain Code
              </div>

              <div
                className="
                text-xs
                text-white/40
                "
              >
                Understand selected code
              </div>
            </div>
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="
            w-full
            p-3
            rounded-2xl
            bg-white/[0.03]
            hover:bg-white/[0.05]
            transition-all
            flex
            items-center
            gap-3
            text-left
            "
          >
            <Wand2
              className="
              w-4
              h-4
              text-purple-400
              "
            />

            <div>
              <div
                className="
                text-sm
                "
              >
                Optimize Code
              </div>

              <div
                className="
                text-xs
                text-white/40
                "
              >
                Improve performance & quality
              </div>
            </div>
          </motion.button>
        </div>
      </div>

      <div
        className="
        p-4
        border-t
        border-white/[0.04]
        bg-[#0b0f15]
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

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
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
            shadow-lg
            shadow-cyan-500/20
            "
          >
            <ArrowUp
              className="
              w-5
              h-5
              "
            />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
