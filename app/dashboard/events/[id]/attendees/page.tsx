"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowUpDown, Download, Filter, Mail, Search, UserPlus } from "lucide-react"
import { motion } from "framer-motion"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample event data
const eventData = {
  id: 1,
  name: "Tech Conference 2025",
  date: "May 15-17, 2025",
  location: "San Francisco Convention Center",
}

// Sample attendees data
const attendees = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    ticketType: "VIP",
    purchaseDate: "2025-03-15",
    checkedIn: true,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.c@example.com",
    ticketType: "Regular",
    purchaseDate: "2025-03-16",
    checkedIn: false,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.d@example.com",
    ticketType: "Early Bird",
    purchaseDate: "2025-03-18",
    checkedIn: true,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    name: "Robert Wilson",
    email: "robert.w@example.com",
    ticketType: "VIP",
    purchaseDate: "2025-03-20",
    checkedIn: false,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 5,
    name: "Jennifer Lopez",
    email: "jennifer.l@example.com",
    ticketType: "Regular",
    purchaseDate: "2025-03-22",
    checkedIn: false,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 6,
    name: "David Kim",
    email: "david.k@example.com",
    ticketType: "Regular",
    purchaseDate: "2025-03-25",
    checkedIn: true,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 7,
    name: "Lisa Brown",
    email: "lisa.b@example.com",
    ticketType: "Early Bird",
    purchaseDate: "2025-03-10",
    checkedIn: true,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 8,
    name: "James Wilson",
    email: "james.w@example.com",
    ticketType: "Regular",
    purchaseDate: "2025-03-12",
    checkedIn: false,
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export default function EventAttendeesPage({ params }: { params: { id: string } }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedTicketType, setSelectedTicketType] = useState("all")
  const [selectedAttendees, setSelectedAttendees] = useState<number[]>([])

  // Filter attendees based on search term, active tab, and selected ticket type
  const filteredAttendees = attendees.filter((attendee) => {
    const matchesSearch =
      attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "checked-in" && attendee.checkedIn) ||
      (activeTab === "not-checked-in" && !attendee.checkedIn)

    const matchesTicketType = selectedTicketType === "all" || attendee.ticketType === selectedTicketType

    return matchesSearch && matchesTab && matchesTicketType
  })

  const toggleSelectAll = () => {
    if (selectedAttendees.length === filteredAttendees.length) {
      setSelectedAttendees([])
    } else {
      setSelectedAttendees(filteredAttendees.map((attendee) => attendee.id))
    }
  }

  const toggleSelectAttendee = (id: number) => {
    if (selectedAttendees.includes(id)) {
      setSelectedAttendees(selectedAttendees.filter((attendeeId) => attendeeId !== id))
    } else {
      setSelectedAttendees([...selectedAttendees, id])
    }
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
          <h1 className="text-2xl font-bold tracking-tight">Attendees</h1>
          <p className="text-muted-foreground">Manage attendees for {eventData.name}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="search"
            placeholder="Search attendees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9"
          />
          <Button variant="outline" size="sm" className="h-9 px-3 lg:px-4">
            <Search className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:ml-2">Search</span>
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={selectedTicketType} onValueChange={setSelectedTicketType}>
            <SelectTrigger className="h-9 w-[180px]">
              <SelectValue placeholder="Filter by ticket" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tickets</SelectItem>
              <SelectItem value="VIP">VIP</SelectItem>
              <SelectItem value="Regular">Regular</SelectItem>
              <SelectItem value="Early Bird">Early Bird</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>All Attendees</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Checked In</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Not Checked In</DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Purchase Date</DropdownMenuLabel>
              <DropdownMenuCheckboxItem>Last 7 days</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Last 30 days</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>All time</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" className="h-9">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9" disabled={selectedAttendees.length === 0}>
            <Mail className="mr-2 h-4 w-4" />
            Email Selected
          </Button>
          <Button variant="outline" size="sm" className="h-9" disabled={selectedAttendees.length === 0}>
            Check In Selected
          </Button>
        </div>
        <Button asChild>
          <Link href={`/dashboard/events/${params.id}/attendees/add`}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Attendee
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="all">All Attendees</TabsTrigger>
          <TabsTrigger value="checked-in">Checked In</TabsTrigger>
          <TabsTrigger value="not-checked-in">Not Checked In</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Attendees</CardTitle>
              <CardDescription>
                Showing {filteredAttendees.length} of {attendees.length} attendees
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={filteredAttendees.length > 0 && selectedAttendees.length === filteredAttendees.length}
                        onCheckedChange={toggleSelectAll}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead>Attendee</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Ticket Type
                        <DropdownMenu>
                          <DropdownMenuTrigger className="ml-1 cursor-pointer">
                            <ArrowUpDown className="h-3 w-3" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>A-Z</DropdownMenuItem>
                            <DropdownMenuItem>Z-A</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Purchase Date
                        <DropdownMenu>
                          <DropdownMenuTrigger className="ml-1 cursor-pointer">
                            <ArrowUpDown className="h-3 w-3" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Newest first</DropdownMenuItem>
                            <DropdownMenuItem>Oldest first</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttendees.map((attendee, index) => (
                    <motion.tr
                      key={attendee.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedAttendees.includes(attendee.id)}
                          onCheckedChange={() => toggleSelectAttendee(attendee.id)}
                          aria-label={`Select ${attendee.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={attendee.avatar} />
                            <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{attendee.name}</div>
                            <div className="text-xs text-muted-foreground">{attendee.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{attendee.ticketType}</TableCell>
                      <TableCell>{new Date(attendee.purchaseDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={attendee.checkedIn ? "default" : "outline"}>
                          {attendee.checkedIn ? "Checked In" : "Not Checked In"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/events/${params.id}/attendees/${attendee.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/events/${params.id}/attendees/${attendee.id}/edit`}>
                                Edit Attendee
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/tickets/TKT-00${attendee.id}`}>View Ticket</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {attendee.checkedIn ? (
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/events/${params.id}/attendees/${attendee.id}/undo-checkin`}>
                                  Undo Check-in
                                </Link>
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/events/${params.id}/attendees/${attendee.id}/checkin`}>
                                  Check In
                                </Link>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/events/${params.id}/attendees/${attendee.id}/email`}>
                                Send Email
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))}
                  {filteredAttendees.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No attendees found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checked-in" className="mt-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Checked In Attendees</CardTitle>
              <CardDescription>Attendees who have checked in to the event</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={filteredAttendees.length > 0 && selectedAttendees.length === filteredAttendees.length}
                        onCheckedChange={toggleSelectAll}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead>Attendee</TableHead>
                    <TableHead>Ticket Type</TableHead>
                    <TableHead>Purchase Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttendees.map((attendee, index) => (
                    <motion.tr
                      key={attendee.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedAttendees.includes(attendee.id)}
                          onCheckedChange={() => toggleSelectAttendee(attendee.id)}
                          aria-label={`Select ${attendee.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={attendee.avatar} />
                            <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{attendee.name}</div>
                            <div className="text-xs text-muted-foreground">{attendee.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{attendee.ticketType}</TableCell>
                      <TableCell>{new Date(attendee.purchaseDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="default">Checked In</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/events/${params.id}/attendees/${attendee.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/events/${params.id}/attendees/${attendee.id}/edit`}>
                                Edit Attendee
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/tickets/TKT-00${attendee.id}`}>View Ticket</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/events/${params.id}/attendees/${attendee.id}/undo-checkin`}>
                                Undo Check-in
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/events/${params.id}/attendees/${attendee.id}/email`}>
                                Send Email
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="not-checked-in" className="mt-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Not Checked In Attendees</CardTitle>
              <CardDescription>Attendees who have not yet checked in to the event</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={filteredAttendees.length > 0 && selectedAttendees.length === filteredAttendees.length}
                        onCheckedChange={toggleSelectAll}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead>Attendee</TableHead>
                    <TableHead>Ticket Type</TableHead>
                    <TableHead>Purchase Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttendees.map((attendee, index) => (
                    <motion.tr
                      key={attendee.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedAttendees.includes(attendee.id)}
                          onCheckedChange={() => toggleSelectAttendee(attendee.id)}
                          aria-label={`Select ${attendee.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={attendee.avatar} />
                            <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{attendee.name}</div>
                            <div className="text-xs text-muted-foreground">{attendee.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{attendee.ticketType}</TableCell>
                      <TableCell>{new Date(attendee.purchaseDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline">Not Checked In</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/events/${params.id}/attendees/${attendee.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/events/${params.id}/attendees/${attendee.id}/edit`}>
                                Edit Attendee
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/tickets/TKT-00${attendee.id}`}>View Ticket</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/events/${params.id}/attendees/${attendee.id}/checkin`}>
                                Check In
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/events/${params.id}/attendees/${attendee.id}/email`}>
                                Send Email
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
