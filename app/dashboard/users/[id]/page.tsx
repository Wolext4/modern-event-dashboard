"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, Edit, Lock, Mail, MapPin, MoreHorizontal, Phone, Shield, User } from "lucide-react"
import { motion } from "framer-motion"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample user data
const userData = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  role: "Admin",
  status: "Active",
  bio: "Event manager with 5+ years of experience organizing tech conferences and workshops.",
  avatar: "/placeholder.svg?height=96&width=96",
  address: "123 Main St",
  city: "San Francisco",
  state: "CA",
  zipCode: "94105",
  country: "United States",
  lastLogin: "2025-04-01T10:30:00",
  createdAt: "2024-01-15T08:20:00",
  eventsCreated: 8,
  ticketsPurchased: 3,
  permissions: {
    createEvents: true,
    manageUsers: true,
    viewReports: true,
    manageSettings: true,
  },
}

// Sample events created by user
const eventsCreated = [
  {
    id: 1,
    name: "Tech Conference 2025",
    date: "May 15-17, 2025",
    status: "Confirmed",
    attendees: 850,
    revenue: "$127,500",
  },
  {
    id: 2,
    name: "Product Launch",
    date: "April 28, 2025",
    status: "Confirmed",
    attendees: 350,
    revenue: "$52,500",
  },
  {
    id: 3,
    name: "Marketing Workshop",
    date: "July 10, 2025",
    status: "Planning",
    attendees: 45,
    revenue: "$13,500",
  },
]

// Sample tickets purchased by user
const ticketsPurchased = [
  {
    id: "TKT-001",
    eventName: "Annual Charity Gala",
    date: "June 5, 2025",
    type: "VIP",
    price: "$450.00",
    status: "Confirmed",
  },
  {
    id: "TKT-002",
    eventName: "Summer Music Festival",
    date: "August 5-7, 2025",
    type: "Weekend Pass",
    price: "$120.00",
    status: "Confirmed",
  },
  {
    id: "TKT-003",
    eventName: "Leadership Summit",
    date: "September 15, 2025",
    type: "Standard",
    price: "$350.00",
    status: "Confirmed",
  },
]

export default function UserProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/users">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Profile</h1>
          <p className="text-muted-foreground">
            View information for {userData.firstName} {userData.lastName}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/users/${params.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit User
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/users/${params.id}/permissions`}>Manage Permissions</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/users/${params.id}/reset-password`}>Reset Password</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {userData.status === "Active" ? (
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/users/${params.id}/deactivate`}>Deactivate User</Link>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/users/${params.id}/activate`}>Activate User</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <div className="md:col-span-3">
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>User's personal details</CardDescription>
                    </div>
                    <Badge variant={userData.status === "Active" ? "default" : "secondary"}>{userData.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={userData.avatar} />
                      <AvatarFallback>
                        {userData.firstName.charAt(0)}
                        {userData.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-xl font-medium">
                          {userData.firstName} {userData.lastName}
                        </h3>
                        <Badge className="mt-1">{userData.role}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{userData.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{userData.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {userData.address}, {userData.city}, {userData.state} {userData.zipCode}, {userData.country}
                          </span>
                        </div>
                      </div>
                      {userData.bio && (
                        <div>
                          <p className="text-sm text-muted-foreground">Bio</p>
                          <p>{userData.bio}</p>
                        </div>
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
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>User's account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Last Login</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p>{new Date(userData.lastLogin).toLocaleString()}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Account Created</p>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <p>{new Date(userData.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground">Permissions</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span>Create Events: {userData.permissions.createEvents ? "Yes" : "No"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span>Manage Users: {userData.permissions.manageUsers ? "Yes" : "No"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span>View Reports: {userData.permissions.viewReports ? "Yes" : "No"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span>Manage Settings: {userData.permissions.manageSettings ? "Yes" : "No"}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/dashboard/users/${params.id}/permissions`}>
                      <Lock className="mr-2 h-4 w-4" />
                      Manage Permissions
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>

        <div className="md:col-span-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader className="p-4">
                <CardTitle>User Activity</CardTitle>
                <CardDescription>Events and tickets associated with this user</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="events" className="w-full">
                  <div className="border-b px-4">
                    <TabsList className="w-full justify-start rounded-none border-b-0 bg-transparent p-0">
                      <TabsTrigger
                        value="events"
                        className="relative rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                      >
                        Events Created ({eventsCreated.length})
                      </TabsTrigger>
                      <TabsTrigger
                        value="tickets"
                        className="relative rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                      >
                        Tickets Purchased ({ticketsPurchased.length})
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="events" className="p-0">
                    <div className="divide-y">
                      {eventsCreated.map((event) => (
                        <div key={event.id} className="flex items-center justify-between p-4">
                          <div>
                            <Link href={`/dashboard/events/${event.id}`} className="font-medium hover:underline">
                              {event.name}
                            </Link>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>{event.date}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={event.status === "Confirmed" ? "default" : "outline"}>{event.status}</Badge>
                            <div className="mt-1 text-sm text-muted-foreground">
                              {event.attendees} attendees • {event.revenue}
                            </div>
                          </div>
                        </div>
                      ))}
                      {eventsCreated.length === 0 && (
                        <div className="p-4 text-center text-muted-foreground">No events created by this user.</div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="tickets" className="p-0">
                    <div className="divide-y">
                      {ticketsPurchased.map((ticket) => (
                        <div key={ticket.id} className="flex items-center justify-between p-4">
                          <div>
                            <Link href={`/dashboard/tickets/${ticket.id}`} className="font-medium hover:underline">
                              {ticket.eventName}
                            </Link>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>{ticket.date}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <span className="text-sm">{ticket.type}</span>
                              <Badge variant={ticket.status === "Confirmed" ? "default" : "destructive"}>
                                {ticket.status}
                              </Badge>
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground">{ticket.price}</div>
                          </div>
                        </div>
                      ))}
                      {ticketsPurchased.length === 0 && (
                        <div className="p-4 text-center text-muted-foreground">No tickets purchased by this user.</div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between p-4">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/events">View All Events</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/dashboard/tickets">View All Tickets</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
