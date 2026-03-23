"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Edit, Plus, Search, Trash, Filter, SortAsc, SortDesc } from "lucide-react"
import { motion } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

// Sample event data
const eventData = {
  id: 1,
  name: "Tech Conference 2025",
  tickets: [
    { id: 1, type: "Early Bird", price: "$150", sold: 500, total: 500, status: "Sold Out" },
    { id: 2, type: "Regular", price: "$250", sold: 300, total: 800, status: "On Sale" },
    { id: 3, type: "VIP", price: "$450", sold: 50, total: 200, status: "On Sale" },
  ],
}

export default function ManageTicketsPage({ params }: { params: { id: string } }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [sortBy, setSortBy] = useState("type")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [ticketToDelete, setTicketToDelete] = useState<number | null>(null)

  // Filter and sort tickets
  const filteredTickets = eventData.tickets
    .filter((ticket) => {
      // Apply search filter
      if (searchQuery && !ticket.type.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Apply status filter
      if (filterStatus !== "all") {
        if (filterStatus === "sold-out" && ticket.status !== "Sold Out") return false
        if (filterStatus === "on-sale" && ticket.status !== "On Sale") return false
      }

      return true
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === "type") {
        return sortOrder === "asc" ? a.type.localeCompare(b.type) : b.type.localeCompare(a.type)
      } else if (sortBy === "price") {
        const aPrice = Number.parseFloat(a.price.replace("$", ""))
        const bPrice = Number.parseFloat(b.price.replace("$", ""))
        return sortOrder === "asc" ? aPrice - bPrice : bPrice - aPrice
      } else if (sortBy === "sold") {
        return sortOrder === "asc" ? a.sold - b.sold : b.sold - a.sold
      }
      return 0
    })

  const handleDeleteClick = (ticketId: number) => {
    setTicketToDelete(ticketId)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    // In a real app, you would delete the ticket here
    console.log(`Deleting ticket ${ticketToDelete}`)
    setIsDeleteDialogOpen(false)
    setTicketToDelete(null)
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
          <h1 className="text-2xl font-bold tracking-tight">Manage Tickets</h1>
          <p className="text-muted-foreground">{eventData.name}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button asChild>
            <Link href={`/dashboard/events/${params.id}/tickets/types/create`}>
              <Plus className="mr-2 h-4 w-4" />
              Add Ticket Type
            </Link>
          </Button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Ticket Types</CardTitle>
                <CardDescription>Manage ticket types for this event</CardDescription>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search tickets..."
                    className="pl-8 sm:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setFilterStatus("all")}>All Tickets</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus("on-sale")}>On Sale</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus("sold-out")}>Sold Out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      {sortOrder === "asc" ? (
                        <SortAsc className="mr-2 h-4 w-4" />
                      ) : (
                        <SortDesc className="mr-2 h-4 w-4" />
                      )}
                      Sort
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSortBy("type")}>Ticket Type</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("price")}>Price</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("sold")}>Tickets Sold</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                      {sortOrder === "asc" ? "Descending" : "Ascending"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTickets.length === 0 ? (
                <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                    <p className="mt-2 text-sm text-muted-foreground">
                      No tickets found. Try adjusting your search or filters.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        setSearchQuery("")
                        setFilterStatus("all")
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                </div>
              ) : (
                filteredTickets.map((ticket, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col p-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="mb-4 sm:mb-0">
                          <h3 className="text-lg font-medium">{ticket.type}</h3>
                          <p className="text-sm text-muted-foreground">{ticket.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              ticket.status === "Sold Out"
                                ? "secondary"
                                : ticket.status === "On Sale"
                                  ? "default"
                                  : "outline"
                            }
                          >
                            {ticket.status}
                          </Badge>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/dashboard/events/${params.id}/tickets/types/${ticket.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive"
                            onClick={() => handleDeleteClick(ticket.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </div>
                      <Separator />
                      <div className="p-6">
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span>Sold: {ticket.sold}</span>
                          <span>{Math.round((ticket.sold / ticket.total) * 100)}%</span>
                        </div>
                        <Progress value={(ticket.sold / ticket.total) * 100} className="h-2" />
                        <div className="mt-2 flex items-center justify-between text-sm">
                          <span>Total: {ticket.total}</span>
                          <span>Remaining: {ticket.total - ticket.sold}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
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
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
