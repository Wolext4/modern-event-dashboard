"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function CancelSubscriptionPage() {
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCancel = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      window.location.href = "/dashboard/settings"
    }, 1000)
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/settings">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold">Cancel Subscription</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Are you sure you want to cancel?</CardTitle>
          <p className="text-sm text-muted-foreground">
            You're currently on the Pro plan ($49.99/month). Your subscription will end on May 5, 2025.
          </p>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-sm">
              You'll lose access to: Unlimited events, Advanced analytics, Custom branding, Priority support
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Please tell us why you're canceling:</h3>
            <RadioGroup value={reason} onValueChange={setReason} className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="too-expensive" id="too-expensive" />
                <Label htmlFor="too-expensive">Too expensive</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="missing-features" id="missing-features" />
                <Label htmlFor="missing-features">Missing features I need</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="not-using" id="not-using" />
                <Label htmlFor="not-using">Not using it enough</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other reason</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/dashboard/settings">Keep Subscription</Link>
          </Button>
          <Button variant="destructive" onClick={handleCancel} disabled={isSubmitting || !reason}>
            {isSubmitting ? "Processing..." : "Confirm Cancellation"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
