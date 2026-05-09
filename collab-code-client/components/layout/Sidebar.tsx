"use client";

import { motion } from "framer-motion";
import UserList from "@/components/users/UserList";
import ChatBox from "@/components/chat/ChatBox";

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className=" group w-[260px] hover:w-[290px] transition-all duration-300 flex flex-col rounded-2xl border border-white/10 bg-[#09090f]/90 backdrop-blur-2xl overflow-hidden shadow-2xl"
    >
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider">
            Active Users
          </h2>

          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </div>

        <UserList />
      </div>

      <div className="flex-1 p-5 overflow-hidden">
        <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
          Team Chat
        </h2>

        <ChatBox />
      </div>
    </motion.aside>
  );
}
