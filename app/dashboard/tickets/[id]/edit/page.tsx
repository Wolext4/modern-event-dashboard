"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { motion } from "framer-motion"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

// Sample ticket data for editing
const ticketData = {
  id: "TKT-001",
  eventName: "Tech Conference 2025",
  eventId: 1,
  purchaseDate: "2025-03-15",
  customer: {
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  type: "VIP",
  price: "450.00",
  status: "Confirmed",
  checkedIn: false,
  notes: "Customer requested special seating near the stage.",
}

export default function EditTicketPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    type: ticketData.type,
    price: ticketData.price,
    status: ticketData.status,
    checkedIn: ticketData.checkedIn,
    notes: ticketData.notes,
    customerName: ticketData.customer.name,
    customerEmail: ticketData.customer.email,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Ticket updated",
      description: `Ticket ${params.id} has been updated successfully.`,
    })

    setIsSubmitting(false)
    router.push(`/dashboard/tickets/${params.id}`)
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/dashboard/tickets/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Ticket</h1>
          <p className="text-muted-foreground">Update information for ticket {params.id}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Ticket Information</CardTitle>
                  <CardDescription>Update the ticket details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Ticket ID</Label>
                    <Input value={params.id} disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Event</Label>
                    <Input value={ticketData.eventName} disabled />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Ticket Type</Label>
                    <Select defaultValue={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select ticket type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Early Bird">Early Bird</SelectItem>
                        <SelectItem value="Regular">Regular</SelectItem>
                        <SelectItem value="VIP">VIP</SelectItem>
                        <SelectItem value="Standard">Standard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <div className="flex items-center">
                      <span className="mr-2">$</span>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Purchase Date</Label>
                    <Input value={new Date(ticketData.purchaseDate).toLocaleDateString()} disabled />
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
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                  <CardDescription>Update the customer details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={ticketData.customer.avatar} />
                      <AvatarFallback>{ticketData.customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Current Customer</p>
                      <p className="text-xs text-muted-foreground">{ticketData.customer.email}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="customerName">Customer Name</Label>
                    <Input
                      id="customerName"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customerEmail">Customer Email</Label>
                    <Input
                      id="customerEmail"
                      name="customerEmail"
                      type="email"
                      value={formData.customerEmail}
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Ticket Status</CardTitle>
                  <CardDescription>Update the status of this ticket</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <RadioGroup
                      defaultValue={formData.status}
                      onValueChange={(value) => handleSelectChange("status", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Confirmed" id="confirmed" />
                        <Label htmlFor="confirmed">Confirmed</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Refunded" id="refunded" />
                        <Label htmlFor="refunded">Refunded</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Cancelled" id="cancelled" />
                        <Label htmlFor="cancelled">Cancelled</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Check-in Status</Label>
                    <RadioGroup
                      defaultValue={formData.checkedIn ? "checked-in" : "not-checked-in"}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, checkedIn: value === "checked-in" }))}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="not-checked-in" id="not-checked-in" />
                        <Label htmlFor="not-checked-in">Not Checked In</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="checked-in" id="checked-in" />
                        <Label htmlFor="checked-in">Checked In</Label>
                      </div>
                    </RadioGroup>
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
                <CardHeader>
                  <CardTitle>Notes</CardTitle>
                  <CardDescription>Add any additional information about this ticket</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Input id="notes" name="notes" value={formData.notes} onChange={handleChange} />
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
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                  <CardDescription>Quick actions for this ticket</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm" asChild>
                    <Link href={`/dashboard/tickets/${params.id}/resend`}>Resend Ticket Email</Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm" asChild>
                    <Link href={`/dashboard/tickets/${params.id}/print`}>Print Ticket</Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-destructive" size="sm" asChild>
                    <Link href={`/dashboard/tickets/${params.id}/refund`}>Refund Ticket</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" type="button" asChild>
            <Link href={`/dashboard/tickets/${params.id}`}>Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
