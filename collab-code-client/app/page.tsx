"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Sparkles, Code2, Users, Rocket } from "lucide-react"

export default function HomePage() {

  const router = useRouter()

  const [roomId, setRoomId] = useState("")

  const createRoom = () => {
    const id = crypto.randomUUID()
    router.push(`/room/${id}`)
  }

  const joinRoom = () => {
    if (!roomId.trim()) return
    router.push(`/room/${roomId}`)
  }

  return (
    <main className="min-h-screen bg-[#07080d] text-white overflow-hidden relative">

      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[120px]" />
      </div>

      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl"
        >

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-white/70">
              Real-Time Collaborative IDE
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
            Build Together
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              In Real-Time
            </span>
          </h1>

          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            CollabX is a modern collaborative coding platform where developers can code, chat, and collaborate instantly.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16">

            <button
              onClick={createRoom}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition-all duration-300 font-medium shadow-2xl shadow-blue-500/20"
            >
              Create Room
            </button>

            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl px-3 py-3">

              <input
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter Room ID"
                className="bg-transparent outline-none text-sm w-52"
              />

              <button
                onClick={joinRoom}
                className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium"
              >
                Join
              </button>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

            <FeatureCard
              icon={<Code2 className="w-6 h-6" />}
              title="Live Coding"
              desc="Code together with real-time synchronization"
            />

            <FeatureCard
              icon={<Users className="w-6 h-6" />}
              title="Team Collaboration"
              desc="Multiple developers editing simultaneously"
            />

            <FeatureCard
              icon={<Rocket className="w-6 h-6" />}
              title="Modern IDE"
              desc="Beautiful developer-first experience"
            />

          </div>

        </motion.div>

      </section>

    </main>
  )
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-left"
    >

      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4 text-blue-400">
        {icon}
      </div>

      <h3 className="text-lg font-semibold mb-2">
        {title}
      </h3>

      <p className="text-sm text-white/60 leading-relaxed">
        {desc}
      </p>

    </motion.div>
  )
}