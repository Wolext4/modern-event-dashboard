"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Calendar, Users, BarChart3, Settings, Ticket, X } from "lucide-react"

interface TutorialStep {
  id: string
  title: string
  description: string
  icon: React.ElementType
  content: React.ReactNode
}

const tutorialSteps: TutorialStep[] = [
  {
    id: "welcome",
    title: "Welcome to EventMaster!",
    description: "Let's get you started with managing your events effectively.",
    icon: CheckCircle,
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          EventMaster is your complete event management platform. This quick tutorial will help you understand the key features and how to use them effectively.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium">Event Creation</h4>
              <p className="text-sm text-muted-foreground">Create and manage events with ease</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium">Attendee Management</h4>
              <p className="text-sm text-muted-foreground">Track registrations and check-ins</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Ticket className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium">Ticketing System</h4>
              <p className="text-sm text-muted-foreground">Sell tickets and manage payments</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <BarChart3 className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium">Analytics</h4>
              <p className="text-sm text-muted-foreground">Track performance and insights</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "dashboard",
    title: "Your Dashboard",
    description: "Get familiar with your main control center.",
    icon: BarChart3,
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Your dashboard provides an overview of all your events, recent activity, and key metrics. Here's what you'll find:
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Badge variant="secondary" className="mt-0.5">1</Badge>
            <div>
              <h4 className="font-medium">Event Overview</h4>
              <p className="text-sm text-muted-foreground">See all your upcoming and past events at a glance</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="secondary" className="mt-0.5">2</Badge>
            <div>
              <h4 className="font-medium">Quick Stats</h4>
              <p className="text-sm text-muted-foreground">Track total attendees, revenue, and event performance</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="secondary" className="mt-0.5">3</Badge>
            <div>
              <h4 className="font-medium">Recent Activity</h4>
              <p className="text-sm text-muted-foreground">Monitor recent registrations and ticket sales</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "creating-events",
    title: "Creating Your First Event",
    description: "Learn how to set up your first event.",
    icon: Calendar,
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Creating events is simple. Follow these steps to get started:
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Badge variant="secondary" className="mt-0.5">1</Badge>
            <div>
              <h4 className="font-medium">Navigate to Events</h4>
              <p className="text-sm text-muted-foreground">Click on "Events" in the sidebar to access event management</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="secondary" className="mt-0.5">2</Badge>
            <div>
              <h4 className="font-medium">Create New Event</h4>
              <p className="text-sm text-muted-foreground">Click "Create Event" and fill in the basic details</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="secondary" className="mt-0.5">3</Badge>
            <div>
              <h4 className="font-medium">Configure Tickets</h4>
              <p className="text-sm text-muted-foreground">Set up ticket types, pricing, and availability</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="secondary" className="mt-0.5">4</Badge>
            <div>
              <h4 className="font-medium">Publish & Share</h4>
              <p className="text-sm text-muted-foreground">Publish your event and share the registration link</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "managing-attendees",
    title: "Managing Attendees",
    description: "Track and manage your event attendees.",
    icon: Users,
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Keep track of who's attending your events and manage their experience:
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Badge variant="secondary" className="mt-0.5">1</Badge>
            <div>
              <h4 className="font-medium">View Registrations</h4>
              <p className="text-sm text-muted-foreground">Check the "Tickets" section to see all registrations</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="secondary" className="mt-0.5">2</Badge>
            <div>
              <h4 className="font-medium">Check-in Attendees</h4>
              <p className="text-sm text-muted-foreground">Use the check-in feature on the day of the event</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="secondary" className="mt-0.5">3</Badge>
            <div>
              <h4 className="font-medium">Send Communications</h4>
              <p className="text-sm text-muted-foreground">Send emails and updates to your attendees</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "settings",
    title: "Customize Your Experience",
    description: "Personalize EventMaster to fit your needs.",
    icon: Settings,
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Make EventMaster work the way you want it to:
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Badge variant="secondary" className="mt-0.5">1</Badge>
            <div>
              <h4 className="font-medium">Profile Settings</h4>
              <p className="text-sm text-muted-foreground">Update your personal information and preferences</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="secondary" className="mt-0.5">2</Badge>
            <div>
              <h4 className="font-medium">Organization Setup</h4>
              <p className="text-sm text-muted-foreground">Configure your organization details and branding</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="secondary" className="mt-0.5">3</Badge>
            <div>
              <h4 className="font-medium">Notification Preferences</h4>
              <p className="text-sm text-muted-foreground">Choose how and when you want to be notified</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
]

interface OnboardingTutorialProps {
  onComplete: () => void
  onSkip: () => void
}

export default function OnboardingTutorial({ onComplete, onSkip }: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false)

  useEffect(() => {
    const tutorialSeen = localStorage.getItem("tutorialSeen")
    if (tutorialSeen) {
      setHasSeenTutorial(true)
    }
  }, [])

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    localStorage.setItem("tutorialSeen", "true")
    onComplete()
  }

  const handleSkip = () => {
    localStorage.setItem("tutorialSeen", "true")
    onSkip()
  }

  if (hasSeenTutorial) {
    return null
  }

  const step = tutorialSteps[currentStep]
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <step.icon className="h-5 w-5 text-primary" />
              {step.title}
            </CardTitle>
            <CardDescription>{step.description}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={handleSkip}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep + 1} of {tutorialSteps.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="min-h-[200px]">
            {step.content}
          </div>
        </CardContent>

        <div className="flex items-center justify-between p-6 border-t">
          <Button variant="outline" onClick={handleSkip}>
            Skip Tutorial
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button onClick={handleNext}>
              {currentStep === tutorialSteps.length - 1 ? "Get Started" : "Next"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}