"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, MapPin, Save } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { saveFormData, markUserNotNew } from "@/lib/form-storage"
import { useFormLogger } from "@/hooks/use-form-logger"

export default function CreateEventPage() {
  const router = useRouter()
  const { logSubmission } = useFormLogger()
  const [activeTab, setActiveTab] = useState("basic")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    id: `event-${Date.now()}`,
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    location: "",
    address: "",
    type: "Conference",
    status: "Draft",
    capacity: "",
    organizer: "",
    image: null,
    revenue: "0",
    tickets_sold: "0",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const eventKey = `event-${Date.now()}`
      const eventDataToSave = {
        ...formData,
        id: eventKey,
        created_at: new Date().toISOString(),
        revenue: parseFloat(formData.revenue) || 0,
        tickets_sold: parseInt(formData.tickets_sold) || 0,
      }

      const saved = await saveFormData("dashboard/events", eventKey, eventDataToSave, true)

      await markUserNotNew()

      // Log form submission
      await logSubmission({
        formType: "event_create",
        formName: "Create New Event",
        submittedData: formData,
      })

      if (saved.success) {
        toast({
          title: "Event created",
          description: `${formData.name} has been created successfully.`,
        })
        router.push("/dashboard/events")
      } else {
        throw new Error("Failed to save event")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to save the event. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
          <h1 className="text-2xl font-bold tracking-tight">Create New Event</h1>
          <p className="text-muted-foreground">Fill in the details to create a new event</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:col-span-5"
          >
            <Card>
              <CardHeader>
                <CardTitle>Event Information</CardTitle>
                <CardDescription>Provide the details about your event</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basic" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="tickets">Tickets</TabsTrigger>
                    <TabsTrigger value="publish">Publish</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="mt-4 space-y-4">
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Event Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Enter event name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="Describe your event"
                          className="min-h-32"
                          value={formData.description}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label>Event Type</Label>
                        <Select
                          defaultValue={formData.type}
                          onValueChange={(value) => handleSelectChange("type", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Conference">Conference</SelectItem>
                            <SelectItem value="Workshop">Workshop</SelectItem>
                            <SelectItem value="Seminar">Seminar</SelectItem>
                            <SelectItem value="Gala">Gala</SelectItem>
                            <SelectItem value="Festival">Festival</SelectItem>
                            <SelectItem value="Meeting">Meeting</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="organizer">Organizer</Label>
                        <Input
                          id="organizer"
                          name="organizer"
                          placeholder="Who is organizing this event?"
                          value={formData.organizer}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="details" className="mt-4 space-y-4">
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                          <Label htmlFor="start_date">Start Date</Label>
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="start_date"
                              name="start_date"
                              type="date"
                              value={formData.start_date}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="end_date">End Date</Label>
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="end_date"
                              name="end_date"
                              type="date"
                              value={formData.end_date}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                          <Label htmlFor="start_time">Start Time</Label>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="start_time"
                              name="start_time"
                              type="time"
                              value={formData.start_time}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="end_time">End Time</Label>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="end_time"
                              name="end_time"
                              type="time"
                              value={formData.end_time}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="location">Venue Name</Label>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="location"
                            name="location"
                            placeholder="Enter venue name"
                            value={formData.location}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                          id="address"
                          name="address"
                          placeholder="Enter full address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="capacity">Capacity</Label>
                        <Input
                          id="capacity"
                          name="capacity"
                          type="number"
                          placeholder="Maximum number of attendees"
                          value={formData.capacity}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="tickets" className="mt-4 space-y-4">
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="tickets_sold">Tickets Sold</Label>
                        <Input
                          id="tickets_sold"
                          name="tickets_sold"
                          type="number"
                          placeholder="Number of tickets sold"
                          value={formData.tickets_sold}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="revenue">Revenue</Label>
                        <Input
                          id="revenue"
                          name="revenue"
                          type="number"
                          step="0.01"
                          placeholder="Total revenue"
                          value={formData.revenue}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="publish" className="mt-4 space-y-4">
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label>Event Status</Label>
                        <RadioGroup
                          defaultValue={formData.status}
                          onValueChange={(value) => handleSelectChange("status", value)}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Draft" id="draft" />
                            <Label htmlFor="draft" className="font-normal cursor-pointer">
                              Draft
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Planning" id="planning" />
                            <Label htmlFor="planning" className="font-normal cursor-pointer">
                              Planning
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Confirmed" id="confirmed" />
                            <Label htmlFor="confirmed" className="font-normal cursor-pointer">
                              Confirmed
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/events">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Creating..." : "Create Event"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </form>
    </div>
  )
}
