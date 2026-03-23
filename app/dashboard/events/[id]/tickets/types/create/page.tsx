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

export default function CreateTicketTypePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    status: "on-sale",
    hasFees: true,
    isLimited: true,
    saleStartDate: "",
    saleEndDate: "",
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
      title: "Ticket type created",
      description: `${formData.name} ticket type has been created successfully.`,
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
          <h1 className="text-2xl font-bold tracking-tight">Create Ticket Type</h1>
          <p className="text-muted-foreground">Add a new ticket type for your event</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter the basic details for this ticket type</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ticket Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g., Early Bird, VIP, Regular"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
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
                        placeholder="0.00"
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
                      min="1"
                      placeholder="100"
                      required
                      value={formData.quantity}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe what's included with this ticket type"
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
                Creating...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Create Ticket Type
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
