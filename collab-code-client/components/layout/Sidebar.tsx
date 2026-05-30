"use client";

import { motion } from "framer-motion";

import FileExplorer from "../explorer/FileExplorer";

export default function Sidebar() {
  return (
    <motion.aside
      initial={{
        x: -20,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      className="
      w-[260px]
      h-full
      bg-[#0b0f15]
      border-r
      border-white/5
      flex
      flex-col
      "
    >
      <FileExplorer />
    </motion.aside>
  );
}
