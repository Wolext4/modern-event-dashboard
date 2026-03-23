"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, ChevronDown, Clock, Edit, MapPin, Share2, Ticket, Trash, Users, Plus } from "lucide-react"
import { motion } from "framer-motion"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample event data
const eventData = {
  id: 1,
  name: "Tech Conference 2025",
  description:
    "Join us for the biggest tech conference of the year featuring keynote speakers, workshops, and networking opportunities with industry leaders.",
  date: "May 15-17, 2025",
  time: "9:00 AM - 6:00 PM",
  location: "San Francisco Convention Center",
  address: "747 Howard St, San Francisco, CA 94103",
  attendees: 1200,
  capacity: 1500,
  status: "Confirmed",
  type: "Conference",
  ticketsSold: 850,
  revenue: "$127,500",
  organizer: "TechEvents Inc.",
  image: "/placeholder.svg?height=400&width=800",
  tickets: [
    { type: "Early Bird", price: "$150", sold: 500, total: 500, status: "Sold Out", id: 1 },
    { type: "Regular", price: "$250", sold: 300, total: 800, status: "On Sale", id: 2 },
    { type: "VIP", price: "$450", sold: 50, total: 200, status: "On Sale", id: 3 },
  ],
  speakers: [
    { name: "Jane Smith", role: "CEO, TechGiant", image: "/placeholder.svg?height=100&width=100" },
    { name: "John Doe", role: "CTO, StartupX", image: "/placeholder.svg?height=100&width=100" },
    { name: "Sarah Johnson", role: "AI Researcher", image: "/placeholder.svg?height=100&width=100" },
    { name: "Michael Chen", role: "Product Lead, InnovateCorp", image: "/placeholder.svg?height=100&width=100" },
  ],
  schedule: [
    {
      day: "Day 1",
      date: "May 15",
      items: [
        { time: "9:00 AM - 10:00 AM", title: "Registration & Breakfast", location: "Main Hall" },
        {
          time: "10:00 AM - 11:30 AM",
          title: "Opening Keynote: The Future of Tech",
          speaker: "Jane Smith",
          location: "Auditorium A",
        },
        { time: "11:45 AM - 12:45 PM", title: "Panel: Emerging Technologies", location: "Auditorium B" },
        { time: "1:00 PM - 2:00 PM", title: "Lunch Break", location: "Dining Area" },
        {
          time: "2:15 PM - 3:45 PM",
          title: "Workshop: AI Implementation",
          speaker: "Sarah Johnson",
          location: "Workshop Room 1",
        },
        { time: "4:00 PM - 5:30 PM", title: "Networking Session", location: "Exhibition Hall" },
      ],
    },
    {
      day: "Day 2",
      date: "May 16",
      items: [
        { time: "9:00 AM - 10:00 AM", title: "Breakfast", location: "Main Hall" },
        {
          time: "10:00 AM - 11:30 AM",
          title: "Keynote: Product Innovation",
          speaker: "John Doe",
          location: "Auditorium A",
        },
        { time: "11:45 AM - 12:45 PM", title: "Technical Demos", location: "Exhibition Hall" },
        { time: "1:00 PM - 2:00 PM", title: "Lunch Break", location: "Dining Area" },
        {
          time: "2:15 PM - 3:45 PM",
          title: "Workshop: Cloud Solutions",
          speaker: "Michael Chen",
          location: "Workshop Room 2",
        },
        { time: "4:00 PM - 5:30 PM", title: "Startup Pitch Competition", location: "Auditorium B" },
        { time: "6:30 PM - 9:00 PM", title: "Conference Dinner", location: "Grand Ballroom" },
      ],
    },
    {
      day: "Day 3",
      date: "May 17",
      items: [
        { time: "9:00 AM - 10:00 AM", title: "Breakfast", location: "Main Hall" },
        { time: "10:00 AM - 11:30 AM", title: "Closing Keynote", speaker: "Industry Panel", location: "Auditorium A" },
        { time: "11:45 AM - 1:00 PM", title: "Awards Ceremony", location: "Auditorium A" },
        { time: "1:00 PM - 2:00 PM", title: "Farewell Lunch", location: "Dining Area" },
      ],
    },
  ],
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/events">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{eventData.name}</h1>
          <p className="text-muted-foreground">{eventData.date}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/events/${params.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <span>Actions</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/events/${params.id}/duplicate`}>Duplicate Event</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/events/${params.id}/share`}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Event
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="text-destructive">
                <Link href={`/dashboard/events/${params.id}/cancel`}>
                  <Trash className="mr-2 h-4 w-4" />
                  Cancel Event
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <div className="md:col-span-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Event Details</CardTitle>
                    <CardDescription>Complete information about this event</CardDescription>
                  </div>
                  <Badge
                    variant={
                      eventData.status === "Confirmed"
                        ? "default"
                        : eventData.status === "Planning"
                          ? "outline"
                          : "secondary"
                    }
                  >
                    {eventData.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <img
                  src={eventData.image || "/placeholder.svg"}
                  alt={eventData.name}
                  className="aspect-video w-full object-cover"
                />

                <Tabs defaultValue="overview" className="p-4" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="tickets">Tickets</TabsTrigger>
                    <TabsTrigger value="speakers">Speakers</TabsTrigger>
                    <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-4 space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">About</h3>
                      <p className="mt-2 text-muted-foreground">{eventData.description}</p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-4">
                        <div className="flex items-start gap-2">
                          <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">Date & Time</h4>
                            <p className="text-sm text-muted-foreground">{eventData.date}</p>
                            <p className="text-sm text-muted-foreground">{eventData.time}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">Location</h4>
                            <p className="text-sm text-muted-foreground">{eventData.location}</p>
                            <p className="text-sm text-muted-foreground">{eventData.address}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Users className="mt-0.5 h-5 w-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">Organizer</h4>
                            <p className="text-sm text-muted-foreground">{eventData.organizer}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium">Attendance</h4>
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Tickets Sold: {eventData.ticketsSold}</span>
                              <span>{Math.round((eventData.ticketsSold / eventData.capacity) * 100)}%</span>
                            </div>
                            <Progress value={(eventData.ticketsSold / eventData.capacity) * 100} className="mt-2 h-2" />
                          </div>
                          <div className="mt-4 flex items-center justify-between text-sm">
                            <span>Capacity: {eventData.capacity}</span>
                            <span>Remaining: {eventData.capacity - eventData.ticketsSold}</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium">Revenue</h4>
                          <p className="mt-1 text-2xl font-bold">{eventData.revenue}</p>
                        </div>

                        <div className="flex gap-2">
                          <Button asChild className="flex-1">
                            <Link href={`/dashboard/events/${params.id}/attendees`}>
                              <Users className="mr-2 h-4 w-4" />
                              View Attendees
                            </Link>
                          </Button>
                          <Button variant="outline" asChild className="flex-1">
                            <Link href={`/dashboard/events/${params.id}/tickets/manage`}>
                              <Ticket className="mr-2 h-4 w-4" />
                              Manage Tickets
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="tickets" className="mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Ticket Types</h3>
                        <Button size="sm" asChild>
                          <Link href={`/dashboard/events/${params.id}/tickets/types/create`}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Ticket Type
                          </Link>
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {eventData.tickets.map((ticket, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium">{ticket.type}</h4>
                                  <p className="text-sm text-muted-foreground">{ticket.price}</p>
                                </div>
                                <Badge
                                  variant={
                                    ticket.status === "Sold Out"
                                      ? "secondary"
                                      : ticket.status === "On Sale"
                                        ? "default"
                                        : "outline"
                                  }
                                >
                                  {ticket.status}
                                </Badge>
                              </div>
                              <div className="mt-4">
                                <div className="flex items-center justify-between text-sm">
                                  <span>Sold: {ticket.sold}</span>
                                  <span>{Math.round((ticket.sold / ticket.total) * 100)}%</span>
                                </div>
                                <Progress value={(ticket.sold / ticket.total) * 100} className="mt-2 h-2" />
                              </div>
                              <div className="mt-4 flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Total: {ticket.total}</span>
                                <Button variant="outline" size="sm" asChild>
                                  <Link
                                    href={`/dashboard/events/${params.id}/tickets/types/${ticket.id || index}/edit`}
                                  >
                                    Edit
                                  </Link>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="speakers" className="mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Event Speakers</h3>
                        <Button size="sm" asChild>
                          <Link href={`/dashboard/events/${params.id}/speakers/add`}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Speaker
                          </Link>
                        </Button>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {eventData.speakers.map((speaker, index) => (
                          <Card key={index} className="overflow-hidden">
                            <CardContent className="p-0">
                              <img
                                src={speaker.image || "/placeholder.svg"}
                                alt={speaker.name}
                                className="aspect-square w-full object-cover"
                              />
                              <div className="p-4">
                                <h4 className="font-medium">{speaker.name}</h4>
                                <p className="text-sm text-muted-foreground">{speaker.role}</p>
                                <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                                  <Link href={`/dashboard/events/${params.id}/speakers/${index}`}>View Profile</Link>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="schedule" className="mt-4">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Event Schedule</h3>
                        <Button size="sm" asChild>
                          <Link href={`/dashboard/events/${params.id}/schedule/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Schedule
                          </Link>
                        </Button>
                      </div>

                      <div className="space-y-8">
                        {eventData.schedule.map((day, dayIndex) => (
                          <div key={dayIndex}>
                            <h4 className="mb-4 font-medium">
                              {day.day} - {day.date}
                            </h4>
                            <div className="space-y-4">
                              {day.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex gap-4">
                                  <div className="flex w-32 flex-col items-center">
                                    <div className="rounded-full bg-primary/10 p-2">
                                      <Clock className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="mt-2 text-center text-sm text-muted-foreground">
                                      {item.time.split(" - ")[0]}
                                      <br />
                                      {item.time.split(" - ")[1]}
                                    </div>
                                  </div>
                                  <div className="flex-1 rounded-lg border p-4">
                                    <h5 className="font-medium">{item.title}</h5>
                                    {item.speaker && (
                                      <p className="text-sm text-muted-foreground">Speaker: {item.speaker}</p>
                                    )}
                                    <p className="text-sm text-muted-foreground">Location: {item.location}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="md:col-span-2">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-2">
                    <Button className="w-full justify-start" size="sm" asChild>
                      <Link href={`/dashboard/events/${params.id}/attendees`}>
                        <Users className="mr-2 h-4 w-4" />
                        View Attendees
                      </Link>
                    </Button>
                    <Button className="w-full justify-start" size="sm" variant="outline" asChild>
                      <Link href={`/dashboard/events/${params.id}/tickets/manage`}>
                        <Ticket className="mr-2 h-4 w-4" />
                        Manage Tickets
                      </Link>
                    </Button>
                    <Button className="w-full justify-start" size="sm" variant="outline" asChild>
                      <Link href={`/dashboard/events/${params.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Event
                      </Link>
                    </Button>
                    <Button className="w-full justify-start" size="sm" variant="outline" asChild>
                      <Link href={`/dashboard/events/${params.id}/share`}>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share Event
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium">Event Team</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-muted-foreground">Event Manager</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>AS</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Alice Smith</p>
                        <p className="text-xs text-muted-foreground">Marketing Lead</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>RJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Robert Johnson</p>
                        <p className="text-xs text-muted-foreground">Logistics Coordinator</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href={`/dashboard/events/${params.id}/team`}>Manage Team</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium">Event Stats</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Registration Rate</p>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-lg font-medium">85%</span>
                        <Badge variant="outline" className="text-green-500">
                          +12%
                        </Badge>
                      </div>
                      <Progress value={85} className="mt-2 h-2" />
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">Ticket Revenue</p>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-lg font-medium">$127,500</span>
                        <Badge variant="outline" className="text-green-500">
                          +8%
                        </Badge>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">Website Visits</p>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-lg font-medium">4,280</span>
                        <Badge variant="outline" className="text-green-500">
                          +23%
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href={`/dashboard/events/${params.id}/analytics`}>View Analytics</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
