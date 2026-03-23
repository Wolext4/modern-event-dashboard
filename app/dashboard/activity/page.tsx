"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Check, Clock, Download, Filter, Search, Ticket, User } from "lucide-react"
import { motion } from "framer-motion"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample activity data
const activityData = [
  {
    id: 1,
    type: "ticket_purchase",
    user: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    event: {
      id: 1,
      name: "Tech Conference 2025",
    },
    details: "Purchased a VIP ticket",
    timestamp: "2025-04-05T10:30:00",
  },
  {
    id: 2,
    type: "event_update",
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    event: {
      id: 2,
      name: "Annual Charity Gala",
    },
    details: "Updated event schedule",
    timestamp: "2025-04-04T15:45:00",
  },
  {
    id: 3,
    type: "check_in",
    user: {
      name: "Emily Davis",
      email: "emily.d@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    event: {
      id: 3,
      name: "Product Launch",
    },
    details: "Checked in attendee Michael Chen",
    timestamp: "2025-04-03T09:15:00",
  },
  {
    id: 4,
    type: "refund",
    user: {
      name: "Robert Wilson",
      email: "robert.w@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    event: {
      id: 1,
      name: "Tech Conference 2025",
    },
    details: "Processed refund for Lisa Brown",
    timestamp: "2025-04-02T14:20:00",
  },
  {
    id: 5,
    type: "speaker_added",
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    event: {
      id: 1,
      name: "Tech Conference 2025",
    },
    details: "Added Dr. Emily Chen as keynote speaker",
    timestamp: "2025-04-01T11:10:00",
  },
  {
    id: 6,
    type: "event_created",
    user: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    event: {
      id: 4,
      name: "Marketing Workshop",
    },
    details: "Created new event",
    timestamp: "2025-03-31T16:05:00",
  },
  {
    id: 7,
    type: "team_member_added",
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    event: {
      id: 2,
      name: "Annual Charity Gala",
    },
    details: "Added Michael Chen to event team",
    timestamp: "2025-03-30T10:45:00",
  },
  {
    id: 8,
    type: "ticket_type_added",
    user: {
      name: "Emily Davis",
      email: "emily.d@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    event: {
      id: 2,
      name: "Annual Charity Gala",
    },
    details: "Added VIP Table ticket type",
    timestamp: "2025-03-29T13:30:00",
  },
]

export default function ActivityPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [dateRange, setDateRange] = useState("all")

  // Filter activities based on search term, active tab, and date range
  const filteredActivities = activityData.filter((activity) => {
    const matchesSearch =
      activity.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.details.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "tickets" && (activity.type === "ticket_purchase" || activity.type === "refund")) ||
      (activeTab === "events" && (activity.type === "event_created" || activity.type === "event_update")) ||
      (activeTab === "users" && (activity.type === "check_in" || activity.type === "team_member_added"))

    // Date filtering logic would go here in a real implementation
    const matchesDate = true

    return matchesSearch && matchesTab && matchesDate
  })

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "ticket_purchase":
        return <Ticket className="h-4 w-4 text-primary" />
      case "event_update":
      case "event_created":
        return <Calendar className="h-4 w-4 text-amber-500" />
      case "check_in":
        return <Check className="h-4 w-4 text-green-500" />
      case "refund":
        return <Ticket className="h-4 w-4 text-destructive" />
      case "speaker_added":
      case "team_member_added":
        return <User className="h-4 w-4 text-blue-500" />
      case "ticket_type_added":
        return <Ticket className="h-4 w-4 text-purple-500" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Activity Log</h1>
        <p className="text-muted-foreground">View all activity across your events</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="search"
            placeholder="Search activity..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9"
          />
          <Button variant="outline" size="sm" className="h-9 px-3 lg:px-4">
            <Search className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:ml-2">Search</span>
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="h-9 w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>All Activities</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Ticket Purchases</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Event Updates</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Check-ins</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Refunds</DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Users</DropdownMenuLabel>
              <DropdownMenuCheckboxItem>My Activities</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Team Activities</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" className="h-9">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="all">All Activity</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>
                Showing {filteredActivities.length} of {activityData.length} activities
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="flex items-start gap-4 p-4"
                  >
                    <div className="mt-1 rounded-full bg-muted p-1">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={activity.user.avatar} />
                          <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{activity.user.name}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <Link
                          href={`/dashboard/events/${activity.event.id}`}
                          className="text-sm text-muted-foreground hover:underline"
                        >
                          {activity.event.name}
                        </Link>
                      </div>
                      <p className="text-sm">{activity.details}</p>
                      <div className="flex items-center gap-2 pt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <Badge variant="outline" className="whitespace-nowrap">
                      {activity.type.replace("_", " ")}
                    </Badge>
                  </motion.div>
                ))}

                {filteredActivities.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Clock className="h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No activities found</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {searchTerm
                        ? "No activities match your search criteria."
                        : "There are no recent activities to display."}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="mt-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Ticket Activity</CardTitle>
              <CardDescription>Ticket purchases, refunds, and check-ins</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="flex items-start gap-4 p-4"
                  >
                    <div className="mt-1 rounded-full bg-muted p-1">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={activity.user.avatar} />
                          <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{activity.user.name}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <Link
                          href={`/dashboard/events/${activity.event.id}`}
                          className="text-sm text-muted-foreground hover:underline"
                        >
                          {activity.event.name}
                        </Link>
                      </div>
                      <p className="text-sm">{activity.details}</p>
                      <div className="flex items-center gap-2 pt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <Badge variant="outline" className="whitespace-nowrap">
                      {activity.type.replace("_", " ")}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="mt-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Event Activity</CardTitle>
              <CardDescription>Event creation, updates, and management</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="flex items-start gap-4 p-4"
                  >
                    <div className="mt-1 rounded-full bg-muted p-1">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={activity.user.avatar} />
                          <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{activity.user.name}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <Link
                          href={`/dashboard/events/${activity.event.id}`}
                          className="text-sm text-muted-foreground hover:underline"
                        >
                          {activity.event.name}
                        </Link>
                      </div>
                      <p className="text-sm">{activity.details}</p>
                      <div className="flex items-center gap-2 pt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <Badge variant="outline" className="whitespace-nowrap">
                      {activity.type.replace("_", " ")}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>User Activity</CardTitle>
              <CardDescription>User actions and team management</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="flex items-start gap-4 p-4"
                  >
                    <div className="mt-1 rounded-full bg-muted p-1">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={activity.user.avatar} />
                          <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{activity.user.name}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <Link
                          href={`/dashboard/events/${activity.event.id}`}
                          className="text-sm text-muted-foreground hover:underline"
                        >
                          {activity.event.name}
                        </Link>
                      </div>
                      <p className="text-sm">{activity.details}</p>
                      <div className="flex items-center gap-2 pt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <Badge variant="outline" className="whitespace-nowrap">
                      {activity.type.replace("_", " ")}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
