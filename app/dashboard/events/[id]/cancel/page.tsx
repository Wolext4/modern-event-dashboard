"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertTriangle, ArrowLeft, Calendar, MapPin } from "lucide-react"
import { motion } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Sample event data
const eventData = {
  id: 1,
  name: "Tech Conference 2025",
  date: "May 15-17, 2025",
  location: "San Francisco Convention Center",
  address: "747 Howard St, San Francisco, CA 94103",
  attendees: 850,
  ticketsSold: 850,
  revenue: "$127,500",
  status: "Confirmed",
}

export default function CancelEventPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reason, setReason] = useState("")
  const [refundOption, setRefundOption] = useState("full")
  const [notifyAttendees, setNotifyAttendees] = useState(true)
  const [notifyTeam, setNotifyTeam] = useState(true)
  const [confirmed, setConfirmed] = useState(false)

  const handleCancel = async () => {
    if (!confirmed) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Event cancelled",
      description: `${eventData.name} has been cancelled successfully.`,
    })

    setIsSubmitting(false)
    router.push("/dashboard/events")
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/dashboard/events/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cancel Event</h1>
          <p className="text-muted-foreground">Cancel {eventData.name} and manage refunds</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Cancel Event</CardTitle>
                  <CardDescription>Review the event details before cancellation</CardDescription>
                </div>
                <div className="rounded-full bg-destructive/10 p-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{eventData.name}</h3>
                  <Badge>{eventData.status}</Badge>
                </div>
                <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{eventData.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{eventData.location}</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Attendees</p>
                    <p className="font-medium">{eventData.attendees}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tickets Sold</p>
                    <p className="font-medium">{eventData.ticketsSold}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="font-medium">{eventData.revenue}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Cancellation</Label>
                  <Textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Please provide a reason for cancelling this event"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Refund Options</Label>
                  <RadioGroup value={refundOption} onValueChange={setRefundOption}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="full" id="full" />
                      <Label htmlFor="full">Full Refund - Refund all ticket purchases</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="partial" id="partial" />
                      <Label htmlFor="partial">Partial Refund - Refund a percentage of ticket prices</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="none" id="none" />
                      <Label htmlFor="none">No Refund - Do not issue any refunds</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Notifications</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="notifyAttendees"
                        checked={notifyAttendees}
                        onCheckedChange={(checked) => setNotifyAttendees(checked === true)}
                      />
                      <Label htmlFor="notifyAttendees">Notify all attendees about the cancellation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="notifyTeam"
                        checked={notifyTeam}
                        onCheckedChange={(checked) => setNotifyTeam(checked === true)}
                      />
                      <Label htmlFor="notifyTeam">Notify team members about the cancellation</Label>
                    </div>
                  </div>
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
              <CardTitle>Cancellation Impact</CardTitle>
              <CardDescription>Understand the impact of cancelling this event</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="rounded-md bg-destructive/10 p-4 text-destructive">
                <h3 className="font-medium">Warning: This action cannot be undone</h3>
                <p className="mt-2 text-sm">
                  Cancelling this event will permanently remove it from your active events. All ticket sales will be
                  stopped and refunds will be processed according to your selection.
                </p>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="font-medium">Financial Impact</h3>
                  <div className="mt-2 rounded-md border p-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Revenue</p>
                        <p className="font-medium">{eventData.revenue}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Refund Amount</p>
                        <p className="font-medium text-destructive">
                          {refundOption === "full"
                            ? eventData.revenue
                            : refundOption === "partial"
                              ? "$63,750 (50%)"
                              : "$0"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Processing Fees</p>
                        <p className="font-medium">$4,250</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Net Impact</p>
                        <p className="font-medium text-destructive">
                          {refundOption === "full" ? "-$131,750" : refundOption === "partial" ? "-$68,000" : "-$4,250"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium">Attendee Impact</h3>
                  <div className="mt-2 rounded-md border p-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Attendees</p>
                        <p className="font-medium">{eventData.attendees}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Tickets to Refund</p>
                        <p className="font-medium">{eventData.ticketsSold}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email Notifications</p>
                        <p className="font-medium">{notifyAttendees ? eventData.attendees : 0}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Team Notifications</p>
                        <p className="font-medium">{notifyTeam ? 5 : 0}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="confirm"
                      checked={confirmed}
                      onCheckedChange={(checked) => setConfirmed(checked === true)}
                    />
                    <Label htmlFor="confirm" className="text-sm">
                      I understand that cancelling this event cannot be undone and will result in refunds and
                      notifications as specified above.
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between p-4">
              <Button variant="outline" asChild>
                <Link href={`/dashboard/events/${params.id}`}>Go Back</Link>
              </Button>
              <Button variant="destructive" onClick={handleCancel} disabled={!confirmed || isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Cancelling...
                  </>
                ) : (
                  "Cancel Event"
                )}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
