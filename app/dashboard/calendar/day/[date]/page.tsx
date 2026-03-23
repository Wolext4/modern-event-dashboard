"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Edit, MapPin, Plus, Trash } from "lucide-react"
import { motion } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

// Sample events for a specific day
const dayEvents = [
  {
    id: 1,
    name: "Tech Conference 2025 - Day 1",
    time: "9:00 AM - 6:00 PM",
    location: "San Francisco Convention Center",
    type: "Conference",
    status: "Confirmed",
  },
  {
    id: 2,
    name: "Speaker Preparation Meeting",
    time: "8:00 AM - 8:45 AM",
    location: "Meeting Room A",
    type: "Meeting",
    status: "Confirmed",
  },
  {
    id: 3,
    name: "Networking Lunch",
    time: "12:30 PM - 2:00 PM",
    location: "Main Hall",
    type: "Networking",
    status: "Confirmed",
  },
  {
    id: 4,
    name: "VIP Dinner",
    time: "7:00 PM - 10:00 PM",
    location: "Grand Hotel Restaurant",
    type: "Dinner",
    status: "Confirmed",
  },
]

export default function DayViewPage({ params }: { params: { date: string } }) {
  const [events, setEvents] = useState(dayEvents)
  const [isAddingEvent, setIsAddingEvent] = useState(false)
  const [newEvent, setNewEvent] = useState({
    name: "",
    time: "",
    endTime: "",
    location: "",
    type: "Meeting",
  })

  const formattedDate = new Date(params.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const handleAddEvent = () => {
    if (!newEvent.name || !newEvent.time) return

    const eventToAdd = {
      id: events.length + 1,
      name: newEvent.name,
      time: `${newEvent.time} - ${newEvent.endTime}`,
      location: newEvent.location,
      type: newEvent.type,
      status: "Confirmed",
    }

    setEvents([...events, eventToAdd])

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

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id))

    toast({
      title: "Event deleted",
      description: "The event has been removed from your calendar.",
    })
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/calendar">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{formattedDate}</h1>
          <p className="text-muted-foreground">View and manage events for this day</p>
        </div>
        <div className="ml-auto">
          <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogDescription>Create a new event for {formattedDate}</DialogDescription>
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
                    <Input
                      id="time"
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    placeholder="Enter location"
                  />
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
                      <SelectItem value="Dinner">Dinner</SelectItem>
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
      </div>

      <Card>
        <CardHeader className="p-4">
          <CardTitle>Events for {formattedDate}</CardTitle>
          <CardDescription>{events.length} events scheduled for today</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="flex items-start justify-between p-4"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{event.name}</h3>
                    <div className="mt-1 flex flex-col space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={event.status === "Confirmed" ? "default" : "outline"}>{event.status}</Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/events/${event.id}/edit`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteEvent(event.id)}>
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
            {events.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No events scheduled</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Click the "Add Event" button to create a new event for this day.
                </p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4">
          <Button variant="outline" className="w-full" asChild>
            <Link href={`/dashboard/events/create`}>Create Full Event</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
