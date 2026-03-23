"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Calendar, Home, LayoutDashboard, LogOut, Menu, Settings, Ticket, User, Users } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
}

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Events",
    href: "/dashboard/events",
    icon: Ticket,
  },
  {
    title: "Calendar",
    href: "/dashboard/calendar",
    icon: Calendar,
  },
  {
    title: "Tickets",
    href: "/dashboard/tickets",
    icon: Users,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
]

const adminNavItems: NavItem[] = [
  {
    title: "Users",
    href: "/dashboard/users",
    icon: User,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar for desktop */}
      <div className="hidden w-64 flex-col border-r bg-card lg:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="rounded-md bg-primary p-1">
              <Home className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-primary">EventMaster</h2>
          </Link>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <div className="px-4 py-2">
            <h3 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Main</h3>
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          <div className="px-4 py-2">
            <h3 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Admin</h3>
            <div className="space-y-1">
              {adminNavItems.map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </nav>
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">admin@eventmaster.com</p>
            </div>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard/logout">
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Log out</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:px-6">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 lg:hidden">
              <div className="flex h-14 items-center border-b px-4">
                <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                  <div className="rounded-md bg-primary p-1">
                    <Home className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h2 className="text-lg font-semibold text-primary">EventMaster</h2>
                </Link>
              </div>
              <nav className="flex-1 overflow-auto py-4">
                <div className="px-4 py-2">
                  <h3 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Main</h3>
                  <div className="space-y-1">
                    {mainNavItems.map((item) => (
                      <Button
                        key={item.href}
                        variant={pathname === item.href ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        asChild
                        onClick={() => setOpen(false)}
                      >
                        <Link href={item.href}>
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.title}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="px-4 py-2">
                  <h3 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Admin</h3>
                  <div className="space-y-1">
                    {adminNavItems.map((item) => (
                      <Button
                        key={item.href}
                        variant={pathname === item.href ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        asChild
                        onClick={() => setOpen(false)}
                      >
                        <Link href={item.href}>
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.title}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard/notifications">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <Link href="/dashboard/profile">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Link>
            </Button>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
