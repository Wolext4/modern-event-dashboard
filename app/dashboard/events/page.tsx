"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CalendarIcon, ChevronDown, Filter, Plus, Search, SortAsc, SortDesc, CalendarX } from "lucide-react"
import { motion } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Event } from "@/lib/types"

// Sample data (fallback for demo)
const sampleEvents = [
  {
    id: 1,
    name: "Tech Conference 2025",
    date: "May 15-17, 2025",
    location: "San Francisco Convention Center",
    attendees: 1200,
    status: "Confirmed",
    type: "Conference",
    ticketsSold: 850,
    revenue: "$127,500",
  },
  {
    id: 2,
    name: "Annual Charity Gala",
    date: "June 5, 2025",
    location: "Grand Ballroom, New York",
    attendees: 500,
    status: "Planning",
    type: "Gala",
    ticketsSold: 320,
    revenue: "$96,000",
  },
  {
    id: 3,
    name: "Product Launch: NextGen",
    date: "April 28, 2025",
    location: "Tech Hub, Chicago",
    attendees: 350,
    status: "Confirmed",
    type: "Launch",
    ticketsSold: 350,
    revenue: "$52,500",
  },
  {
    id: 4,
    name: "Marketing Workshop",
    date: "July 10, 2025",
    location: "Business Center, Boston",
    attendees: 75,
    status: "Planning",
    type: "Workshop",
    ticketsSold: 45,
    revenue: "$13,500",
  },
  {
    id: 5,
    name: "Summer Music Festival",
    date: "August 5-7, 2025",
    location: "Riverside Park, Austin",
    attendees: 5000,
    status: "Planning",
    type: "Festival",
    ticketsSold: 2800,
    revenue: "$280,000",
  },
  {
    id: 6,
    name: "Leadership Summit",
    date: "September 15, 2025",
    location: "Executive Center, Seattle",
    attendees: 200,
    status: "Draft",
    type: "Summit",
    ticketsSold: 0,
    revenue: "$0",
  },
  {
    id: 7,
    name: "AI & Machine Learning Expo",
    date: "October 3-5, 2025",
    location: "Innovation Center, San Jose",
    attendees: 1500,
    status: "Draft",
    type: "Expo",
    ticketsSold: 0,
    revenue: "$0",
  },
]

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [filterType, setFilterType] = useState("all")

  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [sortByField, setSortByField] = useState("date")
  const [sortBy, setSortBy] = useState("")

  useEffect(() => {
    // Load events from database
    const loadEvents = async () => {
      try {
        const userId = localStorage.getItem('userId') || 'demo-user'
        const response = await fetch('/api/events', {
          headers: {
            'x-user-id': userId,
          },
        })
        if (response.ok) {
          const data = await response.json()
          setEvents(data)
        }
      } catch (error) {
        console.error('Failed to load events:', error)
        // Fallback to sample events for demo
        setEvents(sampleEvents)
      } finally {
        setIsLoading(false)
      }
    }
    loadEvents()
  }, [])

  // Sort events based on the selected sort option
  const sortEvents = (events) => {
    switch (sortBy) {
      case "name-asc":
        return [...events].sort((a, b) => a.name.localeCompare(b.name))
      case "name-desc":
        return [...events].sort((a, b) => b.name.localeCompare(a.name))
      case "date-asc":
        return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      case "date-desc":
        return [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      case "attendees-high":
        return [...events].sort((a, b) => b.attendees - a.attendees)
      case "attendees-low":
        return [...events].sort((a, b) => a.attendees - b.attendees)
      case "revenue-high":
        return [...events].sort((a, b) => {
          const aRevenue = Number.parseFloat(a.revenue.replace(/[^0-9.-]+/g, ""))
          const bRevenue = Number.parseFloat(b.revenue.replace(/[^0-9.-]+/g, ""))
          return bRevenue - aRevenue
        })
      case "revenue-low":
        return [...events].sort((a, b) => {
          const aRevenue = Number.parseFloat(a.revenue.replace(/[^0-9.-]+/g, ""))
          const bRevenue = Number.parseFloat(b.revenue.replace(/[^0-9.-]+/g, ""))
          return aRevenue - bRevenue
        })
      default:
        return events
    }
  }

  // Filter events based on search term and active tab
  const filteredEventsPreTabs = sortEvents(
    events.filter((event) => {
      const matchesSearch =
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "confirmed" && event.status === "Confirmed") ||
        (activeTab === "planning" && event.status === "Planning") ||
        (activeTab === "draft" && event.status === "Draft")

      const matchesFilter = filterType === "all" || event.type === filterType

      return matchesSearch && matchesTab && matchesFilter
    }),
  )

  // Filter and sort events
  const filteredEvents = events
    .filter((event) => {
      // Apply search filter
      if (searchQuery && !event.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Apply status filter
      if (filterStatus !== "all") {
        const eventDate = new Date(event.date.split(" - ")[0])
        const today = new Date()

        if (filterStatus === "upcoming" && eventDate < today) return false
        if (filterStatus === "past" && eventDate >= today) return false
        if (filterStatus === "draft" && event.status !== "Draft") return false
      }

      return true
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortByField === "date") {
        const dateA = new Date(a.date.split(" - ")[0])
        const dateB = new Date(b.date.split(" - ")[0])
        return sortOrder === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
      } else if (sortByField === "name") {
        return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else if (sortByField === "attendees") {
        return sortOrder === "asc" ? a.attendees - b.attendees : b.attendees - a.attendees
      }
      return 0
    })

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Events</h1>
            <p className="text-muted-foreground">Create and manage your events</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/events/create">
              <Plus className="mr-2 h-4 w-4" />
              New Event
            </Link>
          </Button>
        </div>

        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="rounded-full bg-muted p-3">
              <CalendarX className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">No events yet</h3>
              <p className="text-sm text-muted-foreground">
                Create your first event to get started managing attendees, tickets, and schedules.
              </p>
            </div>
            <Button asChild>
              <Link href="/dashboard/events/create">Create Your First Event</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">Create and manage your events</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/events/create">
            <Plus className="mr-2 h-4 w-4" />
            New Event
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="search"
            placeholder="Search events..."
            className="pl-8 sm:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="outline" size="sm" className="h-9 px-3 lg:px-4">
            <Search className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:ml-2">Search</span>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFilterStatus("all")}>All Events</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("upcoming")}>Upcoming</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("past")}>Past</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("draft")}>Draft</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {sortOrder === "asc" ? <SortAsc className="mr-2 h-4 w-4" /> : <SortDesc className="mr-2 h-4 w-4" />}
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSortByField("date")}>Date</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortByField("name")}>Name</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortByField("attendees")}>Attendees</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                {sortOrder === "asc" ? "Descending" : "Ascending"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.length === 0 ? (
              <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                  <CalendarX className="h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No events found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    No events match your current filters. Try adjusting your search or filters.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("")
                      setFilterStatus("all")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            ) : (
              filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden transition-all hover:shadow-md">
                    <CardHeader className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="line-clamp-1 text-lg">
                            <Link href={`/dashboard/events/${event.id}`} className="hover:underline">
                              {event.name}
                            </Link>
                          </CardTitle>
                          <CardDescription className="line-clamp-1">{event.location}</CardDescription>
                        </div>
                        <Badge
                          variant={
                            event.status === "Confirmed"
                              ? "default"
                              : event.status === "Planning"
                                ? "outline"
                                : "secondary"
                          }
                        >
                          {event.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Attendees</p>
                          <p className="font-medium">{event.attendees.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Type</p>
                          <p className="font-medium">{event.type}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Tickets Sold</p>
                          <p className="font-medium">{event.ticketsSold.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Revenue</p>
                          <p className="font-medium">{event.revenue}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/events/${event.id}`}>View Details</Link>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/events/${event.id}/edit`}>Edit Event</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/events/${event.id}/attendees`}>View Attendees</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/events/${event.id}/tickets`}>Manage Tickets</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/events/${event.id}/duplicate`}>Duplicate</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="text-destructive">
                              <Link href={`/dashboard/events/${event.id}/cancel`}>Cancel Event</Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </TabsContent>
        <TabsContent value="confirmed" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.length === 0 ? (
              <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                  <CalendarX className="h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No events found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    No events match your current filters. Try adjusting your search or filters.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("")
                      setFilterStatus("all")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            ) : (
              filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden transition-all hover:shadow-md">
                    {/* Same card content as above */}
                    <CardHeader className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="line-clamp-1 text-lg">
                            <Link href={`/dashboard/events/${event.id}`} className="hover:underline">
                              {event.name}
                            </Link>
                          </CardTitle>
                          <CardDescription className="line-clamp-1">{event.location}</CardDescription>
                        </div>
                        <Badge variant="default">{event.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      {/* Same card content as above */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Attendees</p>
                          <p className="font-medium">{event.attendees.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Type</p>
                          <p className="font-medium">{event.type}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Tickets Sold</p>
                          <p className="font-medium">{event.ticketsSold.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Revenue</p>
                          <p className="font-medium">{event.revenue}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/events/${event.id}`}>View Details</Link>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/events/${event.id}/edit`}>Edit Event</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/events/${event.id}/attendees`}>View Attendees</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/events/${event.id}/tickets`}>Manage Tickets</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/events/${event.id}/duplicate`}>Duplicate</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="text-destructive">
                              <Link href={`/dashboard/events/${event.id}/cancel`}>Cancel Event</Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </TabsContent>
        <TabsContent value="planning" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.length === 0 ? (
              <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                  <CalendarX className="h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No events found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    No events match your current filters. Try adjusting your search or filters.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("")
                      setFilterStatus("all")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            ) : (
              filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden transition-all hover:shadow-md">
                    {/* Same card content structure */}
                    <CardHeader className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="line-clamp-1 text-lg">
                            <Link href={`/dashboard/events/${event.id}`} className="hover:underline">
                              {event.name}
                            </Link>
                          </CardTitle>
                          <CardDescription className="line-clamp-1">{event.location}</CardDescription>
                        </div>
                        <Badge variant="outline">{event.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      {/* Same card content as above */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Attendees</p>
                          <p className="font-medium">{event.attendees.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Type</p>
                          <p className="font-medium">{event.type}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Tickets Sold</p>
                          <p className="font-medium">{event.ticketsSold.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Revenue</p>
                          <p className="font-medium">{event.revenue}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/events/${event.id}`}>View Details</Link>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/events/${event.id}/edit`}>Edit Event</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/events/${event.id}/attendees`}>View Attendees</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/events/${event.id}/tickets`}>Manage Tickets</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/events/${event.id}/duplicate`}>Duplicate</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="text-destructive">
                              <Link href={`/dashboard/events/${event.id}/cancel`}>Cancel Event</Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </TabsContent>
        <TabsContent value="draft" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.length === 0 ? (
              <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                  <CalendarX className="h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No events found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    No events match your current filters. Try adjusting your search or filters.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("")
                      setFilterStatus("all")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            ) : (
              filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden transition-all hover:shadow-md">
                    {/* Same card content structure */}
                    <CardHeader className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="line-clamp-1 text-lg">
                            <Link href={`/dashboard/events/${event.id}`} className="hover:underline">
                              {event.name}
                            </Link>
                          </CardTitle>
                          <CardDescription className="line-clamp-1">{event.location}</CardDescription>
                        </div>
                        <Badge variant="secondary">{event.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      {/* Same card content as above */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Attendees</p>
                          <p className="font-medium">{event.attendees.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Type</p>
                          <p className="font-medium">{event.type}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Tickets Sold</p>
                          <p className="font-medium">{event.ticketsSold.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Revenue</p>
                          <p className="font-medium">{event.revenue}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/events/${event.id}`}>View Details</Link>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/events/${event.id}/edit`}>Edit Event</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/events/${event.id}/publish`}>Publish</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/events/${event.id}/duplicate`}>Duplicate</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="text-destructive">
                              <Link href={`/dashboard/events/${event.id}/delete`}>Delete</Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
