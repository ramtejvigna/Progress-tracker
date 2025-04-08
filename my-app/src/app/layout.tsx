import type React from "react"
import { Inter } from "next/font/google"
import { SidebarProvider } from "@/components/ui/sidebar"

import "./globals.css"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "User Management System",
  description: "A comprehensive user management system with class tracking and activity logging",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
          <SidebarProvider>
            <div className="flex min-h-screen">
              <DashboardSidebar />
              <main className="flex-1">{children}</main>
            </div>
          </SidebarProvider>
      </body>
    </html>
  )
}
