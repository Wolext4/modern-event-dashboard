"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Check, Download, Edit, Mail, MapPin, QrCode, Ticket, User } from "lucide-react"
import { motion } from "framer-motion"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

// Sample ticket data
const ticketData = {
  id: "TKT-001",
  eventName: "Tech Conference 2025",
  eventId: 1,
  purchaseDate: "2025-03-15",
  customer: {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  type: "VIP",
  price: "$450.00",
  status: "Confirmed",
  checkedIn: false,
  notes: "Customer requested special seating near the stage.",
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

export default function TicketDetailsPage({ params }: { params: { id: string } }) {
  const [isCheckingIn, setIsCheckingIn] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [checkedIn, setCheckedIn] = useState(ticketData.checkedIn)

  const handleCheckIn = async () => {
    setIsCheckingIn(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setCheckedIn(true)

    toast({
      title: "Ticket checked in",
      description: `${ticketData.customer.name}'s ticket has been checked in successfully.`,
    })

    setIsCheckingIn(false)
  }

  const handleUndoCheckIn = async () => {
    setIsCheckingIn(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setCheckedIn(false)

    toast({
      title: "Check-in undone",
      description: `Check-in for ${ticketData.customer.name}'s ticket has been undone.`,
    })

    setIsCheckingIn(false)
  }

  const handleResendEmail = async () => {
    setIsResending(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Email sent",
      description: `Ticket confirmation email has been resent to ${ticketData.customer.email}.`,
    })

    setIsResending(false)
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/tickets">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Ticket Details</h1>
          <p className="text-muted-foreground">View information for ticket {params.id}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Ticket Information</CardTitle>
                    <CardDescription>Details about this ticket</CardDescription>
                  </div>
                  <Badge variant={ticketData.status === "Confirmed" ? "default" : "destructive"}>
                    {ticketData.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 p-4">
                <div className="flex justify-center">
                  <div className="rounded-md border p-4">
                    <QrCode className="mx-auto h-32 w-32" />
                    <p className="mt-2 text-center text-sm font-medium">{params.id}</p>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Ticket Type</p>
                    <p className="font-medium">{ticketData.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-medium">{ticketData.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Purchase Date</p>
                    <p className="font-medium">{new Date(ticketData.purchaseDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Check-in Status</p>
                    <div className="flex items-center gap-1">
                      {checkedIn ? (
                        <>
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="font-medium text-green-500">Checked In</span>
                        </>
                      ) : (
                        <span className="font-medium">Not Checked In</span>
                      )}
                    </div>
                  </div>
                </div>
                {ticketData.notes && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">Notes</p>
                      <p>{ticketData.notes}</p>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="flex flex-wrap justify-between gap-2 p-4">
                <Button variant="outline" asChild>
                  <Link href={`/dashboard/tickets/${params.id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Ticket
                  </Link>
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleResendEmail} disabled={isResending}>
                    {isResending ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Resend Email
                      </>
                    )}
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`/dashboard/tickets/${params.id}/print`}>
                      <Download className="mr-2 h-4 w-4" />
                      Print Ticket
                    </Link>
                  </Button>
                </div>
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
                  <Ticket className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">{eventData.name}</h4>
                  </div>
                </div>
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
                  <Link href={`/dashboard/events/${ticketData.eventId}`}>View Event Details</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader className="p-4">
                <CardTitle>Customer Information</CardTitle>
                <CardDescription>Details about the ticket holder</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={ticketData.customer.avatar} />
                    <AvatarFallback>{ticketData.customer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="font-medium">{ticketData.customer.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{ticketData.customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{ticketData.customer.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/dashboard/events/${ticketData.eventId}/attendees/${ticketData.customer.id}`}>
                    View Attendee Profile
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
                <CardTitle>Check-in</CardTitle>
                <CardDescription>Manage check-in status for this ticket</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-col items-center justify-center space-y-4 rounded-md border p-6">
                  {checkedIn ? (
                    <>
                      <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                        <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="text-center">
                        <h3 className="font-medium">Ticket Checked In</h3>
                        <p className="text-sm text-muted-foreground">This ticket has been checked in</p>
                      </div>
                      <Button variant="outline" onClick={handleUndoCheckIn} disabled={isCheckingIn} className="w-full">
                        {isCheckingIn ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                            Processing...
                          </>
                        ) : (
                          "Undo Check-in"
                        )}
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="rounded-full bg-muted p-3">
                        <QrCode className="h-6 w-6" />
                      </div>
                      <div className="text-center">
                        <h3 className="font-medium">Ready for Check-in</h3>
                        <p className="text-sm text-muted-foreground">This ticket has not been checked in yet</p>
                      </div>
                      <Button onClick={handleCheckIn} disabled={isCheckingIn} className="w-full">
                        {isCheckingIn ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                            Checking in...
                          </>
                        ) : (
                          "Check In"
                        )}
                      </Button>
                    </>
                  )}
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
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>Recent activity for this ticket</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {checkedIn && (
                    <div className="flex items-start gap-4">
                      <div className="mt-1 rounded-full bg-primary/10 p-1">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Checked in to event</p>
                        <p className="text-xs text-muted-foreground">{new Date().toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-full bg-primary/10 p-1">
                      <Ticket className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Ticket purchased</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(ticketData.purchaseDate).toLocaleString()}
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
                        {new Date(ticketData.purchaseDate).toLocaleString()}
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
