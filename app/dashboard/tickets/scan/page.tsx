"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, QrCode, Search, Ticket, X } from "lucide-react"
import { motion } from "framer-motion"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

// Sample ticket data for scanning
const sampleTicket = {
  id: "TKT-001",
  eventName: "Tech Conference 2025",
  eventId: 1,
  customer: {
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  type: "VIP",
  status: "Confirmed",
  checkedIn: false,
}

export default function TicketScanPage() {
  const [ticketId, setTicketId] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<null | "success" | "error">(null)
  const [scannedTicket, setScannedTicket] = useState<typeof sampleTicket | null>(null)
  const [isCheckingIn, setIsCheckingIn] = useState(false)

  const handleScan = async () => {
    if (!ticketId) return

    setIsScanning(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (ticketId.toUpperCase() === "TKT-001") {
      setScanResult("success")
      setScannedTicket(sampleTicket)
    } else {
      setScanResult("error")
      setScannedTicket(null)
    }

    setIsScanning(false)
  }

  const handleCheckIn = async () => {
    if (!scannedTicket) return

    setIsCheckingIn(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Ticket checked in",
      description: `${scannedTicket.customer.name}'s ticket has been checked in successfully.`,
    })

    setIsCheckingIn(false)
    setTicketId("")
    setScanResult(null)
    setScannedTicket(null)
  }

  const resetScan = () => {
    setTicketId("")
    setScanResult(null)
    setScannedTicket(null)
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
          <h1 className="text-2xl font-bold tracking-tight">Scan Tickets</h1>
          <p className="text-muted-foreground">Scan or enter ticket IDs to check in attendees</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Scan Ticket</CardTitle>
              <CardDescription>Scan QR code or enter ticket ID</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center space-y-4 rounded-md border p-6">
                  <div className="rounded-full bg-muted p-3">
                    <QrCode className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium">Scan QR Code</h3>
                    <p className="text-sm text-muted-foreground">Point your camera at the ticket QR code</p>
                  </div>
                  <Button className="w-full">Open Camera</Button>
                </div>

                <Separator>
                  <span className="px-2 text-xs text-muted-foreground">OR</span>
                </Separator>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Enter ticket ID (e.g., TKT-001)"
                      value={ticketId}
                      onChange={(e) => setTicketId(e.target.value)}
                    />
                    <Button onClick={handleScan} disabled={isScanning || !ticketId}>
                      {isScanning ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                          Scanning...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Search
                        </>
                      )}
                    </Button>
                  </div>
                  {scanResult === "error" && (
                    <p className="text-sm text-destructive">Ticket not found. Please check the ID and try again.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Ticket Information</CardTitle>
              <CardDescription>Details about the scanned ticket</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              {scanResult === "success" && scannedTicket ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={scannedTicket.customer.avatar} />
                      <AvatarFallback>{scannedTicket.customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{scannedTicket.customer.name}</h3>
                      <p className="text-sm text-muted-foreground">{scannedTicket.customer.email}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Ticket ID</p>
                      <p className="font-medium">{scannedTicket.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ticket Type</p>
                      <p className="font-medium">{scannedTicket.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Event</p>
                      <p className="font-medium">{scannedTicket.eventName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge variant={scannedTicket.status === "Confirmed" ? "default" : "destructive"}>
                        {scannedTicket.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="rounded-md bg-muted p-4">
                    <div className="flex items-center gap-2">
                      <Ticket className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">
                        {scannedTicket.checkedIn
                          ? "This ticket has already been checked in."
                          : "This ticket is ready for check-in."}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4 py-8 text-center">
                  <div className="rounded-full bg-muted p-3">
                    <Ticket className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">No Ticket Scanned</h3>
                    <p className="text-sm text-muted-foreground">Scan a ticket or enter a ticket ID to see details</p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between gap-2 p-4">
              {scanResult === "success" && scannedTicket ? (
                <>
                  <Button variant="outline" onClick={resetScan}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button onClick={handleCheckIn} disabled={isCheckingIn || scannedTicket.checkedIn}>
                    {isCheckingIn ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        {scannedTicket.checkedIn ? "Already Checked In" : "Check In"}
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <Button className="w-full" disabled>
                  Check In
                </Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      <Card>
        <CardHeader className="p-4">
          <CardTitle>Recent Check-ins</CardTitle>
          <CardDescription>Recently checked-in attendees</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Michael Chen</p>
                  <p className="text-xs text-muted-foreground">TKT-002 • Regular</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="default">Checked In</Badge>
                <p className="mt-1 text-xs text-muted-foreground">Today, 10:15 AM</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>ED</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Emily Davis</p>
                  <p className="text-xs text-muted-foreground">TKT-003 • Early Bird</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="default">Checked In</Badge>
                <p className="mt-1 text-xs text-muted-foreground">Today, 9:45 AM</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>DK</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">David Kim</p>
                  <p className="text-xs text-muted-foreground">TKT-006 • Standard</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="default">Checked In</Badge>
                <p className="mt-1 text-xs text-muted-foreground">Today, 9:30 AM</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/dashboard/events/1/attendees?tab=checked-in">View All Check-ins</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
