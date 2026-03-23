"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EditPaymentMethodPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSave = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      window.location.href = "/dashboard/billing/payment-methods"
    }, 1000)
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/billing/payment-methods">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold">Edit Payment Method</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Visa ending in 4242</CardTitle>
          <p className="text-sm text-muted-foreground">Expires 04/25</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardName">Name on Card</Label>
              <Input id="cardName" defaultValue="John Doe" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryMonth">Expiration Month</Label>
                <Select defaultValue="04">
                  <SelectTrigger id="expiryMonth">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="01">01</SelectItem>
                    <SelectItem value="02">02</SelectItem>
                    <SelectItem value="03">03</SelectItem>
                    <SelectItem value="04">04</SelectItem>
                    <SelectItem value="05">05</SelectItem>
                    <SelectItem value="06">06</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryYear">Expiration Year</Label>
                <Select defaultValue="25">
                  <SelectTrigger id="expiryYear">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="23">23</SelectItem>
                    <SelectItem value="24">24</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="26">26</SelectItem>
                    <SelectItem value="27">27</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="billingAddress">Billing Address</Label>
              <Input id="billingAddress" defaultValue="123 Main St" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/dashboard/billing/payment-methods">Cancel</Link>
          </Button>
          <Button onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
