import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "CollabX",
  description: "Real-time collaborative coding platform"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#07080d] text-white`}
      >
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(120,119,198,0.25),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(56,189,248,0.18),transparent_50%)]" />
        </div>
        {children}
      </body>
    </html>
  )
}
