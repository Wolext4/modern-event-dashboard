"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Edit, Plus, Trash } from "lucide-react"
import { motion } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

// Sample ticket types data
const ticketTypes = [
  {
    id: 1,
    name: "Early Bird",
    price: 150.0,
    description: "Limited availability. Get the best price by booking early.",
    available: 100,
    sold: 75,
    active: true,
    startDate: "2025-01-15",
    endDate: "2025-03-01",
  },
  {
    id: 2,
    name: "Regular",
    price: 250.0,
    description: "Standard admission ticket.",
    available: 500,
    sold: 320,
    active: true,
    startDate: "2025-03-02",
    endDate: "2025-05-10",
  },
  {
    id: 3,
    name: "VIP",
    price: 450.0,
    description: "Premium experience with exclusive access and perks.",
    available: 50,
    sold: 30,
    active: true,
    startDate: "2025-01-15",
    endDate: "2025-05-10",
  },
  {
    id: 4,
    name: "Group (5+ people)",
    price: 200.0,
    description: "Discounted rate for groups of 5 or more.",
    available: 100,
    sold: 45,
    active: true,
    startDate: "2025-01-15",
    endDate: "2025-05-10",
  },
  {
    id: 5,
    name: "Student",
    price: 125.0,
    description: "Discounted rate for students with valid ID.",
    available: 200,
    sold: 110,
    active: true,
    startDate: "2025-01-15",
    endDate: "2025-05-10",
  },
  {
    id: 6,
    name: "Last Minute",
    price: 300.0,
    description: "Last chance to attend the event.",
    available: 100,
    sold: 0,
    active: false,
    startDate: "2025-05-11",
    endDate: "2025-05-14",
  },
]

export default function TicketTypesPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedTicketType, setSelectedTicketType] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // New ticket type form state
  const [newTicketType, setNewTicketType] = useState({
    name: "",
    price: "",
    description: "",
    available: "",
    startDate: "",
    endDate: "",
    active: true,
  })

  // Filter ticket types based on active tab
  const filteredTicketTypes = ticketTypes.filter((type) => {
    if (activeTab === "all") return true
    if (activeTab === "active") return type.active
    if (activeTab === "inactive") return !type.active
    return true
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewTicketType((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setNewTicketType((prev) => ({ ...prev, active: checked }))
  }

  const handleAddTicketType = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Ticket type added",
      description: `${newTicketType.name} ticket type has been added successfully.`,
    })

    setIsSubmitting(false)
    setIsAddDialogOpen(false)
    setNewTicketType({
      name: "",
      price: "",
      description: "",
      available: "",
      startDate: "",
      endDate: "",
      active: true,
    })
  }

  const handleDeleteTicketType = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Ticket type deleted",
      description: "The ticket type has been deleted successfully.",
    })

    setIsSubmitting(false)
    setIsDeleteDialogOpen(false)
    setSelectedTicketType(null)
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
          <h1 className="text-2xl font-bold tracking-tight">Ticket Types</h1>
          <p className="text-muted-foreground">Manage ticket types for this event</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">All Types</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
        </Tabs>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Ticket Type
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleAddTicketType}>
              <DialogHeader>
                <DialogTitle>Add Ticket Type</DialogTitle>
                <DialogDescription>
                  Create a new ticket type for this event. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={newTicketType.name}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price ($)
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={newTicketType.price}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    name="description"
                    value={newTicketType.description}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="available" className="text-right">
                    Available
                  </Label>
                  <Input
                    id="available"
                    name="available"
                    type="number"
                    min="1"
                    value={newTicketType.available}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="startDate" className="text-right">
                    Start Date
                  </Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={newTicketType.startDate}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="endDate" className="text-right">
                    End Date
                  </Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={newTicketType.endDate}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="active" className="text-right">
                    Active
                  </Label>
                  <div className="col-span-3 flex items-center space-x-2">
                    <Switch id="active" checked={newTicketType.active} onCheckedChange={handleSwitchChange} />
                    <Label htmlFor="active">
                      {newTicketType.active ? "Available for purchase" : "Not available for purchase"}
                    </Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <TabsContent value="all" className="mt-0">
        <Card>
          <CardHeader className="p-4">
            <CardTitle>All Ticket Types</CardTitle>
            <CardDescription>
              Showing {filteredTicketTypes.length} of {ticketTypes.length} ticket types
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Sold</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sale Period</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTicketTypes.map((type, index) => (
                  <motion.tr
                    key={type.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium">{type.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{type.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>${type.price.toFixed(2)}</TableCell>
                    <TableCell>{type.available}</TableCell>
                    <TableCell>{type.sold}</TableCell>
                    <TableCell>
                      <Badge variant={type.active ? "default" : "secondary"}>
                        {type.active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <p>Start: {new Date(type.startDate).toLocaleDateString()}</p>
                        <p>End: {new Date(type.endDate).toLocaleDateString()}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link href={`/dashboard/events/${params.id}/tickets/types/${type.id}/edit`}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-destructive"
                          onClick={() => {
                            setSelectedTicketType(type.id)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
                {filteredTicketTypes.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No ticket types found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="active" className="mt-0">
        <Card>
          <CardHeader className="p-4">
            <CardTitle>Active Ticket Types</CardTitle>
            <CardDescription>Ticket types currently available for purchase</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Sold</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sale Period</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTicketTypes.map((type, index) => (
                  <motion.tr
                    key={type.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium">{type.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{type.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>${type.price.toFixed(2)}</TableCell>
                    <TableCell>{type.available}</TableCell>
                    <TableCell>{type.sold}</TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <p>Start: {new Date(type.startDate).toLocaleDateString()}</p>
                        <p>End: {new Date(type.endDate).toLocaleDateString()}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link href={`/dashboard/events/${params.id}/tickets/types/${type.id}/edit`}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-destructive"
                          onClick={() => {
                            setSelectedTicketType(type.id)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="inactive" className="mt-0">
        <Card>
          <CardHeader className="p-4">
            <CardTitle>Inactive Ticket Types</CardTitle>
            <CardDescription>Ticket types not currently available for purchase</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Sold</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sale Period</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTicketTypes.map((type, index) => (
                  <motion.tr
                    key={type.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium">{type.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{type.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>${type.price.toFixed(2)}</TableCell>
                    <TableCell>{type.available}</TableCell>
                    <TableCell>{type.sold}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Inactive</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <p>Start: {new Date(type.startDate).toLocaleDateString()}</p>
                        <p>End: {new Date(type.endDate).toLocaleDateString()}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link href={`/dashboard/events/${params.id}/tickets/types/${type.id}/edit`}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-destructive"
                          onClick={() => {
                            setSelectedTicketType(type.id)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Ticket Type</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this ticket type? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteTicketType} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
