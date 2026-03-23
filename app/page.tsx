import { redirect } from "next/navigation"

"use client"; // Must be first line

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js client router
import {
  Calendar,
  CheckSquare,
  ChevronDown,
  Clock,
  LayoutDashboard,
  LogOut,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Ticket,
  User,
  Users,
} from "lucide-react";

export default function Home() {
  const router = useRouter();

  // Redirect to /login when component mounts
  React.useEffect(() => {
    router.push("/login");
  }, [router]);

  return null; // nothing to render because redirect happens immediately
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

function Dashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Confirm speakers for Tech Conference", completed: true },
    { id: 2, title: "Order catering for Gala Dinner", completed: false },
    { id: 3, title: "Send reminder emails to attendees", completed: false },
    { id: 4, title: "Finalize venue setup details", completed: false },
    { id: 5, title: "Review event budget", completed: false },
  ])

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r bg-white lg:flex">
        <div className="flex h-14 items-center border-b px-4">
          <h2 className="text-lg font-semibold text-sky-600">EventMaster</h2>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <div className="px-4 py-2">
            <h3 className="mb-2 text-xs font-semibold uppercase text-gray-500">Main</h3>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start bg-sky-50 text-sky-700">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Calendar
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Ticket className="mr-2 h-4 w-4" />
                Events
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Tickets
              </Button>
            </div>
          </div>
          <div className="px-4 py-2">
            <h3 className="mb-2 text-xs font-semibold uppercase text-gray-500">Admin</h3>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Users
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
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
              <p className="text-xs text-gray-500">admin@eventmaster.com</p>
            </div>
            <Button variant="ghost" size="icon">
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-white px-4 lg:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search events, tickets, users..."
                  className="w-full bg-gray-50 pl-8 md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <Button variant="outline" size="sm" className="ml-auto hidden md:flex">
            <Plus className="mr-2 h-4 w-4" />
            New Event
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>New ticket sale</DropdownMenuItem>
              <DropdownMenuItem>Event reminder</DropdownMenuItem>
              <DropdownMenuItem>System update</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Main Dashboard */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  April 2025
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                  <CardDescription>Next 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-sky-600">12</div>
                  <p className="text-xs text-gray-500">+2 from last month</p>
                  <div className="mt-4">
                    <Progress value={75} className="h-2 bg-sky-100" />
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Ticket Sales</CardTitle>
                  <CardDescription>This month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-sky-600">$24,780</div>
                  <p className="text-xs text-green-500">+12.5% from last month</p>
                  <div className="mt-4">
                    <Progress value={68} className="h-2 bg-sky-100" />
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Attendee Count</CardTitle>
                  <CardDescription>Total registered</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-sky-600">1,245</div>
                  <p className="text-xs text-green-500">+5.3% from last month</p>
                  <div className="mt-4">
                    <Progress value={82} className="h-2 bg-sky-100" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Calendar and Tasks */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2 shadow-sm">
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                  <CardDescription>Your upcoming events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2">
                    {/* Calendar header */}
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <div key={day} className="text-center text-sm font-medium text-gray-500">
                        {day}
                      </div>
                    ))}

                    {/* Calendar days */}
                    {Array.from({ length: 35 }).map((_, i) => {
                      const day = i - 3 // Offset to start from previous month
                      const isCurrentMonth = day > 0 && day <= 30
                      const isToday = day === 15
                      const hasEvent = [3, 8, 15, 22, 27].includes(day)

                      return (
                        <div
                          key={i}
                          className={`flex h-10 items-center justify-center rounded-md text-sm ${
                            isCurrentMonth ? "text-gray-900" : "text-gray-400"
                          } ${isToday ? "bg-sky-100 font-bold text-sky-700" : ""}`}
                        >
                          {day > 0 ? day : 31 + day}
                          {hasEvent && isCurrentMonth && (
                            <div className="absolute mt-6 h-1 w-1 rounded-full bg-sky-500"></div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle>Tasks</CardTitle>
                    <CardDescription>Your upcoming tasks</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Add new task</DropdownMenuItem>
                      <DropdownMenuItem>Mark all as complete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tasks.map((task) => (
                      <div key={task.id} className="flex items-start gap-2">
                        <Checkbox
                          id={`task-${task.id}`}
                          checked={task.completed}
                          onCheckedChange={() => toggleTask(task.id)}
                          className="mt-0.5"
                        />
                        <label
                          htmlFor={`task-${task.id}`}
                          className={`text-sm ${task.completed ? "text-gray-500 line-through" : "text-gray-900"}`}
                        >
                          {task.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from your events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-full bg-sky-100 p-1">
                      <Ticket className="h-4 w-4 text-sky-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">New ticket purchased</p>
                      <p className="text-sm text-gray-500">
                        Sarah Johnson purchased a VIP ticket for Tech Conference 2025
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <Clock className="h-3 w-3 text-gray-500" />
                        <span className="text-xs text-gray-500">10 minutes ago</span>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-full bg-green-100 p-1">
                      <CheckSquare className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Event setup completed</p>
                      <p className="text-sm text-gray-500">
                        Annual Charity Gala venue setup has been marked as complete
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <Clock className="h-3 w-3 text-gray-500" />
                        <span className="text-xs text-gray-500">2 hours ago</span>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-full bg-amber-100 p-1">
                      <User className="h-4 w-4 text-amber-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">New speaker confirmed</p>
                      <p className="text-sm text-gray-500">
                        Dr. Emily Chen confirmed as keynote speaker for Medical Conference
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <Clock className="h-3 w-3 text-gray-500" />
                        <span className="text-xs text-gray-500">Yesterday at 4:30 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

function Bell(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}

function Menu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}
