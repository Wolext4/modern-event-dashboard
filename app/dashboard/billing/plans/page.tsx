"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

const plans = [
  {
    id: "free",
    name: "Free",
    description: "Basic features for small events",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: ["Up to 3 events", "Basic analytics", "Up to 100 attendees per event", "Email support"],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Advanced features for growing businesses",
    monthlyPrice: 29,
    yearlyPrice: 290,
    popular: true,
    features: [
      "Unlimited events",
      "Advanced analytics",
      "Up to 1,000 attendees per event",
      "Priority email support",
      "Custom branding",
      "Team collaboration (up to 5 members)",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom solutions for large organizations",
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      "Unlimited events",
      "Advanced analytics with custom reports",
      "Unlimited attendees",
      "24/7 phone and email support",
      "Custom branding",
      "Unlimited team members",
      "Dedicated account manager",
    ],
  },
]

export default function BillingPlansPage() {
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [selectedPlan, setSelectedPlan] = useState("pro")

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/profile">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Subscription Plans</h1>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <div className="flex items-center space-x-2">
          <span className={billingCycle === "monthly" ? "font-medium" : "text-muted-foreground"}>Monthly</span>
          <Switch
            checked={billingCycle === "yearly"}
            onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
          />
          <span className={billingCycle === "yearly" ? "font-medium" : "text-muted-foreground"}>
            Yearly <span className="text-sm text-green-600">(Save 20%)</span>
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 w-full">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`${
                selectedPlan === plan.id ? "border-primary ring-2 ring-primary ring-offset-2" : ""
              } ${plan.popular ? "relative" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div className="mt-2 text-muted-foreground text-sm">{plan.description}</div>
                <div className="mt-4">
                  <span className="text-3xl font-bold">
                    ${billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                  </span>
                  <span className="text-muted-foreground">/{billingCycle === "monthly" ? "month" : "year"}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant={selectedPlan === plan.id ? "default" : "outline"}
                  className="w-full"
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {selectedPlan === plan.id ? "Current Plan" : "Select Plan"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/dashboard/profile">Cancel</Link>
          </Button>
          <Button>Subscribe to {plans.find((p) => p.id === selectedPlan)?.name}</Button>
        </div>
      </div>
    </div>
  )
}
