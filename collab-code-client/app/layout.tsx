import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Toaster } from "react-hot-toast"
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
  description: "Modern Collaborative Coding Platform"
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

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#11131a",
              color: "white",
              border: "1px solid rgba(255,255,255,0.08)"
            }
          }}
        />

        {children}

      </body>
    </html>
  )
}