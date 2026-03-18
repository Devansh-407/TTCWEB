import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/lib/cart-context"
import { WhatsAppContactButton } from "@/components/whatsapp-contact-button"
import "./globals.css"

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "The Tohfa Creations - Handmade with Love",
  description:
    "Discover our collection of handcrafted treasures, each piece lovingly made with attention to detail and personal touch.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <CartProvider>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppContactButton />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
