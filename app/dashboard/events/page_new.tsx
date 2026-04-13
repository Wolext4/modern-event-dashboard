"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarIcon, ChevronDown, Filter, Plus, Search, SortAsc, SortDesc } from "lucide-react"
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

const sampleEvents = [
  {
    id: 1,
    name: "Tech Conference 2024",
    date: "2024-03-15",
    location: "San Francisco, CA",
    status: "Confirmed",
    type: "Conference",
    attendees: 500,
    revenue: "$25,000",
  },
  {
    id: 2,
    name: "Music Festival",
    date: "2024-04-20",
    location: "Austin, TX",
    status: "Planning",
    type: "Festival",
    attendees: 2000,
    revenue: "$50,000",
  },
  {
    id: 3,
    name: "Corporate Retreat",
    date: "2024-05-10",
    location: "Lake Tahoe, CA",
    status: "Draft",
    type: "Corporate",
    attendees: 150,
    revenue: "$15,000",
  },
  {
    id: 4,
    name: "Art Exhibition",
    date: "2024-06-05",
    location: "New York, NY",
    status: "Confirmed",
    type: "Exhibition",
    attendees: 300,
    revenue: "$12,000",
  },
]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [sortByField, setSortByField] = useState("date")

  // Filter and sort events
  const filteredEvents = sampleEvents
    .filter((event) => {
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
    })
    .sort((a, b) => {
      let aValue: any = a[sortByField as keyof typeof a]
      let bValue: any = b[sortByField as keyof typeof b]

      if (sortByField === "date") {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      } else if (sortByField === "attendees") {
        aValue = Number(aValue)
        bValue = Number(bValue)
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Planning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Events</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Event
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <TabsList>
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="planning">Planning</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
          </TabsList>

          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 md:w-[300px]"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter: {filterType === "all" ? "All Types" : filterType}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilterType("all")}>All Types</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("Conference")}>Conference</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("Festival")}>Festival</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("Corporate")}>Corporate</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("Exhibition")}>Exhibition</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {sortOrder === "asc" ? <SortAsc className="mr-2 h-4 w-4" /> : <SortDesc className="mr-2 h-4 w-4" />}
                  Sort: {sortByField}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { setSortByField("date"); setSortOrder("asc") }}>
                  Date (Oldest first)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setSortByField("date"); setSortOrder("desc") }}>
                  Date (Newest first)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setSortByField("name"); setSortOrder("asc") }}>
                  Name (A-Z)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setSortByField("name"); setSortOrder("desc") }}>
                  Name (Z-A)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setSortByField("attendees"); setSortOrder("desc") }}>
                  Attendees (High to Low)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setSortByField("attendees"); setSortOrder("asc") }}>
                  Attendees (Low to High)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <CalendarIcon className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No events found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                        <Badge variant="outline">{event.type}</Badge>
                      </div>
                      <CardTitle className="text-lg">{event.name}</CardTitle>
                      <CardDescription className="flex items-center text-sm">
                        <CalendarIcon className="mr-1 h-4 w-4" />
                        {new Date(event.date).toLocaleDateString()} • {event.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{event.attendees} attendees</span>
                        <span className="font-medium text-foreground">{event.revenue}</span>
                      </div>
                      <Button className="mt-4 w-full" variant="outline" asChild>
                        <Link href={`/dashboard/events/${event.id}`}>View Details</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}