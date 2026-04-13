"use client"

import type React from "react"
import { useState } from "react"
import {
  Bell,
  Calendar,
  CheckSquare,
  ChevronDown,
  Clock,
  LayoutDashboard,
  LogOut,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Ticket,
  User,
  Users,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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

export default function DemoPage() {
  return <DemoApp />
}

function DemoApp() {
  const [currentPage, setCurrentPage] = useState("dashboard")
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

  const renderPageTitle = () => {
    const titles: { [key: string]: string } = {
      dashboard: "Demo Dashboard",
      calendar: "Calendar",
      events: "Events",
      tickets: "Tickets",
      users: "Users",
      settings: "Settings",
    }
    return titles[currentPage] || "Dashboard"
  }

  const renderPageContent = () => {
    switch (currentPage) {
      case "calendar":
        return <CalendarPage />
      case "events":
        return <EventsPage />
      case "tickets":
        return <TicketsPage />
      case "users":
        return <UsersPage />
      case "settings":
        return <SettingsPage />
      default:
        return <DashboardContent tasks={tasks} toggleTask={toggleTask} />
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r border-slate-800 bg-slate-950 lg:flex">
        <div className="flex h-14 items-center border-b px-4">
          <h2 className="text-lg font-semibold text-sky-300">EventMaster Demo</h2>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <div className="px-4 py-2">
            <h3 className="mb-2 text-xs font-semibold uppercase text-slate-400">Main</h3>
            <div className="space-y-1">
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${currentPage === "dashboard" ? "bg-slate-900 text-slate-100" : ""}`}
                onClick={() => setCurrentPage("dashboard")}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Demo Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${currentPage === "calendar" ? "bg-slate-900 text-slate-100" : ""}`}
                onClick={() => setCurrentPage("calendar")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Calendar
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${currentPage === "events" ? "bg-slate-900 text-slate-100" : ""}`}
                onClick={() => setCurrentPage("events")}
              >
                <Ticket className="mr-2 h-4 w-4" />
                Events
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${currentPage === "tickets" ? "bg-slate-900 text-slate-100" : ""}`}
                onClick={() => setCurrentPage("tickets")}
              >
                <Users className="mr-2 h-4 w-4" />
                Tickets
              </Button>
            </div>
          </div>
          <div className="px-4 py-2">
            <h3 className="mb-2 text-xs font-semibold uppercase text-slate-400">Admin</h3>
            <div className="space-y-1">
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${currentPage === "users" ? "bg-slate-900 text-slate-100" : ""}`}
                onClick={() => setCurrentPage("users")}
              >
                <User className="mr-2 h-4 w-4" />
                Users
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${currentPage === "settings" ? "bg-slate-900 text-slate-100" : ""}`}
                onClick={() => setCurrentPage("settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </nav>
        <div className="border-t border-slate-800 p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>DM</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-100">Demo User</p>
              <p className="text-xs text-slate-400">demo@eventmaster.com</p>
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
        <header className="flex h-14 items-center gap-4 border-b border-slate-800 bg-slate-950 px-4 lg:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden text-slate-200 hover:bg-slate-800">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  type="search"
                  placeholder="Search events, tickets, users..."
                  className="w-full bg-slate-900 text-slate-100 placeholder:text-slate-500 pl-8 md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <Button variant="outline" size="sm" className="ml-auto hidden md:flex bg-transparent">
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
                  <AvatarFallback>DM</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Demo Account</DropdownMenuLabel>
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
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-sky-300">Demo Workspace</p>
                <h1 className="text-3xl font-bold text-slate-100">{renderPageTitle()}</h1>
                <p className="text-sm text-slate-400 max-w-2xl">
                  Navigate freely through the demo to explore all features of EventMaster.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">Learn More</Button>
                <Button size="sm">Start Your Own</Button>
              </div>
            </div>

            {renderPageContent()}
          </div>
        </main>
      </div>
    </div>
  )
}

function DashboardContent({ tasks, toggleTask }: { tasks: any[]; toggleTask: (id: number) => void }) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-sm border border-slate-800 bg-slate-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-100">Upcoming Events</CardTitle>
            <CardDescription className="text-slate-400">Next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-sky-300">12</div>
            <p className="text-xs text-slate-400">+2 from last month</p>
            <div className="mt-4">
              <Progress value={75} className="h-2 bg-slate-800" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border border-slate-800 bg-slate-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-100">Ticket Sales</CardTitle>
            <CardDescription className="text-slate-400">This month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-sky-300">$24,780</div>
            <p className="text-xs text-emerald-400">+12.5% from last month</p>
            <div className="mt-4">
              <Progress value={68} className="h-2 bg-slate-800" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border border-slate-800 bg-slate-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-100">Attendee Count</CardTitle>
            <CardDescription className="text-slate-400">Total registered</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-sky-300">1,245</div>
            <p className="text-xs text-emerald-400">+5.3% from last month</p>
            <div className="mt-4">
              <Progress value={82} className="h-2 bg-slate-800" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-sm border border-slate-800 bg-slate-900">
          <CardHeader>
            <CardTitle className="text-slate-100">Calendar</CardTitle>
            <CardDescription className="text-slate-400">Your upcoming events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-slate-400">
                  {day}
                </div>
              ))}

              {Array.from({ length: 35 }).map((_, i) => {
                const day = i - 3
                const isCurrentMonth = day > 0 && day <= 30
                const isToday = day === 15
                const hasEvent = [3, 8, 15, 22, 27].includes(day)

                return (
                  <div
                    key={i}
                    className={`relative flex h-10 items-center justify-center rounded-md text-sm ${
                      isCurrentMonth ? 'text-slate-100' : 'text-slate-500'
                    } ${isToday ? 'bg-sky-500 font-bold text-slate-950' : ''}`}
                  >
                    {day > 0 ? day : 31 + day}
                    {hasEvent && isCurrentMonth && (
                      <div className="absolute bottom-1 h-1 w-1 rounded-full bg-sky-300"></div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border border-slate-800 bg-slate-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-slate-100">Tasks</CardTitle>
              <CardDescription className="text-slate-400">Your upcoming tasks</CardDescription>
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
                    className={`text-sm ${task.completed ? 'text-slate-500 line-through' : 'text-slate-100'}`}
                  >
                    {task.title}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border border-slate-800 bg-slate-900">
        <CardHeader>
          <CardTitle className="text-slate-100">Recent Activity</CardTitle>
          <CardDescription className="text-slate-400">Latest updates from your events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-full bg-slate-800 p-1">
                <Ticket className="h-4 w-4 text-sky-300" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none text-slate-100">New ticket purchased</p>
                <p className="text-sm text-slate-400">
                  Sarah Johnson purchased a VIP ticket for Tech Conference 2025
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <Clock className="h-3 w-3 text-slate-400" />
                  <span className="text-xs text-slate-500">10 minutes ago</span>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-full bg-slate-800 p-1">
                <CheckSquare className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none text-slate-100">Event setup completed</p>
                <p className="text-sm text-slate-400">
                  Annual Charity Gala venue setup has been marked as complete
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <Clock className="h-3 w-3 text-slate-400" />
                  <span className="text-xs text-slate-500">2 hours ago</span>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-full bg-slate-800 p-1">
                <User className="h-4 w-4 text-amber-400" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none text-slate-100">New speaker confirmed</p>
                <p className="text-sm text-slate-400">
                  Dr. Emily Chen confirmed as keynote speaker for Medical Conference
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <Clock className="h-3 w-3 text-slate-400" />
                  <span className="text-xs text-slate-500">Yesterday at 4:30 PM</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

function CalendarPage() {
  return (
    <Card className="shadow-sm border border-slate-800 bg-slate-900">
      <CardHeader>
        <CardTitle className="text-slate-100">Event Calendar</CardTitle>
        <CardDescription className="text-slate-400">View all your events in a calendar format</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-4">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-slate-400 pb-4">
              {day}
            </div>
          ))}

          {Array.from({ length: 42 }).map((_, i) => {
            const day = i - 5
            const isCurrentMonth = day > 0 && day <= 31
            const isToday = day === 15

            return (
              <div
                key={i}
                className={`h-24 rounded-md border p-2 ${
                  isCurrentMonth ? 'border-slate-700 bg-slate-800' : 'border-slate-900 bg-slate-950'
                } ${isToday ? 'ring-2 ring-sky-500' : ''}`}
              >
                {day > 0 && isCurrentMonth && <div className="text-sm font-medium text-slate-100">{day}</div>}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

function EventsPage() {
  const events = [
    { id: 1, name: "Tech Conference 2025", date: "2025-05-15", location: "San Francisco, CA", status: "Confirmed" },
    { id: 2, name: "Annual Charity Gala", date: "2025-06-20", location: "New York, NY", status: "Confirmed" },
    { id: 3, name: "Medical Conference", date: "2025-07-10", location: "Boston, MA", status: "Planning" },
  ]

  return (
    <Card className="shadow-sm border border-slate-800 bg-slate-900">
      <CardHeader>
        <CardTitle className="text-slate-100">Your Events</CardTitle>
        <CardDescription className="text-slate-400">Manage and view all your events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800 p-4"
            >
              <div>
                <h3 className="font-medium text-slate-100">{event.name}</h3>
                <p className="text-sm text-slate-400">
                  {new Date(event.date).toLocaleDateString()} • {event.location}
                </p>
              </div>
              <Badge className="bg-sky-600 text-white">{event.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function TicketsPage() {
  const tickets = [
    { id: 1, event: "Tech Conference 2025", type: "General Admission", sold: 245, revenue: "$12,250" },
    { id: 2, event: "Tech Conference 2025", type: "VIP", sold: 85, revenue: "$12,750" },
    { id: 3, event: "Annual Charity Gala", type: "General", sold: 150, revenue: "$7,500" },
  ]

  return (
    <Card className="shadow-sm border border-slate-800 bg-slate-900">
      <CardHeader>
        <CardTitle className="text-slate-100">Tickets</CardTitle>
        <CardDescription className="text-slate-400">Track your ticket sales and revenue</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800 p-4"
            >
              <div>
                <h3 className="font-medium text-slate-100">{ticket.type}</h3>
                <p className="text-sm text-slate-400">{ticket.event}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-slate-100">{ticket.sold} sold</p>
                <p className="text-sm text-emerald-400">{ticket.revenue}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function UsersPage() {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Organizer", status: "Active" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Viewer", status: "Inactive" },
  ]

  return (
    <Card className="shadow-sm border border-slate-800 bg-slate-900">
      <CardHeader>
        <CardTitle className="text-slate-100">Users</CardTitle>
        <CardDescription className="text-slate-400">Manage team members and permissions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800 p-4"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-slate-100">{user.name}</h3>
                  <p className="text-sm text-slate-400">{user.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-100">{user.role}</p>
                <p className={`text-sm ${user.status === "Active" ? "text-emerald-400" : "text-slate-500"}`}>
                  {user.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function SettingsPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-sm border border-slate-800 bg-slate-900">
        <CardHeader>
          <CardTitle className="text-slate-100">General Settings</CardTitle>
          <CardDescription className="text-slate-400">Manage your account and application settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium text-slate-100 mb-2">Organization Name</h3>
            <Input type="text" value="EventMaster Demo" className="bg-slate-800 border-slate-700" disabled />
          </div>
          <div>
            <h3 className="font-medium text-slate-100 mb-2">Email</h3>
            <Input type="email" value="demo@eventmaster.com" className="bg-slate-800 border-slate-700" disabled />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border border-slate-800 bg-slate-900">
        <CardHeader>
          <CardTitle className="text-slate-100">Notification Settings</CardTitle>
          <CardDescription className="text-slate-400">Choose what notifications you'd like to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-100">Email Notifications</p>
              <p className="text-sm text-slate-400">Receive email updates about your events</p>
            </div>
            <Checkbox defaultChecked />
          </div>
          <Separator className="border-slate-800" />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-100">Ticket Sales Alerts</p>
              <p className="text-sm text-slate-400">Get notified when tickets are sold</p>
            </div>
            <Checkbox defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
