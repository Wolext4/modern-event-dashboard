"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin } from "lucide-react"
import { motion } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

// Sample events data
const events = [
  {
    id: 1,
    name: "Tech Conference 2025",
    date: "2025-05-15",
    endDate: "2025-05-17",
    time: "9:00 AM - 6:00 PM",
    location: "San Francisco, CA",
    type: "Conference",
    status: "Confirmed",
  },
  {
    id: 2,
    name: "Annual Charity Gala",
    date: "2025-06-05",
    endDate: "2025-06-05",
    time: "7:00 PM - 11:00 PM",
    location: "New York, NY",
    type: "Gala",
    status: "Planning",
  },
  {
    id: 3,
    name: "Product Launch",
    date: "2025-04-28",
    endDate: "2025-04-28",
    time: "10:00 AM - 2:00 PM",
    location: "Chicago, IL",
    type: "Launch",
    status: "Confirmed",
  },
  {
    id: 4,
    name: "Marketing Workshop",
    date: "2025-07-10",
    endDate: "2025-07-10",
    time: "9:00 AM - 4:00 PM",
    location: "Boston, MA",
    type: "Workshop",
    status: "Planning",
  },
  {
    id: 5,
    name: "Team Meeting",
    date: "2025-05-08",
    endDate: "2025-05-08",
    time: "2:00 PM - 3:30 PM",
    location: "Virtual",
    type: "Meeting",
    status: "Confirmed",
  },
  {
    id: 6,
    name: "Vendor Meeting",
    date: "2025-05-22",
    endDate: "2025-05-22",
    time: "11:00 AM - 12:00 PM",
    location: "Office",
    type: "Meeting",
    status: "Confirmed",
  },
]

// Helper functions for calendar
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate()
}

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay()
}

