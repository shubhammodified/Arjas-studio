import type { Metadata } from "next"
import "./globals.css"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "AAB Studio",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-gray-900 w-full overflow-x-hidden">
        <Header />
        <main className="w-full">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
