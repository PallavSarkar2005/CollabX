"use client"

import { motion } from "framer-motion"
import CodeEditor from "@/components/editor/CodeEditor"
import Sidebar from "@/components/layout/Sidebar"
import Navbar from "@/components/layout/Navbar"

export default function RoomPage() {

  return (
    <div className="h-screen flex flex-col">

      <Navbar />

      <div className="flex flex-1 gap-4 p-4 overflow-hidden">

        <Sidebar />

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="flex-1 rounded-xl border border-white/10 bg-[#0d0f16] shadow-2xl overflow-hidden"
        >
          <CodeEditor />
        </motion.main>

      </div>

    </div>
  )
}
