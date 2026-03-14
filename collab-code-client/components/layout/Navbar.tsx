"use client"

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Navbar() {

  const params = useParams()
  const roomId = params.roomId as string

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="h-14 border-b border-white/10 backdrop-blur-xl bg-[#0b0c12]/80 flex items-center justify-between px-6"
    >

      <div className="flex items-center gap-4">

        <h1 className="text-lg font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
          CollabX
        </h1>

        <div className="text-xs px-3 py-1 rounded-md bg-white/5 border border-white/10 text-white/70">
          {roomId}
        </div>

      </div>

      <div className="flex items-center gap-3">

        <Button
          onClick={copyLink}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
        >
          Copy Invite
        </Button>

      </div>

    </motion.header>
  )
}
