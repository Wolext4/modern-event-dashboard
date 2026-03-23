"use client"

import { Badge } from "@/components/ui/badge"
import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Bell, CreditCard, Globe, Lock, Save, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    })

    setIsSubmitting(false)
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="account" className="w-full" onValueChange={setActiveTab}>
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="md:w-1/4">
            <TabsList className="flex flex-col justify-start space-y-1 rounded-md bg-transparent p-0">
              <TabsTrigger
                value="account"
                className="justify-start rounded-md px-3 py-2 text-sm font-medium data-[state=active]:bg-muted"
              >
                <User className="mr-2 h-4 w-4" />
                Account
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="justify-start rounded-md px-3 py-2 text-sm font-medium data-[state=active]:bg-muted"
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="justify-start rounded-md px-3 py-2 text-sm font-medium data-[state=active]:bg-muted"
              >
                <Lock className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger
                value="billing"
                className="justify-start rounded-md px-3 py-2 text-sm font-medium data-[state=active]:bg-muted"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </TabsTrigger>
              <TabsTrigger
                value="organization"
                className="justify-start rounded-md px-3 py-2 text-sm font-medium data-[state=active]:bg-muted"
              >
                <Globe className="mr-2 h-4 w-4" />
                Organization
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 space-y-4">
            <TabsContent value="account" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information and profile picture</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                    <div className="flex flex-col items-center space-y-2">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/placeholder.svg?height=96&width=96" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        Change Avatar
                      </Button>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="John" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Doe" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          placeholder="Tell us about yourself"
                          defaultValue="Event manager with 5+ years of experience organizing tech conferences and workshops."
                          className="min-h-32"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSubmitting}>
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
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Update your contact details and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter your address"
                      defaultValue="123 Main St, San Francisco, CA 94105"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" defaultValue="San Francisco" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" defaultValue="CA" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input id="zipCode" defaultValue="94105" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select defaultValue="us">
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                        <SelectItem value="fr">France</SelectItem>
                        <SelectItem value="jp">Japan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSubmitting}>
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
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to be notified about events and updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Email Notifications</h3>
                    <Separator />
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-events">Event Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive updates about events you're managing or attending
                          </p>
                        </div>
                        <Switch id="email-events" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-tickets">Ticket Sales</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications when tickets are sold for your events
                          </p>
                        </div>
                        <Switch id="email-tickets" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-marketing">Marketing</Label>
                          <p className="text-sm text-muted-foreground">Receive marketing emails and special offers</p>
                        </div>
                        <Switch id="email-marketing" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Push Notifications</h3>
                    <Separator />
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-events">Event Reminders</Label>
                          <p className="text-sm text-muted-foreground">Receive reminders about upcoming events</p>
                        </div>
                        <Switch id="push-events" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-tickets">Ticket Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about ticket status changes
                          </p>
                        </div>
                        <Switch id="push-tickets" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-messages">Messages</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications for new messages</p>
                        </div>
                        <Switch id="push-messages" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Notification Frequency</h3>
                    <Separator />
                    <RadioGroup defaultValue="immediately">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="immediately" id="immediately" />
                        <Label htmlFor="immediately">Immediately</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="daily" id="daily" />
                        <Label htmlFor="daily">Daily digest</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="weekly" id="weekly" />
                        <Label htmlFor="weekly">Weekly digest</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSubmitting}>
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
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Change your password to keep your account secure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Update Password
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="2fa">Enable Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Require a verification code when logging in</p>
                    </div>
                    <Switch id="2fa" />
                  </div>
                  <div className="rounded-md bg-muted p-4">
                    <p className="text-sm text-muted-foreground">
                      Two-factor authentication adds an extra layer of security to your account by requiring more than
                      just a password to sign in.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline">Set Up 2FA</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sessions</CardTitle>
                  <CardDescription>Manage your active sessions and sign out from other devices</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between rounded-md border p-4">
                      <div className="space-y-1">
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-muted-foreground">San Francisco, CA, USA • Chrome on macOS</p>
                        <p className="text-xs text-muted-foreground">Started April 5, 2025 at 1:23 AM</p>
                      </div>
                      <Badge>Current</Badge>
                    </div>
                    <div className="flex items-start justify-between rounded-md border p-4">
                      <div className="space-y-1">
                        <p className="font-medium">Mobile Session</p>
                        <p className="text-sm text-muted-foreground">San Francisco, CA, USA • EventMaster App on iOS</p>
                        <p className="text-xs text-muted-foreground">Started April 4, 2025 at 9:45 PM</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="destructive">Sign Out of All Sessions</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Plan</CardTitle>
                  <CardDescription>Manage your subscription and billing details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">Pro Plan</h3>
                        <p className="text-sm text-muted-foreground">$49.99/month • Renews on May 5, 2025</p>
                      </div>
                      <Badge>Current Plan</Badge>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                        <p className="text-sm">Unlimited events</p>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                        <p className="text-sm">Advanced analytics</p>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                        <p className="text-sm">Custom branding</p>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                        <p className="text-sm">Priority support</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" asChild>
                      <Link href="/dashboard/billing/plans">Change Plan</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/dashboard/billing/cancel">Cancel Subscription</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Manage your payment methods and billing address</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start justify-between rounded-md border p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-md bg-muted p-2">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/2026</p>
                      </div>
                    </div>
                    <Badge>Default</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" asChild>
                      <Link href="/dashboard/billing/payment-methods">Manage Payment Methods</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>View and download your past invoices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="font-medium">Invoice #INV-001</p>
                        <p className="text-sm text-muted-foreground">April 5, 2025 • $49.99</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="font-medium">Invoice #INV-002</p>
                        <p className="text-sm text-muted-foreground">March 5, 2025 • $49.99</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="font-medium">Invoice #INV-003</p>
                        <p className="text-sm text-muted-foreground">February 5, 2025 • $49.99</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard/billing/invoices">View All Invoices</Link>
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Need help with your billing?{" "}
                    <Link href="/dashboard/billing/support" className="text-primary hover:underline">
                      Contact our support team
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="organization" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Organization Details</CardTitle>
                  <CardDescription>Manage your organization information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex h-24 w-24 items-center justify-center rounded-md border">
                        <Globe className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <Button variant="outline" size="sm">
                        Upload Logo
                      </Button>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="org-name">Organization Name</Label>
                        <Input id="org-name" defaultValue="EventMaster Inc." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="org-website">Website</Label>
                        <Input id="org-website" defaultValue="https://eventmaster.example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="org-description">Description</Label>
                        <Textarea
                          id="org-description"
                          placeholder="Describe your organization"
                          defaultValue="EventMaster is a leading event management platform for professional conferences, workshops, and corporate events."
                          className="min-h-32"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSubmitting}>
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
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Manage your team and their permissions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-md border p-4">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-sm text-muted-foreground">Admin • john.doe@example.com</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Manage
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-md border p-4">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Sarah Johnson</p>
                          <p className="text-sm text-muted-foreground">Event Manager • sarah.j@example.com</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Manage
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-md border p-4">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>MC</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Michael Chen</p>
                          <p className="text-sm text-muted-foreground">Event Manager • michael.c@example.com</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard/settings/organization/team">Manage Team</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
