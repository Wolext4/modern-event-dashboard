"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, MoreHorizontal, Plus, Search, UserPlus } from "lucide-react"
import { motion } from "framer-motion"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

// Sample event data
const eventData = {
  id: 1,
  name: "Tech Conference 2025",
}

// Sample team members data
const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Event Manager",
    avatar: "/placeholder.svg?height=32&width=32",
    permissions: "Admin",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    role: "Marketing Lead",
    avatar: "/placeholder.svg?height=32&width=32",
    permissions: "Editor",
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael.c@example.com",
    role: "Logistics Coordinator",
    avatar: "/placeholder.svg?height=32&width=32",
    permissions: "Editor",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@example.com",
    role: "Speaker Coordinator",
    avatar: "/placeholder.svg?height=32&width=32",
    permissions: "Editor",
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "robert.w@example.com",
    role: "Technical Support",
    avatar: "/placeholder.svg?height=32&width=32",
    permissions: "Viewer",
  },
]

export default function TeamManagementPage({ params }: { params: { id: string } }) {
  const [members, setMembers] = useState(teamMembers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddingMember, setIsAddingMember] = useState(false)
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "",
    permissions: "Editor",
  })

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email || !newMember.role) return

    const memberToAdd = {
      id: members.length + 1,
      name: newMember.name,
      email: newMember.email,
      role: newMember.role,
      avatar: "/placeholder.svg?height=32&width=32",
      permissions: newMember.permissions,
    }

    setMembers([...members, memberToAdd])

    toast({
      title: "Team member added",
      description: `${newMember.name} has been added to the team.`,
    })

    // Reset form
    setNewMember({
      name: "",
      email: "",
      role: "",
      permissions: "Editor",
    })

    setIsAddingMember(false)
  }

  const handleRemoveMember = (id: number) => {
    setMembers(members.filter((member) => member.id !== id))

    toast({
      title: "Team member removed",
      description: "The team member has been removed from the event.",
    })
  }

  const handleUpdatePermissions = (id: number, permissions: string) => {
    setMembers(members.map((member) => (member.id === id ? { ...member, permissions } : member)))

    toast({
      title: "Permissions updated",
      description: "The team member's permissions have been updated.",
    })
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
          <h1 className="text-2xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground">Manage team members for {eventData.name}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="search"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9"
          />
          <Button variant="outline" size="sm" className="h-9 px-3 lg:px-4">
            <Search className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:ml-2">Search</span>
          </Button>
        </div>
        <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
              <DialogDescription>Add a new team member to help manage this event</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  placeholder="e.g. Marketing Lead, Logistics Coordinator"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="permissions">Permissions</Label>
                <Select
                  value={newMember.permissions}
                  onValueChange={(value) => setNewMember({ ...newMember, permissions: value })}
                >
                  <SelectTrigger id="permissions">
                    <SelectValue placeholder="Select permissions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin (Full Access)</SelectItem>
                    <SelectItem value="Editor">Editor (Can Edit)</SelectItem>
                    <SelectItem value="Viewer">Viewer (Read Only)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingMember(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddMember}>Add Member</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event Team</CardTitle>
          <CardDescription>{members.length} team members assigned to this event</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="flex items-center justify-between rounded-md border p-4"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{member.role}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{member.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    variant={
                      member.permissions === "Admin"
                        ? "default"
                        : member.permissions === "Editor"
                          ? "outline"
                          : "secondary"
                    }
                  >
                    {member.permissions}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/users/${member.id}`}>View Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`mailto:${member.email}`}>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleUpdatePermissions(member.id, "Admin")}>
                        Set as Admin
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUpdatePermissions(member.id, "Editor")}>
                        Set as Editor
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUpdatePermissions(member.id, "Viewer")}>
                        Set as Viewer
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => handleRemoveMember(member.id)}>
                        Remove from Team
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            ))}

            {filteredMembers.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                <UserPlus className="h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No team members found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {searchTerm
                    ? "No team members match your search criteria."
                    : "Add team members to help manage this event."}
                </p>
                {!searchTerm && (
                  <Button className="mt-4" onClick={() => setIsAddingMember(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Team Member
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Team members will receive an email notification when added to the event.
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
