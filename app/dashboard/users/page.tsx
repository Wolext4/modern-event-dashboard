"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowUpDown,
  Download,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  UserPlus,
  SortAsc,
  SortDesc,
  Users,
} from "lucide-react"
import { motion } from "framer-motion"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
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

// Sample user data
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2025-04-01T10:30:00",
    avatar: "/placeholder.svg?height=32&width=32",
    eventsCreated: 8,
    ticketsPurchased: 3,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    role: "Event Manager",
    status: "Active",
    lastLogin: "2025-04-02T14:15:00",
    avatar: "/placeholder.svg?height=32&width=32",
    eventsCreated: 5,
    ticketsPurchased: 2,
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael.c@example.com",
    role: "Attendee",
    status: "Active",
    lastLogin: "2025-03-28T09:45:00",
    avatar: "/placeholder.svg?height=32&width=32",
    eventsCreated: 0,
    ticketsPurchased: 7,
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@example.com",
    role: "Event Manager",
    status: "Inactive",
    lastLogin: "2025-02-15T11:20:00",
    avatar: "/placeholder.svg?height=32&width=32",
    eventsCreated: 3,
    ticketsPurchased: 1,
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "robert.w@example.com",
    role: "Attendee",
    status: "Active",
    lastLogin: "2025-04-03T16:40:00",
    avatar: "/placeholder.svg?height=32&width=32",
    eventsCreated: 0,
    ticketsPurchased: 4,
  },
  {
    id: 6,
    name: "Jennifer Lopez",
    email: "jennifer.l@example.com",
    role: "Attendee",
    status: "Active",
    lastLogin: "2025-03-30T13:10:00",
    avatar: "/placeholder.svg?height=32&width=32",
    eventsCreated: 0,
    ticketsPurchased: 2,
  },
  {
    id: 7,
    name: "David Kim",
    email: "david.k@example.com",
    role: "Event Manager",
    status: "Active",
    lastLogin: "2025-04-01T08:55:00",
    avatar: "/placeholder.svg?height=32&width=32",
    eventsCreated: 6,
    ticketsPurchased: 0,
  },
  {
    id: 8,
    name: "Lisa Brown",
    email: "lisa.b@example.com",
    role: "Attendee",
    status: "Inactive",
    lastLogin: "2025-01-20T15:30:00",
    avatar: "/placeholder.svg?height=32&width=32",
    eventsCreated: 0,
    ticketsPurchased: 5,
  },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [sortBy, setSortBy] = useState("login-desc")
  const [dateFilter, setDateFilter] = useState("all")

  const [searchQuery, setSearchQuery] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [sortByFilter, setSortByFilter] = useState("name")

  // Sort users based on the selected sort option
  const sortUsers = (users) => {
    switch (sortBy) {
      case "name-asc":
        return [...users].sort((a, b) => a.name.localeCompare(b.name))
      case "name-desc":
        return [...users].sort((a, b) => b.name.localeCompare(a.name))
      case "role-asc":
        return [...users].sort((a, b) => a.role.localeCompare(b.role))
      case "role-desc":
        return [...users].sort((a, b) => b.role.localeCompare(a.role))
      case "login-asc":
        return [...users].sort((a, b) => new Date(a.lastLogin).getTime() - new Date(b.lastLogin).getTime())
      case "login-desc":
        return [...users].sort((a, b) => new Date(b.lastLogin).getTime() - new Date(a.lastLogin).getTime())
      case "events-high":
        return [...users].sort((a, b) => b.eventsCreated - a.eventsCreated)
      case "tickets-high":
        return [...users].sort((a, b) => b.ticketsPurchased - a.ticketsPurchased)
      default:
        return users
    }
  }

  // Helper function to check if a date is within the specified range
  const isDateInRange = (date, range) => {
    const today = new Date()
    const loginDate = new Date(date)

    switch (range) {
      case "7days":
        const sevenDaysAgo = new Date(today)
        sevenDaysAgo.setDate(today.getDate() - 7)
        return loginDate >= sevenDaysAgo
      case "30days":
        const thirtyDaysAgo = new Date(today)
        thirtyDaysAgo.setDate(today.getDate() - 30)
        return loginDate >= thirtyDaysAgo
      case "90days":
        const ninetyDaysAgo = new Date(today)
        ninetyDaysAgo.setDate(today.getDate() - 90)
        return loginDate >= ninetyDaysAgo
      default:
        return true
    }
  }

  // Filter users based on search term, active tab, and role filter
  const filteredUsers = sortUsers(
    users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "active" && user.status === "Active") ||
        (activeTab === "inactive" && user.status === "Inactive")

      const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase()

      const matchesDate = dateFilter === "all" || isDateInRange(user.lastLogin, dateFilter)

      return matchesSearch && matchesTab && matchesRole && matchesDate
    }),
  )

  // Filter and sort users
  const filteredUsers2 = users
    .filter((user) => {
      // Apply search filter
      if (
        searchQuery &&
        !user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !user.email.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Apply role filter
      if (filterRole !== "all" && user.role.toLowerCase() !== filterRole) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortByFilter === "name") {
        return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else if (sortByFilter === "email") {
        return sortOrder === "asc" ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email)
      } else if (sortByFilter === "role") {
        return sortOrder === "asc" ? a.role.localeCompare(b.role) : b.role.localeCompare(a.role)
      }
      return 0
    })

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage users and their permissions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/users/invite">
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Users
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/users/create">
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8 sm:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="outline" size="sm" className="h-9 px-3 lg:px-4">
            <Search className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:ml-2">Search</span>
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="h-9 w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="event manager">Event Manager</SelectItem>
              <SelectItem value="attendee">Attendee</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFilterRole("all")}>All Users</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterRole("admin")}>Administrators</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterRole("manager")}>Event Managers</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterRole("staff")}>Staff</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {sortOrder === "asc" ? <SortAsc className="mr-2 h-4 w-4" /> : <SortDesc className="mr-2 h-4 w-4" />}
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSortByFilter("name")}>Name</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortByFilter("email")}>Email</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortByFilter("role")}>Role</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                {sortOrder === "asc" ? "Descending" : "Ascending"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" className="h-9">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Users</CardTitle>
              <CardDescription>
                Showing {filteredUsers2.length} of {users.length} users
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Role
                        <DropdownMenu>
                          <DropdownMenuTrigger className="ml-1 cursor-pointer">
                            <ArrowUpDown className="h-3 w-3" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSortBy("role-asc")}>A-Z</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortBy("role-desc")}>Z-A</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Last Login
                        <DropdownMenu>
                          <DropdownMenuTrigger className="ml-1 cursor-pointer">
                            <ArrowUpDown className="h-3 w-3" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSortBy("login-desc")}>Newest first</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortBy("login-asc")}>Oldest first</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableHead>
                    <TableHead>Events Created</TableHead>
                    <TableHead>Tickets Purchased</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers2.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No users found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers2.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <Link href={`/dashboard/users/${user.id}`} className="font-medium hover:underline">
                                {user.name}
                              </Link>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(user.lastLogin).toLocaleDateString()} at{" "}
                          {new Date(user.lastLogin).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </TableCell>
                        <TableCell>{user.eventsCreated}</TableCell>
                        <TableCell>{user.ticketsPurchased}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/users/${user.id}`}>View Profile</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/users/${user.id}/edit`}>Edit User</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/users/${user.id}/permissions`}>Manage Permissions</Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {user.status === "Active" ? (
                                <DropdownMenuItem asChild>
                                  <Link href={`/dashboard/users/${user.id}/deactivate`}>Deactivate User</Link>
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem asChild>
                                  <Link href={`/dashboard/users/${user.id}/activate`}>Activate User</Link>
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </motion.tr>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="mt-4">
          {/* Similar table structure for active users */}
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Active Users</CardTitle>
              <CardDescription>All users with active status</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Events Created</TableHead>
                    <TableHead>Tickets Purchased</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers2.length === 0 ? (
                    <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                        <Users className="h-10 w-10 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-semibold">No users found</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          No users match your current filters. Try adjusting your search or filters.
                        </p>
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => {
                            setSearchQuery("")
                            setFilterRole("all")
                          }}
                        >
                          Reset Filters
                        </Button>
                      </div>
                    </div>
                  ) : (
                    filteredUsers2.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <Link href={`/dashboard/users/${user.id}`} className="font-medium hover:underline">
                                {user.name}
                              </Link>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <Badge variant="default">{user.status}</Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(user.lastLogin).toLocaleDateString()} at{" "}
                          {new Date(user.lastLogin).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </TableCell>
                        <TableCell>{user.eventsCreated}</TableCell>
                        <TableCell>{user.ticketsPurchased}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/users/${user.id}`}>View Profile</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/users/${user.id}/edit`}>Edit User</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/users/${user.id}/permissions`}>Manage Permissions</Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/users/${user.id}/deactivate`}>Deactivate User</Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </motion.tr>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive" className="mt-4">
          {/* Similar table structure for inactive users */}
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Inactive Users</CardTitle>
              <CardDescription>All users with inactive status</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Events Created</TableHead>
                    <TableHead>Tickets Purchased</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers2.length === 0 ? (
                    <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                        <Users className="h-10 w-10 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-semibold">No users found</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          No users match your current filters. Try adjusting your search or filters.
                        </p>
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => {
                            setSearchQuery("")
                            setFilterRole("all")
                          }}
                        >
                          Reset Filters
                        </Button>
                      </div>
                    </div>
                  ) : (
                    filteredUsers2.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <Link href={`/dashboard/users/${user.id}`} className="font-medium hover:underline">
                                {user.name}
                              </Link>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{user.status}</Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(user.lastLogin).toLocaleDateString()} at{" "}
                          {new Date(user.lastLogin).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </TableCell>
                        <TableCell>{user.eventsCreated}</TableCell>
                        <TableCell>{user.ticketsPurchased}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/users/${user.id}`}>View Profile</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/users/${user.id}/edit`}>Edit User</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/users/${user.id}/permissions`}>Manage Permissions</Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/users/${user.id}/activate`}>Activate User</Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </motion.tr>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
