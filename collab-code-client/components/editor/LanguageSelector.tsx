"use client"

interface Props {
  language: string
  setLanguage: (value: string) => void
}

export default function LanguageSelector({ language, setLanguage }: Props) {

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="bg-[#11131a] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none"
    >

      <option value="javascript">JavaScript</option>
      <option value="python">Python</option>
      <option value="java">Java</option>
      <option value="cpp">C++</option>
      <option value="typescript">TypeScript</option>

    </select>
  )
}