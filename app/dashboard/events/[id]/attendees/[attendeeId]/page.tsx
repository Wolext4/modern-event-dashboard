"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Edit, Mail, MapPin, QrCode, Ticket, User } from "lucide-react"
import { motion } from "framer-motion"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

// Sample attendee data
const attendeeData = {
  id: 1,
  name: "Sarah Johnson",
  email: "sarah.j@example.com",
  phone: "+1 (555) 123-4567",
  ticketId: "TKT-001",
  ticketType: "VIP",
  ticketPrice: "$450.00",
  purchaseDate: "2025-03-15",
  checkedIn: true,
  checkedInTime: "2025-05-15T09:45:00",
  avatar: "/placeholder.svg?height=96&width=96",
  notes: "Requested vegetarian meal option.",
  company: "TechCorp Inc.",
  jobTitle: "Senior Product Manager",
}

// Sample event data
const eventData = {
  id: 1,
  name: "Tech Conference 2025",
  date: "May 15-17, 2025",
  time: "9:00 AM - 6:00 PM",
  location: "San Francisco Convention Center",
  address: "747 Howard St, San Francisco, CA 94103",
}

export default function AttendeeDetailsPage({ params }: { params: { id: string; attendeeId: string } }) {
  const [isCheckingIn, setIsCheckingIn] = useState(false)

  const handleCheckIn = async () => {
    setIsCheckingIn(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Attendee checked in",
      description: `${attendeeData.name} has been checked in successfully.`,
    })

    setIsCheckingIn(false)
  }

  const handleUndoCheckIn = async () => {
    setIsCheckingIn(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Check-in undone",
      description: `Check-in for ${attendeeData.name} has been undone.`,
    })

    setIsCheckingIn(false)
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/dashboard/events/${params.id}/attendees`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Attendee Details</h1>
          <p className="text-muted-foreground">View information for {attendeeData.name}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Attendee's personal details</CardDescription>
                  </div>
                  <Badge variant={attendeeData.checkedIn ? "default" : "outline"}>
                    {attendeeData.checkedIn ? "Checked In" : "Not Checked In"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={attendeeData.avatar} />
                    <AvatarFallback>{attendeeData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="font-medium">{attendeeData.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{attendeeData.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>
                          {attendeeData.jobTitle} at {attendeeData.company}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p>{attendeeData.phone}</p>
                    </div>
                    {attendeeData.notes && (
                      <div>
                        <p className="text-sm text-muted-foreground">Notes</p>
                        <p>{attendeeData.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 p-4">
                <Button variant="outline" asChild>
                  <Link href={`/dashboard/events/${params.id}/attendees/${params.attendeeId}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Details
                  </Link>
                </Button>
                <Button asChild>
                  <Link href={`/dashboard/events/${params.id}/attendees/${params.attendeeId}/email`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="p-4">
                <CardTitle>Event Information</CardTitle>
                <CardDescription>Details about the event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-4">
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
              </CardContent>
              <CardFooter className="p-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/dashboard/events/${params.id}`}>View Event Details</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader className="p-4">
                <CardTitle>Ticket Information</CardTitle>
                <CardDescription>Details about the attendee's ticket</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-4">
                <div className="flex justify-center">
                  <div className="rounded-md border p-4">
                    <QrCode className="mx-auto h-32 w-32" />
                    <p className="mt-2 text-center text-sm font-medium">{attendeeData.ticketId}</p>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Ticket Type</p>
                    <p className="font-medium">{attendeeData.ticketType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-medium">{attendeeData.ticketPrice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Purchase Date</p>
                    <p className="font-medium">{new Date(attendeeData.purchaseDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ticket ID</p>
                    <p className="font-medium">{attendeeData.ticketId}</p>
                  </div>
                </div>
                {attendeeData.checkedIn && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">Checked In Time</p>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <p>{new Date(attendeeData.checkedInTime).toLocaleString()}</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="flex justify-between gap-2 p-4">
                <Button variant="outline" asChild>
                  <Link href={`/dashboard/tickets/${attendeeData.ticketId}`}>
                    <Ticket className="mr-2 h-4 w-4" />
                    View Ticket
                  </Link>
                </Button>
                {attendeeData.checkedIn ? (
                  <Button variant="outline" onClick={handleUndoCheckIn} disabled={isCheckingIn}>
                    {isCheckingIn ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        Processing...
                      </>
                    ) : (
                      "Undo Check-in"
                    )}
                  </Button>
                ) : (
                  <Button onClick={handleCheckIn} disabled={isCheckingIn}>
                    {isCheckingIn ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        Checking in...
                      </>
                    ) : (
                      "Check In"
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="p-4">
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>Recent activity for this attendee</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {attendeeData.checkedIn && (
                    <div className="flex items-start gap-4">
                      <div className="mt-1 rounded-full bg-primary/10 p-1">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Checked in to event</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(attendeeData.checkedInTime).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-full bg-primary/10 p-1">
                      <Ticket className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Purchased ticket</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(attendeeData.purchaseDate).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-full bg-primary/10 p-1">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Confirmation email sent</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(attendeeData.purchaseDate).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
