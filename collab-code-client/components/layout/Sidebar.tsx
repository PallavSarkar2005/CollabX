"use client"

import { motion } from "framer-motion"
import UserList from "@/components/users/UserList"
import ChatBox from "@/components/chat/ChatBox"

export default function Sidebar() {

  return (
    <motion.aside
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="w-80 flex flex-col rounded-xl border border-white/10 bg-[#0d0f16] backdrop-blur-xl shadow-2xl overflow-hidden"
    >

      <div className="p-4 border-b border-white/10">
        <h2 className="text-xs tracking-wider uppercase text-white/60 mb-3">
          Active Users
        </h2>
        <UserList />
      </div>

      <div className="flex-1 p-4 flex flex-col">
        <h2 className="text-xs tracking-wider uppercase text-white/60 mb-3">
          Chat
        </h2>
        <ChatBox />
      </div>

    </motion.aside>
  )
}
