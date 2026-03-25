"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CalendarIcon, CheckSquare, ChevronDown, Clock, Plus, Ticket, User, Sparkles, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import OnboardingTutorial from "@/components/onboarding-tutorial"

// Sample data for existing users
const upcomingEvents = [
  {
    id: 1,
    name: "Tech Conference 2025",
    date: "May 15-17, 2025",
    location: "San Francisco, CA",
    attendees: 1200,
    status: "Confirmed",
  },
  {
    id: 2,
    name: "Annual Charity Gala",
    date: "June 5, 2025",
    location: "New York, NY",
    attendees: 500,
    status: "Planning",
  },
  {
    id: 3,
    name: "Product Launch",
    date: "April 28, 2025",
    location: "Chicago, IL",
    attendees: 350,
    status: "Confirmed",
  },
]

export default function DashboardPage() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Confirm speakers for Tech Conference", completed: true },
    { id: 2, title: "Order catering for Gala Dinner", completed: false },
    { id: 3, title: "Send reminder emails to attendees", completed: false },
    { id: 4, title: "Finalize venue setup details", completed: false },
    { id: 5, title: "Review event budget", completed: false },
  ])
  const [showTutorial, setShowTutorial] = useState(false)
  const [isNewUser, setIsNewUser] = useState(false)

  useEffect(() => {
    // Check if user has seen the tutorial
    const tutorialSeen = localStorage.getItem("tutorialSeen")
    if (!tutorialSeen) {
      setShowTutorial(true)
    }

    // Check if user is new by calling API
    checkNewUserStatus()
  }, [])

  const checkNewUserStatus = async () => {
    try {
      const response = await apiRequest("/api/form-data?page=user_status&form_key=is_new_user", {
        method: "GET"
      })

      if (response.ok) {
        const result = await response.json()
        if (result.status === 1 && result.data?.is_new) {
          setIsNewUser(true)
        }
      }
    } catch (error) {
      // If API fails, fall back to localStorage check
      const hasCreatedEvents = localStorage.getItem("hasCreatedEvents")
      if (!hasCreatedEvents) {
        setIsNewUser(true)
      }
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const handleTutorialComplete = async () => {
    setShowTutorial(false)
    // Mark user as no longer new
    await apiRequest("/api/form-data", {
      method: "POST",
      body: JSON.stringify({
        page: "user_status",
        form_key: "is_new_user",
        form_data: { is_new: false },
        is_completed: true
      })
    })
  }

  const handleTutorialSkip = () => {
    setShowTutorial(false)
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      {isNewUser ? (
        // New User Welcome Screen
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8"
        >
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome to EventMaster!</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Your event management journey starts here. Create your first event and start building amazing experiences for your attendees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 w-full max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Create Your First Event
                  </CardTitle>
                  <CardDescription>
                    Start by creating your first event. It's quick and easy!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Set up event details, configure tickets, and start accepting registrations.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/dashboard/events/create">
                      Create Event <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Complete Your Profile
                  </CardTitle>
                  <CardDescription>
                    Set up your organization and personal details.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add your organization info, customize branding, and set preferences.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/dashboard/settings">
                      Setup Profile <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ticket className="w-5 h-5" />
                    Explore Features
                  </CardTitle>
                  <CardDescription>
                    Take a guided tour of all EventMaster features.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learn about ticketing, analytics, attendee management, and more.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowTutorial(true)}
                    className="w-full"
                  >
                    Start Tutorial <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>

          <div className="pt-8 border-t w-full max-w-2xl">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">Quick Actions</h3>
              <p className="text-sm text-muted-foreground">
                Or jump straight into these common tasks
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              <Button variant="ghost" asChild>
                <Link href="/dashboard/calendar">View Calendar</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/dashboard/tickets">Manage Tickets</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/dashboard/profile">Edit Profile</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      ) : (
        // Existing User Dashboard
        <>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's what's happening with your events.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild>
                <Link href="/dashboard/events/create">
                  <Plus className="mr-2 h-4 w-4" />
                  New Event
                </Link>
              </Button>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                  <CardDescription>Next 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">12</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                  <div className="mt-4">
                    <Progress value={75} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50 p-2">
                  <Link href="/dashboard/events" className="text-xs text-muted-foreground hover:underline">
                    View all events
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Ticket Sales</CardTitle>
              <CardDescription>This month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">$24,780</div>
              <p className="text-xs text-green-500 dark:text-green-400">+12.5% from last month</p>
              <div className="mt-4">
                <Progress value={68} className="h-2" />
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 p-2">
              <Link href="/dashboard/tickets/sales" className="text-xs text-muted-foreground hover:underline">
                View sales report
              </Link>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Attendee Count</CardTitle>
              <CardDescription>Total registered</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">1,245</div>
              <p className="text-xs text-green-500 dark:text-green-400">+5.3% from last month</p>
              <div className="mt-4">
                <Progress value={82} className="h-2" />
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 p-2">
              <Link href="/dashboard/attendees" className="text-xs text-muted-foreground hover:underline">
                View all attendees
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      {/* Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Your next events that need attention</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/events">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between rounded-lg border p-3 transition-all hover:bg-accent"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-md bg-primary/10 p-2">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <Link href={`/dashboard/events/${event.id}`} className="font-medium hover:underline">
                        {event.name}
                      </Link>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{event.date}</span>
                        <span>•</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={event.status === "Confirmed" ? "default" : "outline"}>{event.status}</Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/events/${event.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/events/${event.id}/edit`}>Edit Event</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/events/${event.id}/attendees`}>View Attendees</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/events/${event.id}/cancel`} className="text-destructive">
                            Cancel Event
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Calendar and Tasks */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Your upcoming events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {/* Calendar header */}
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground">
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
                    <Link
                      key={i}
                      href={hasEvent && isCurrentMonth ? `/dashboard/calendar/day/${day}` : "#"}
                      className={`flex h-10 items-center justify-center rounded-md text-sm transition-colors ${
                        isCurrentMonth ? "text-foreground" : "text-muted-foreground"
                      } ${isToday ? "bg-primary/10 font-bold text-primary" : ""} ${
                        hasEvent && isCurrentMonth ? "hover:bg-accent" : ""
                      }`}
                    >
                      {day > 0 ? day : 31 + day}
                      {hasEvent && isCurrentMonth && (
                        <div className="absolute mt-6 h-1 w-1 rounded-full bg-primary"></div>
                      )}
                    </Link>
                  )
                })}
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/calendar">Full Calendar</Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Tasks</CardTitle>
                <CardDescription>Your upcoming tasks</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/tasks">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </Link>
              </Button>
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
                      className={`text-sm ${task.completed ? "text-muted-foreground line-through" : "text-foreground"}`}
                    >
                      {task.title}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/dashboard/tasks">View All Tasks</Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-full bg-primary/10 p-1">
                  <Ticket className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">New ticket purchased</p>
                  <p className="text-sm text-muted-foreground">
                    Sarah Johnson purchased a VIP ticket for Tech Conference 2025
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">10 minutes ago</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/tickets/sales/latest">View</Link>
                </Button>
              </div>
              <Separator />
              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-full bg-green-500/10 p-1">
                  <CheckSquare className="h-4 w-4 text-green-500 dark:text-green-400" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Event setup completed</p>
                  <p className="text-sm text-muted-foreground">
                    Annual Charity Gala venue setup has been marked as complete
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/events/2/setup">View</Link>
                </Button>
              </div>
              <Separator />
              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-full bg-amber-500/10 p-1">
                  <User className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">New speaker confirmed</p>
                  <p className="text-sm text-muted-foreground">
                    Dr. Emily Chen confirmed as keynote speaker for Medical Conference
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Yesterday at 4:30 PM</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/events/3/speakers">View</Link>
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/dashboard/activity">View All Activity</Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
        </>
      )}

      {showTutorial && (
        <OnboardingTutorial
          onComplete={handleTutorialComplete}
          onSkip={handleTutorialSkip}
        />
      )}
    </div>
  )
}
