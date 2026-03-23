"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Calendar, Zap, Users, BarChart3, Check } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()

  useEffect(() => {
    const token = typeof window !== "undefined" ? window.localStorage.getItem("authToken") : null
    if (token) {
      router.push("/dashboard")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-sky-400" />
            <h1 className="text-xl font-bold">EventMaster</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push("/login")}>
              Sign in
            </Button>
            <Button onClick={() => router.push("/register")}>
              Get started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="space-y-6 mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-balance">
            Manage Your Events with Ease
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            EventMaster is the complete platform for event planning, ticketing, and attendee management. From small meetups to large conferences, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" onClick={() => router.push("/register")}>
              Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">
            Everything you need to run successful events
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Zap className="h-6 w-6 text-sky-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Easy Event Creation</h4>
                    <p className="text-sm text-muted-foreground">
                      Set up your event in minutes with our intuitive event creation wizard.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Users className="h-6 w-6 text-sky-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Attendee Management</h4>
                    <p className="text-sm text-muted-foreground">
                      Track registrations, manage check-ins, and engage with your attendees.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <BarChart3 className="h-6 w-6 text-sky-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Advanced Analytics</h4>
                    <p className="text-sm text-muted-foreground">
                      Get insights into ticket sales, attendance rates, and attendee demographics.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Calendar className="h-6 w-6 text-sky-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Calendar Integration</h4>
                    <p className="text-sm text-muted-foreground">
                      Sync your events with calendars and send automated reminders.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Check className="h-6 w-6 text-sky-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Ticket Management</h4>
                    <p className="text-sm text-muted-foreground">
                      Create ticket types, manage pricing, and handle QR code scanning.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Zap className="h-6 w-6 text-sky-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Team Collaboration</h4>
                    <p className="text-sm text-muted-foreground">
                      Invite team members and delegate tasks with role-based permissions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="border border-primary/20 rounded-lg p-12 text-center bg-primary/5">
          <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join hundreds of event organizers who trust EventMaster to run their events.
          </p>
          <Button size="lg" onClick={() => router.push("/register")}>
            Create Your Free Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-sky-400" />
              <span className="font-semibold">EventMaster</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 EventMaster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
