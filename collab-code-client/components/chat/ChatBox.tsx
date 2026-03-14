"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ChatBox() {

  const [message, setMessage] = useState("")

  return (
    <div className="flex flex-col h-full gap-3">

      <div className="flex-1 overflow-y-auto space-y-2">

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm bg-white/10 px-3 py-2 rounded-lg"
        >
          Welcome to CollabX 🚀
        </motion.div>

      </div>

      <div className="flex gap-2">

        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message..."
        />

        <Button>
          Send
        </Button>

      </div>

    </div>
  )
}
