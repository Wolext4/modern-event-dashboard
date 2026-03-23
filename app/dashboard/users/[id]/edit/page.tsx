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
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Sample user data for editing
const userData = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  role: "Admin",
  status: "Active",
  bio: "Event manager with 5+ years of experience organizing tech conferences and workshops.",
  avatar: "/placeholder.svg?height=96&width=96",
  address: "123 Main St",
  city: "San Francisco",
  state: "CA",
  zipCode: "94105",
  country: "us",
  notifications: {
    email: true,
    push: true,
    marketing: false,
  },
  permissions: {
    createEvents: true,
    manageUsers: true,
    viewReports: true,
    manageSettings: true,
  },
}

export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    role: userData.role,
    status: userData.status,
    bio: userData.bio,
    address: userData.address,
    city: userData.city,
    state: userData.state,
    zipCode: userData.zipCode,
    country: userData.country,
  })

  const [notifications, setNotifications] = useState(userData.notifications)
  const [permissions, setPermissions] = useState(userData.permissions)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (name: string, checked: boolean) => {
    setNotifications((prev) => ({ ...prev, [name]: checked }))
  }

  const handlePermissionChange = (name: string, checked: boolean) => {
    setPermissions((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "User updated",
      description: `${formData.firstName} ${formData.lastName}'s profile has been updated successfully.`,
    })

    setIsSubmitting(false)
    router.push(`/dashboard/users/${params.id}`)
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/dashboard/users/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit User</h1>
          <p className="text-muted-foreground">
            Update information for {formData.firstName} {formData.lastName}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update the user's personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                    <div className="flex flex-col items-center space-y-2">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={userData.avatar} />
                        <AvatarFallback>
                          {userData.firstName.charAt(0)}
                          {userData.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        Change Avatar
                      </Button>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          placeholder="Tell us about this user"
                          value={formData.bio}
                          onChange={handleChange}
                          className="min-h-32"
                        />
                      </div>
                    </div>
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
                  <CardTitle>Address Information</CardTitle>
                  <CardDescription>Update the user's address details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" name="address" value={formData.address} onChange={handleChange} />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" name="city" value={formData.city} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" name="state" value={formData.state} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select
                      defaultValue={formData.country}
                      onValueChange={(value) => handleSelectChange("country", value)}
                    >
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
              </Card>
            </motion.div>
          </div>

          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage user role and account status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">User Role</Label>
                    <Select defaultValue={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Event Manager">Event Manager</SelectItem>
                        <SelectItem value="Attendee">Attendee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Account Status</Label>
                    <RadioGroup
                      defaultValue={formData.status}
                      onValueChange={(value) => handleSelectChange("status", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Active" id="active" />
                        <Label htmlFor="active">Active</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Inactive" id="inactive" />
                        <Label htmlFor="inactive">Inactive</Label>
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
                  <CardTitle>Permissions</CardTitle>
                  <CardDescription>Set what this user can access and manage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="createEvents">Create Events</Label>
                        <p className="text-sm text-muted-foreground">Can create and publish new events</p>
                      </div>
                      <Switch
                        id="createEvents"
                        checked={permissions.createEvents}
                        onCheckedChange={(checked) => handlePermissionChange("createEvents", checked)}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="manageUsers">Manage Users</Label>
                        <p className="text-sm text-muted-foreground">Can view, edit, and delete users</p>
                      </div>
                      <Switch
                        id="manageUsers"
                        checked={permissions.manageUsers}
                        onCheckedChange={(checked) => handlePermissionChange("manageUsers", checked)}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="viewReports">View Reports</Label>
                        <p className="text-sm text-muted-foreground">Can access analytics and reports</p>
                      </div>
                      <Switch
                        id="viewReports"
                        checked={permissions.viewReports}
                        onCheckedChange={(checked) => handlePermissionChange("viewReports", checked)}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="manageSettings">Manage Settings</Label>
                        <p className="text-sm text-muted-foreground">Can modify system settings</p>
                      </div>
                      <Switch
                        id="manageSettings"
                        checked={permissions.manageSettings}
                        onCheckedChange={(checked) => handlePermissionChange("manageSettings", checked)}
                      />
                    </div>
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
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Set how this user receives notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={notifications.email}
                      onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="pushNotifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications</p>
                    </div>
                    <Switch
                      id="pushNotifications"
                      checked={notifications.push}
                      onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketingNotifications">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">Receive marketing and promotional emails</p>
                    </div>
                    <Switch
                      id="marketingNotifications"
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => handleNotificationChange("marketing", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" type="button" asChild>
            <Link href={`/dashboard/users/${params.id}`}>Cancel</Link>
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
