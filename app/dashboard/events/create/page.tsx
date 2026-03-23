"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, MapPin, Plus, Save, Trash, Upload } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function CreateEventPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("basic")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    location: "",
    address: "",
    type: "Conference",
    status: "Draft",
    capacity: "",
    organizer: "",
    image: null,
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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Event created",
      description: `${formData.name} has been created successfully.`,
    })

    setIsSubmitting(false)
    router.push("/dashboard/events")
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
                          <Label htmlFor="startDate">Start Date</Label>
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="startDate"
                              name="startDate"
                              type="date"
                              value={formData.startDate}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="endDate">End Date</Label>
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="endDate"
                              name="endDate"
                              type="date"
                              value={formData.endDate}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                          <Label htmlFor="startTime">Start Time</Label>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="startTime"
                              name="startTime"
                              type="time"
                              value={formData.startTime}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="endTime">End Time</Label>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="endTime"
                              name="endTime"
                              type="time"
                              value={formData.endTime}
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
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Ticket Types</h3>
                      <Button type="button" size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Ticket Type
                      </Button>
                    </div>

                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">Early Bird Ticket</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="grid gap-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="earlyBirdPrice">Price</Label>
                              <Input id="earlyBirdPrice" placeholder="$0.00" type="number" step="0.01" />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="earlyBirdQuantity">Quantity</Label>
                              <Input id="earlyBirdQuantity" placeholder="Number of tickets" type="number" />
                            </div>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="earlyBirdDescription">Description</Label>
                            <Textarea
                              id="earlyBirdDescription"
                              placeholder="Describe this ticket type"
                              className="h-20"
                            />
                          </div>
                          <div className="flex justify-end">
                            <Button variant="destructive" size="sm" type="button">
                              <Trash className="mr-2 h-4 w-4" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">Regular Ticket</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="grid gap-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="regularPrice">Price</Label>
                              <Input id="regularPrice" placeholder="$0.00" type="number" step="0.01" />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="regularQuantity">Quantity</Label>
                              <Input id="regularQuantity" placeholder="Number of tickets" type="number" />
                            </div>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="regularDescription">Description</Label>
                            <Textarea
                              id="regularDescription"
                              placeholder="Describe this ticket type"
                              className="h-20"
                            />
                          </div>
                          <div className="flex justify-end">
                            <Button variant="destructive" size="sm" type="button">
                              <Trash className="mr-2 h-4 w-4" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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
                            <Label htmlFor="draft">Draft - Save but don't publish yet</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Published" id="published" />
                            <Label htmlFor="published">Published - Make event visible to the public</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Private" id="private" />
                            <Label htmlFor="private">Private - Only visible with a direct link</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Separator />

                      <div className="grid gap-2">
                        <Label>Event Image</Label>
                        <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8">
                          <div className="flex flex-col items-center justify-center space-y-2 text-center">
                            <Upload className="h-10 w-10 text-muted-foreground" />
                            <div className="flex flex-col space-y-1">
                              <p className="text-sm font-medium">Drag & drop an image here</p>
                              <p className="text-xs text-muted-foreground">PNG, JPG or WEBP, up to 10MB</p>
                            </div>
                            <Button type="button" variant="outline" size="sm">
                              Browse Files
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="grid gap-2">
                        <Label>Confirmation</Label>
                        <p className="text-sm text-muted-foreground">
                          By publishing this event, you confirm that all information is correct and that you have the
                          right to publish this event.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" asChild>
                  <Link href="/dashboard/events">Cancel</Link>
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => {
                      toast({
                        title: "Event saved as draft",
                        description: "Your event has been saved as a draft.",
                      })
                    }}
                  >
                    Save as Draft
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Create Event
                      </>
                    )}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>

          <div className="md:col-span-2">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Tips</CardTitle>
                    <CardDescription>Helpful information for creating a successful event</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Event Name</h4>
                      <p className="text-sm text-muted-foreground">
                        Choose a clear, descriptive name that tells attendees what your event is about.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Description</h4>
                      <p className="text-sm text-muted-foreground">
                        Include key details like speakers, activities, and what attendees will gain from your event.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Tickets</h4>
                      <p className="text-sm text-muted-foreground">
                        Offer different ticket types to appeal to different audiences and budgets.
                      </p>
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
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>How your event will appear to attendees</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="aspect-video w-full bg-muted"></div>
                      <div className="p-4">
                        <h3 className="font-medium">{formData.name || "Event Name"}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {formData.startDate ? new Date(formData.startDate).toLocaleDateString() : "Date"} •{" "}
                          {formData.location || "Location"}
                        </p>
                        <p className="mt-2 text-sm line-clamp-2">
                          {formData.description || "Event description will appear here..."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
