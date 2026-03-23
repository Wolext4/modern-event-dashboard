"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CreditCard, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const initialPaymentMethods = [
  {
    id: "card-1",
    name: "Visa ending in 4242",
    expiry: "04/25",
    isDefault: true,
  },
  {
    id: "card-2",
    name: "Mastercard ending in 5555",
    expiry: "08/24",
    isDefault: false,
  },
  {
    id: "paypal-1",
    name: "PayPal - johndoe@example.com",
    isDefault: false,
  },
]

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods)
  const [defaultMethod, setDefaultMethod] = useState("card-1")

  const handleSetDefault = (id) => {
    setDefaultMethod(id)
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )
  }

  const handleDelete = (id) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
  }

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/settings">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold">Payment Methods</h1>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Your Payment Methods</h2>
        <Button asChild>
          <Link href="/dashboard/billing/payment-methods/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Payment Method
          </Link>
        </Button>
      </div>

      <RadioGroup value={defaultMethod} onValueChange={handleSetDefault} className="space-y-4">
        {paymentMethods.map((method) => (
          <Card key={method.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  <CardTitle className="text-lg">{method.name}</CardTitle>
                </div>
                {method.isDefault && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Default</span>
                )}
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm text-muted-foreground">
                  {method.expiry ? `Expires ${method.expiry}` : "Connected Account"}
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <Label htmlFor={method.id} className="cursor-pointer">
                    Set as default
                  </Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/50 flex justify-between">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/billing/payment-methods/edit">Edit</Link>
              </Button>
              <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(method.id)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </CardFooter>
          </Card>
        ))}
      </RadioGroup>

      <div className="flex justify-end mt-4">
        <Button asChild>
          <Link href="/dashboard/settings">Done</Link>
        </Button>
      </div>
    </div>
  )
}
