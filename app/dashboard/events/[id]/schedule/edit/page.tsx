"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Grip, MapPin, Plus, Save, Trash } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Sample event data
const eventData = {
  id: 1,
  name: "Tech Conference 2025",
  date: "May 15-17, 2025",
}

// Sample schedule data
const scheduleData = [
  {
    day: "Day 1",
    date: "2025-05-15",
    items: [
      {
        id: 1,
        time: "09:00 AM - 10:00 AM",
        title: "Registration & Breakfast",
        location: "Main Hall",
        speaker: "",
        description: "Check-in and breakfast for all attendees",
      },
      {
        id: 2,
        time: "10:00 AM - 11:30 AM",
        title: "Opening Keynote: The Future of Tech",
        location: "Auditorium A",
        speaker: "Jane Smith",
        description: "Keynote address on the future of technology and innovation",
      },
      {
        id: 3,
        time: "11:45 AM - 12:45 PM",
        title: "Panel: Emerging Technologies",
        location: "Auditorium B",
        speaker: "Various Panelists",
        description: "Discussion on emerging technologies and their impact",
      },
      {
        id: 4,
        time: "01:00 PM - 02:00 PM",
        title: "Lunch Break",
        location: "Dining Area",
        speaker: "",
        description: "Networking lunch for all attendees",
      },
    ],
  },
  {
    day: "Day 2",
    date: "2025-05-16",
    items: [
      {
        id: 5,
        time: "09:00 AM - 10:00 AM",
        title: "Breakfast",
        location: "Main Hall",
        speaker: "",
        description: "Breakfast for all attendees",
      },
      {
        id: 6,
        time: "10:00 AM - 11:30 AM",
        title: "Keynote: Product Innovation",
        location: "Auditorium A",
        speaker: "John Doe",
        description: "Keynote on product innovation and development",
      },
      {
        id: 7,
        time: "11:45 AM - 12:45 PM",
        title: "Technical Demos",
        location: "Exhibition Hall",
        speaker: "Various Presenters",
        description: "Live demonstrations of new technologies",
      },
      {
        id: 8,
        time: "01:00 PM - 02:00 PM",
        title: "Lunch Break",
        location: "Dining Area",
        speaker: "",
        description: "Networking lunch for all attendees",
      },
    ],
  },
  {
    day: "Day 3",
    date: "2025-05-17",
    items: [
      {
        id: 9,
        time: "09:00 AM - 10:00 AM",
        title: "Breakfast",
        location: "Main Hall",
        speaker: "",
        description: "Breakfast for all attendees",
      },
      {
        id: 10,
        time: "10:00 AM - 11:30 AM",
        title: "Closing Keynote",
        location: "Auditorium A",
        speaker: "Industry Panel",
        description: "Final keynote address and closing remarks",
      },
      {
        id: 11,
        time: "11:45 AM - 01:00 PM",
        title: "Awards Ceremony",
        location: "Auditorium A",
        speaker: "",
        description: "Recognition of achievements and contributions",
      },
      {
        id: 12,
        time: "01:00 PM - 02:00 PM",
        title: "Farewell Lunch",
        location: "Dining Area",
        speaker: "",
        description: "Final networking opportunity and lunch",
      },
    ],
  },
]

export default function EditSchedulePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [schedule, setSchedule] = useState(scheduleData)
  const [activeTab, setActiveTab] = useState("day1")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddItem = (dayIndex: number) => {
    const newSchedule = [...schedule]
    const newId = Math.max(...schedule.flatMap((day) => day.items.map((item) => item.id))) + 1

    newSchedule[dayIndex].items.push({
      id: newId,
      time: "",
      title: "",
      location: "",
      speaker: "",
      description: "",
    })

    setSchedule(newSchedule)
  }

  const handleRemoveItem = (dayIndex: number, itemIndex: number) => {
    const newSchedule = [...schedule]
    newSchedule[dayIndex].items.splice(itemIndex, 1)
    setSchedule(newSchedule)
  }

  const handleItemChange = (dayIndex: number, itemIndex: number, field: string, value: string) => {
    const newSchedule = [...schedule]
    newSchedule[dayIndex].items[itemIndex] = {
      ...newSchedule[dayIndex].items[itemIndex],
      [field]: value,
    }
    setSchedule(newSchedule)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Schedule updated",
      description: "The event schedule has been updated successfully.",
    })

    setIsSubmitting(false)
    router.push(`/dashboard/events/${params.id}/schedule`)
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/dashboard/events/${params.id}/schedule`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Schedule</h1>
          <p className="text-muted-foreground">Manage the schedule for {eventData.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Event Schedule</CardTitle>
            <CardDescription>Edit session details for each day of the event</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="day1" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="day1">Day 1</TabsTrigger>
                <TabsTrigger value="day2">Day 2</TabsTrigger>
                <TabsTrigger value="day3">Day 3</TabsTrigger>
              </TabsList>

              {schedule.map((day, dayIndex) => (
                <TabsContent key={dayIndex} value={`day${dayIndex + 1}`} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{day.day}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(day.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <Button type="button" onClick={() => handleAddItem(dayIndex)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Session
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {day.items.map((item, itemIndex) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-md border p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <Grip className="h-5 w-5 text-muted-foreground" />
                            <h4 className="font-medium">Session {itemIndex + 1}</h4>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(dayIndex, itemIndex)}
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>

                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                          <div className="grid gap-2">
                            <Label htmlFor={`title-${item.id}`}>Session Title</Label>
                            <Input
                              id={`title-${item.id}`}
                              value={item.title}
                              onChange={(e) => handleItemChange(dayIndex, itemIndex, "title", e.target.value)}
                              placeholder="Enter session title"
                              required
                            />
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor={`time-${item.id}`}>Time</Label>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <Input
                                id={`time-${item.id}`}
                                value={item.time}
                                onChange={(e) => handleItemChange(dayIndex, itemIndex, "time", e.target.value)}
                                placeholder="e.g. 9:00 AM - 10:30 AM"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor={`location-${item.id}`}>Location</Label>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <Input
                                id={`location-${item.id}`}
                                value={item.location}
                                onChange={(e) => handleItemChange(dayIndex, itemIndex, "location", e.target.value)}
                                placeholder="e.g. Main Hall, Room A"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor={`speaker-${item.id}`}>Speaker</Label>
                            <Input
                              id={`speaker-${item.id}`}
                              value={item.speaker}
                              onChange={(e) => handleItemChange(dayIndex, itemIndex, "speaker", e.target.value)}
                              placeholder="Speaker name (if applicable)"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <Label htmlFor={`description-${item.id}`}>Description</Label>
                            <Textarea
                              id={`description-${item.id}`}
                              value={item.description}
                              onChange={(e) => handleItemChange(dayIndex, itemIndex, "description", e.target.value)}
                              placeholder="Brief description of the session"
                              className="mt-2"
                            />
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="flex items-center justify-end gap-2">
                          <Button type="button" variant="outline" size="sm">
                            <Clock className="mr-2 h-3 w-3" />
                            Move Earlier
                          </Button>
                          <Button type="button" variant="outline" size="sm">
                            <Clock className="mr-2 h-3 w-3" />
                            Move Later
                          </Button>
                        </div>
                      </motion.div>
                    ))}

                    {day.items.length === 0 && (
                      <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                        <Calendar className="h-10 w-10 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">No sessions added</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Click the "Add Session" button to add a session to this day.
                        </p>
                        <Button type="button" className="mt-4" onClick={() => handleAddItem(dayIndex)}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Session
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" asChild>
              <Link href={`/dashboard/events/${params.id}/schedule`}>Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Schedule
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
