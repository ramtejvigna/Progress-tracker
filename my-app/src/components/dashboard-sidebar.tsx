"use client"

import { BarChart, CalendarDays, Clock, FileText, Home, Settings, Users } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"

export function DashboardSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar>
            <SidebarHeader className="border-b border-border p-4">
                <div className="flex items-center gap-2">
                    <CalendarDays className="h-6 w-6" />
                    <span className="text-lg font-bold">UserTrack</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/"}>
                            <Link href="/">
                                <Home className="h-5 w-5" />
                                <span>Dashboard</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/users"}>
                            <Link href="/users">
                                <Users className="h-5 w-5" />
                                <span>User Management</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/classes"}>
                            <Link href="/classes">
                                <CalendarDays className="h-5 w-5" />
                                <span>Class Tracking</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/activities"}>
                            <Link href="/activities">
                                <Clock className="h-5 w-5" />
                                <span>Activity Logging</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/reports"}>
                            <Link href="/reports">
                                <FileText className="h-5 w-5" />
                                <span>Reports</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/analytics"}>
                            <Link href="/analytics">
                                <BarChart className="h-5 w-5" />
                                <span>Analytics</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/settings"}>
                            <Link href="/settings">
                                <Settings className="h-5 w-5" />
                                <span>Settings</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="border-t border-border p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium">John Doe</p>
                            <p className="text-xs text-muted-foreground">Administrator</p>
                        </div>
                    </div>
                    <ModeToggle />
                </div>
            </SidebarFooter>
            <SidebarTrigger className="absolute right-4 top-4 md:hidden" />
        </Sidebar>
    )
}