const formatDate = (year: number, month: number, day: number) => {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [activeView, setActiveView] = useState("month")
  const [isAddingEvent, setIsAddingEvent] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const [newEvent, setNewEvent] = useState({
    name: "",
    time: "",
    endTime: "",
    location: "",
    type: "Meeting",
  })
  const [allEvents, setAllEvents] = useState(events)

  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)

  // Adjust for Sunday as first day of week (0)
  const startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  const getEventsForDate = (year: number, month: number, day: number) => {
    const dateString = formatDate(year, month, day)
    return allEvents.filter((event) => {
      // Check if the date is between start and end dates
      return dateString >= event.date && dateString <= event.endDate
    })
  }

  const handleAddEvent = () => {
    if (!newEvent.name || !newEvent.time || !selectedDate) return

    const eventToAdd = {
      id: allEvents.length + 1,
      name: newEvent.name,
      date: selectedDate,
      endDate: selectedDate,
      time: `${newEvent.time} - ${newEvent.endTime}`,
      location: newEvent.location,
      type: newEvent.type,
      status: "Confirmed",
    }

    setAllEvents([...allEvents, eventToAdd])

    toast({
      title: "Event added",
      description: `${newEvent.name} has been added to your calendar.`,
    })

    // Reset form
    setNewEvent({
      name: "",
      time: "",
      endTime: "",
      location: "",
      type: "Meeting",
    })

    setIsAddingEvent(false)
  }

  const openAddEventDialog = (date: string) => {
    setSelectedDate(date)
    setIsAddingEvent(true)
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">Manage your event schedule</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/events/create">
            <Plus className="mr-2 h-4 w-4" />
            New Event
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="p-4 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-semibold">
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Tabs defaultValue="month" onValueChange={setActiveView}>
                <TabsList>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button variant="outline" size="sm">
                Today
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          {activeView === "month" && (
            <div className="grid grid-cols-7 gap-1">
              {/* Calendar header */}
              {weekDays.map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}

              {/* Empty cells for days before the first day of month */}
              {Array.from({ length: startingDay }).map((_, index) => (
                <div key={`empty-${index}`} className="min-h-24 rounded-md border border-transparent p-1" />
              ))}

              {/* Calendar days */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1
                const dateString = formatDate(currentYear, currentMonth, day)
                const isToday = new Date().toISOString().split("T")[0] === dateString
                const dayEvents = getEventsForDate(currentYear, currentMonth, day)

                return (
                  <motion.div
                    key={day}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.01 }}
                    className={`min-h-24 rounded-md border p-1 transition-colors hover:bg-accent ${
                      isToday ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/dashboard/calendar/day/${dateString}`}
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-sm ${
                          isToday ? "bg-primary text-primary-foreground" : ""
                        }`}
                      >
                        {day}
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 p-0"
                        onClick={() => openAddEventDialog(dateString)}
                      >
                        <Plus className="h-3 w-3" />
                        <span className="sr-only">Add event</span>
                      </Button>
                    </div>
                    <div className="mt-1 space-y-1">
                      {dayEvents.slice(0, 3).map((event) => (
                        <Link
                          key={event.id}
                          href={`/dashboard/events/${event.id}`}
                          className={`block truncate rounded-sm p-1 text-xs ${
                            event.status === "Confirmed"
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {event.time.split(" - ")[0]} {event.name}
                        </Link>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="rounded-sm p-1 text-xs text-muted-foreground">+{dayEvents.length - 3} more</div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}

          {activeView === "week" && (
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-2">
                {/* Week view header */}
                {Array.from({ length: 7 }).map((_, index) => {
                  const date = new Date(currentYear, currentMonth, index + 1)
                  const dayName = weekDays[index]
                  const dayNumber = date.getDate()

                  return (
                    <div key={index} className="text-center">
                      <div className="text-sm font-medium text-muted-foreground">{dayName}</div>
                      <div className="mt-1 text-lg">{dayNumber}</div>
                    </div>
                  )
                })}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }).map((_, index) => {
                  const date = new Date(currentYear, currentMonth, index + 1)
                  const dateString = date.toISOString().split("T")[0]
                  const dayEvents = allEvents.filter((event) => event.date === dateString)

                  return (
                    <div key={index} className="min-h-[300px] rounded-md border p-2">
                      <div className="flex justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 p-0"
                          onClick={() => openAddEventDialog(dateString)}
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Add event</span>
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {dayEvents.map((event) => (
                          <Link
                            key={event.id}
                            href={`/dashboard/events/${event.id}`}
                            className="block rounded-md border p-2 text-sm hover:bg-accent"
                          >
                            <div className="font-medium">{event.name}</div>
                            <div className="text-xs text-muted-foreground">{event.time}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {activeView === "day" && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-medium">
                  {new Date(currentYear, currentMonth, 15).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
                <div className="mt-2 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openAddEventDialog(formatDate(currentYear, currentMonth, 15))}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Event
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                {Array.from({ length: 12 }).map((_, index) => {
                  const hour = index + 8 // Start from 8 AM
                  const timeString = `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? "PM" : "AM"}`
                  const dateString = formatDate(currentYear, currentMonth, 15)
                  const hourEvents = allEvents.filter(
                    (event) => event.date === dateString && event.time.includes(timeString),
                  )

                  return (
                    <div key={index} className="flex gap-2">
                      <div className="w-20 py-2 text-right text-sm text-muted-foreground">{timeString}</div>
                      <div className="flex-1 rounded-md border p-2 hover:bg-accent">
                        {hourEvents.map((event) => (
                          <Link
                            key={event.id}
                            href={`/dashboard/events/${event.id}`}
                            className="block rounded-md bg-primary/10 p-2 text-sm"
                          >
                            <div className="font-medium">{event.name}</div>
                            <div className="text-xs text-muted-foreground">{event.time}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {activeView === "list" && (
            <div className="space-y-4">
              {allEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Link href={`/dashboard/events/${event.id}`} className="text-lg font-medium hover:underline">
                            {event.name}
                          </Link>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>
                              {new Date(event.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                            <span>•</span>
                            <span>{event.time}</span>
                            <span>•</span>
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <Badge variant={event.status === "Confirmed" ? "default" : "outline"}>{event.status}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your next scheduled events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allEvents.slice(0, 3).map((event) => (
                <div key={event.id} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                    <span className="text-lg font-bold text-primary">{new Date(event.date).getDate()}</span>
                  </div>
                  <div className="flex-1">
                    <Link href={`/dashboard/events/${event.id}`} className="font-medium hover:underline">
                      {event.name}
                    </Link>
                    <div className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      • {event.time}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/events/${event.id}`}>View</Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Categories</CardTitle>
            <CardDescription>Events by type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary"></div>
                  <span>Conferences</span>
                </div>
                <span className="font-medium">2</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span>Workshops</span>
                </div>
                <span className="font-medium">1</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                  <span>Meetings</span>
                </div>
                <span className="font-medium">2</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span>Galas</span>
                </div>
                <span className="font-medium">1</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Event Dialog */}
      <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              Create a new event for {selectedDate ? new Date(selectedDate).toLocaleDateString() : "selected date"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Event Name</Label>
              <Input
                id="name"
                value={newEvent.name}
                onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                placeholder="Enter event name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="time">Start Time</Label>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endTime">End Time</Label>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="endTime"
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  placeholder="Enter location"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Event Type</Label>
              <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Meeting">Meeting</SelectItem>
                  <SelectItem value="Conference">Conference</SelectItem>
                  <SelectItem value="Workshop">Workshop</SelectItem>
                  <SelectItem value="Networking">Networking</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingEvent(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEvent}>Add Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
