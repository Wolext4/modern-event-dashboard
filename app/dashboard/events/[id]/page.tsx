"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Calendar, Clock, MapPin, Edit, Badge as BadgeIcon } from "lucide-react"
import { motion } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { loadFormData } from "@/lib/form-storage"

export default function EventDetailPage() {
  const router = useRouter()
  const params = useParams()
  const eventId = params.id as string

  const [isLoading, setIsLoading] = useState(true)
  const [event, setEvent] = useState<any>(null)

  // Load event data
  useEffect(() => {
    const loadEvent = async () => {
      try {
        const allEvents = await loadFormData("dashboard/events")
        if (allEvents && allEvents[eventId]) {
          setEvent(allEvents[eventId])
        } else {
          toast({
            title: "Error",
            description: "Event not found",
            variant: "destructive",
          })
          router.push("/dashboard/events")
        }
      } catch (error) {
        console.error("Failed to load event:", error)
        toast({
          title: "Error",
          description: "Failed to load event details",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadEvent()
  }, [eventId, router])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Planning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <p className="text-center text-sm text-muted-foreground">Loading event details...</p>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <p className="text-center text-sm text-muted-foreground">Event not found</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/events">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{event.name}</h1>
            <p className="text-muted-foreground">Event details and information</p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/dashboard/events/${eventId}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Event
          </Link>
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Event Details</CardTitle>
                <CardDescription>Complete information about this event</CardDescription>
              </div>
              <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                  <p className="mt-1 text-base">{event.description}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Type</h3>
                  <Badge variant="outline" className="mt-1">{event.type}</Badge>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar className="mt-1 h-4 w-4 text-muted-foreground" />
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Dates</h3>
                    <p className="mt-1 text-sm">
                      {event.start_date && new Date(event.start_date).toLocaleDateString()} to{" "}
                      {event.end_date && new Date(event.end_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="mt-1 h-4 w-4 text-muted-foreground" />
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Time</h3>
                    <p className="mt-1 text-sm">
                      {event.start_time} to {event.end_time}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-1 h-4 w-4 text-muted-foreground" />
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                    <p className="mt-1 text-sm font-medium">{event.location}</p>
                    <p className="text-sm text-muted-foreground">{event.address}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Organizer</h3>
                  <p className="mt-1 text-sm">{event.organizer}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">Capacity</p>
                    <p className="text-lg font-bold">{event.capacity}</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">Tickets Sold</p>
                    <p className="text-lg font-bold">{event.tickets_sold || 0}</p>
                  </div>
                </div>

                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold">${parseFloat(event.revenue || "0").toFixed(2)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
