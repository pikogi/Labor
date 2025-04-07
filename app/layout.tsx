import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/cart-context"
import FixedSidebar from "@/components/fixed-sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "E-commerce con WhatsApp",
  description: "Tienda online con envío de pedidos por WhatsApp",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <CartProvider>
          <FixedSidebar />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  )
}

import "./globals.css"



import './globals.css'