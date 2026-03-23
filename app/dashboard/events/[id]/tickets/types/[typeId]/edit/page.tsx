"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Sample ticket type data
const ticketTypeData = {
  id: 1,
  name: "Early Bird",
  price: "150.00",
  quantity: "500",
  description: "Limited early bird tickets at a discounted price.",
  status: "on-sale",
  hasFees: true,
  isLimited: true,
  saleStartDate: "2025-01-01T00:00",
  saleEndDate: "2025-03-01T00:00",
  sold: 200,
}

export default function EditTicketTypePage({ params }: { params: { id: string; typeId: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: ticketTypeData.name,
    price: ticketTypeData.price,
    quantity: ticketTypeData.quantity,
    description: ticketTypeData.description,
    status: ticketTypeData.status,
    hasFees: ticketTypeData.hasFees,
    isLimited: ticketTypeData.isLimited,
    saleStartDate: ticketTypeData.saleStartDate,
    saleEndDate: ticketTypeData.saleEndDate,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Ticket type updated",
      description: `${formData.name} ticket type has been updated successfully.`,
    })

    setIsSubmitting(false)
    router.push(`/dashboard/events/${params.id}/tickets/manage`)
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/dashboard/events/${params.id}/tickets/manage`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Ticket Type</h1>
          <p className="text-muted-foreground">Update details for {ticketTypeData.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Update the basic details for this ticket type</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ticket Name</Label>
                    <Input id="name" name="name" required value={formData.name} onChange={handleChange} />
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
                        min="0"
                        required
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity Available</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min={ticketTypeData.sold}
                      required
                      value={formData.quantity}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      {ticketTypeData.sold} tickets already sold. Minimum quantity must be at least{" "}
                      {ticketTypeData.sold}.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Ticket Settings</CardTitle>
                  <CardDescription>Configure additional settings for this ticket type</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <RadioGroup
                      defaultValue={formData.status}
                      onValueChange={(value) => handleRadioChange("status", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="on-sale" id="on-sale" />
                        <Label htmlFor="on-sale">On Sale</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hidden" id="hidden" />
                        <Label htmlFor="hidden">Hidden</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="scheduled" id="scheduled" />
                        <Label htmlFor="scheduled">Scheduled</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sold-out" id="sold-out" />
                        <Label htmlFor="sold-out">Sold Out</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="hasFees">Include Service Fees</Label>
                    <Switch
                      id="hasFees"
                      checked={formData.hasFees}
                      onCheckedChange={(checked) => handleSwitchChange("hasFees", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="isLimited">Limited Quantity</Label>
                    <Switch
                      id="isLimited"
                      checked={formData.isLimited}
                      onCheckedChange={(checked) => handleSwitchChange("isLimited", checked)}
                    />
                  </div>

                  {formData.status === "scheduled" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="saleStartDate">Sale Start Date</Label>
                        <Input
                          id="saleStartDate"
                          name="saleStartDate"
                          type="datetime-local"
                          value={formData.saleStartDate}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="saleEndDate">Sale End Date</Label>
                        <Input
                          id="saleEndDate"
                          name="saleEndDate"
                          type="datetime-local"
                          value={formData.saleEndDate}
                          onChange={handleChange}
                        />
                      </div>
                    </>
                  )}
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
                  <CardTitle>Sales Information</CardTitle>
                  <CardDescription>Current sales statistics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Tickets Sold</p>
                      <p className="text-2xl font-bold">{ticketTypeData.sold}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Remaining</p>
                      <p className="text-2xl font-bold">
                        {Number.parseInt(ticketTypeData.quantity) - ticketTypeData.sold}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Revenue</p>
                    <p className="text-2xl font-bold">
                      ${(Number.parseFloat(ticketTypeData.price) * ticketTypeData.sold).toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" type="button" asChild>
            <Link href={`/dashboard/events/${params.id}/tickets/manage`}>Cancel</Link>
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
