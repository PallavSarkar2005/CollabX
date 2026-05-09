"use client"

interface Props {
  output: string
}

export default function OutputConsole({ output }: Props) {

  return (
    <div className="h-[180px] hover:h-[260px] transition-all duration-300 border-t border-white/10 bg-[#0b0d13] p-4 overflow-y-auto">

      <div className="text-xs uppercase tracking-wider text-white/40 mb-3">
        Output
      </div>

      <pre className="text-sm text-green-400 whitespace-pre-wrap font-mono">
        {output || "Run code to see output..."}
      </pre>

    </div>
  )
}