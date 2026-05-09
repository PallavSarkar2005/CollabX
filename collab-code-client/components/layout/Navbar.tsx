"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Copy,
  Users,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Play,
  Settings2,
  Bell,
  Wifi,
} from "lucide-react";

import toast from "react-hot-toast";

export default function Navbar() {
  const params = useParams();
  const roomId = params.roomId as string;

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);

    toast.success("Invite link copied");
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="
      h-14
      border-b
      border-white/10
      bg-[#0b0d13]/90
      backdrop-blur-2xl
      flex
      items-center
      justify-between
      px-4
      sticky
      top-0
      z-50
      "
    >
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          <div
            className="
          w-9
          h-9
          rounded-2xl
          bg-gradient-to-br
          from-purple-500
          via-blue-500
          to-cyan-400
          flex
          items-center
          justify-center
          shadow-lg
          shadow-purple-500/20
          "
          >
            <Sparkles className="w-4 h-4 text-white" />
          </div>

          <div className="leading-tight">
            <h1 className="text-sm font-semibold tracking-wide">CollabX</h1>

            <p className="text-[11px] text-white/40">Collaborative IDE</p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-white/40">
          <button
            className="
          p-2
          rounded-lg
          hover:bg-white/5
          hover:text-white
          transition-all
          "
          >
            <ArrowLeft size={17} />
          </button>

          <button
            className="
          p-2
          rounded-lg
          hover:bg-white/5
          hover:text-white
          transition-all
          "
          >
            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      <div
        className="
      hidden
      md:flex
      items-center
      gap-3
      px-4
      py-2
      rounded-xl
      border
      border-white/10
      bg-white/[0.03]
      min-w-[340px]
      max-w-[500px]
      "
      >
        <div
          className="
        w-2
        h-2
        rounded-full
        bg-green-400
        animate-pulse
        "
        />

        <span className="text-sm text-white/70 truncate">
          main.js — Live Collaboration Session
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div
          className="
        hidden
        lg:flex
        items-center
        gap-2
        px-3
        py-2
        rounded-xl
        border
        border-white/10
        bg-white/[0.03]
        "
        >
          <Wifi className="w-4 h-4 text-green-400" />

          <span className="text-sm text-white/70">Connected</span>
        </div>

        <div
          className="
        hidden
        md:flex
        items-center
        gap-2
        px-3
        py-2
        rounded-xl
        border
        border-white/10
        bg-white/[0.03]
        "
        >
          <Users className="w-4 h-4 text-cyan-400" />

          <span className="text-sm text-white/70">3 Online</span>
        </div>

        <div
          className="
        hidden
        xl:block
        px-3
        py-2
        rounded-xl
        border
        border-white/10
        bg-white/[0.03]
        text-xs
        text-white/50
        max-w-[220px]
        truncate
        "
        >
          {roomId}
        </div>

        <button
          className="
          p-2.5
          rounded-xl
          border
          border-white/10
          bg-white/[0.03]
          hover:bg-white/10
          transition-all
          "
        >
          <Bell className="w-4 h-4" />
        </button>

        <button
          className="
          flex
          items-center
          gap-2
          px-4
          py-2
          rounded-xl
          bg-gradient-to-r
          from-emerald-500
          to-cyan-500
          hover:scale-105
          transition-all
          duration-300
          shadow-lg
          shadow-cyan-500/20
          "
        >
          <Play className="w-4 h-4" />

          <span className="text-sm font-medium">Run</span>
        </button>

        <button
          onClick={copyLink}
          className="
          flex
          items-center
          gap-2
          px-4
          py-2
          rounded-xl
          bg-gradient-to-r
          from-purple-500
          to-blue-500
          hover:scale-105
          transition-all
          duration-300
          shadow-lg
          shadow-purple-500/20
          "
        >
          <Copy className="w-4 h-4" />

          <span className="text-sm font-medium">Invite</span>
        </button>

        <button
          className="
          p-2.5
          rounded-xl
          border
          border-white/10
          bg-white/[0.03]
          hover:bg-white/10
          transition-all
          "
        >
          <Settings2 className="w-4 h-4" />
        </button>
      </div>
    </motion.header>
  );
}
