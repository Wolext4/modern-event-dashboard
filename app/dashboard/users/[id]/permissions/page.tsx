"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save, Shield } from "lucide-react"
import { motion } from "framer-motion"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

// Sample user data
const userData = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  role: "Admin",
  avatar: "/placeholder.svg?height=96&width=96",
  permissions: {
    createEvents: true,
    manageUsers: true,
    viewReports: true,
    manageSettings: true,
    manageTickets: true,
    manageSpeakers: true,
    manageAttendees: true,
    manageTeam: true,
    viewAnalytics: true,
    manageSchedule: true,
    manageOrganization: false,
    manageBilling: false,
  },
}

export default function UserPermissionsPage({ params }: { params: { id: string } }) {
  const [permissions, setPermissions] = useState(userData.permissions)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePermissionChange = (name: string, checked: boolean) => {
    setPermissions((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSave = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Permissions updated",
      description: `Permissions for ${userData.firstName} ${userData.lastName} have been updated successfully.`,
    })

    setIsSubmitting(false)
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
          <h1 className="text-2xl font-bold tracking-tight">Manage Permissions</h1>
          <p className="text-muted-foreground">
            Set permissions for {userData.firstName} {userData.lastName}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:col-span-2"
        >
          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>User Permissions</CardTitle>
                  <CardDescription>
                    Control what {userData.firstName} {userData.lastName} can access and manage
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={userData.avatar} />
                    <AvatarFallback>
                      {userData.firstName.charAt(0)}
                      {userData.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {userData.firstName} {userData.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">{userData.role}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium">Event Management</h3>
                    <Separator className="my-2" />
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
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="manageSchedule">Manage Schedule</Label>
                          <p className="text-sm text-muted-foreground">Can edit event schedules and sessions</p>
                        </div>
                        <Switch
                          id="manageSchedule"
                          checked={permissions.manageSchedule}
                          onCheckedChange={(checked) => handlePermissionChange("manageSchedule", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="manageSpeakers">Manage Speakers</Label>
                          <p className="text-sm text-muted-foreground">Can add and edit event speakers</p>
                        </div>
                        <Switch
                          id="manageSpeakers"
                          checked={permissions.manageSpeakers}
                          onCheckedChange={(checked) => handlePermissionChange("manageSpeakers", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="manageTickets">Manage Tickets</Label>
                          <p className="text-sm text-muted-foreground">Can create and edit ticket types</p>
                        </div>
                        <Switch
                          id="manageTickets"
                          checked={permissions.manageTickets}
                          onCheckedChange={(checked) => handlePermissionChange("manageTickets", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="manageAttendees">Manage Attendees</Label>
                          <p className="text-sm text-muted-foreground">Can view and edit attendee information</p>
                        </div>
                        <Switch
                          id="manageAttendees"
                          checked={permissions.manageAttendees}
                          onCheckedChange={(checked) => handlePermissionChange("manageAttendees", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium">Analytics & Reporting</h3>
                    <Separator className="my-2" />
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="viewReports">View Reports</Label>
                          <p className="text-sm text-muted-foreground">Can access basic reports and data</p>
                        </div>
                        <Switch
                          id="viewReports"
                          checked={permissions.viewReports}
                          onCheckedChange={(checked) => handlePermissionChange("viewReports", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="viewAnalytics">View Analytics</Label>
                          <p className="text-sm text-muted-foreground">Can access detailed analytics and insights</p>
                        </div>
                        <Switch
                          id="viewAnalytics"
                          checked={permissions.viewAnalytics}
                          onCheckedChange={(checked) => handlePermissionChange("viewAnalytics", checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium">User Management</h3>
                    <Separator className="my-2" />
                    <div className="space-y-4">
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
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="manageTeam">Manage Team</Label>
                          <p className="text-sm text-muted-foreground">Can add and remove team members</p>
                        </div>
                        <Switch
                          id="manageTeam"
                          checked={permissions.manageTeam}
                          onCheckedChange={(checked) => handlePermissionChange("manageTeam", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium">System Settings</h3>
                    <Separator className="my-2" />
                    <div className="space-y-4">
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
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="manageOrganization">Manage Organization</Label>
                          <p className="text-sm text-muted-foreground">Can edit organization details</p>
                        </div>
                        <Switch
                          id="manageOrganization"
                          checked={permissions.manageOrganization}
                          onCheckedChange={(checked) => handlePermissionChange("manageOrganization", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="manageBilling">Manage Billing</Label>
                          <p className="text-sm text-muted-foreground">Can access and modify billing information</p>
                        </div>
                        <Switch
                          id="manageBilling"
                          checked={permissions.manageBilling}
                          onCheckedChange={(checked) => handlePermissionChange("manageBilling", checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between p-4">
              <Button variant="outline" asChild>
                <Link href={`/dashboard/users/${params.id}`}>Cancel</Link>
              </Button>
              <Button onClick={handleSave} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Permissions
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="md:col-span-2"
        >
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Permission Presets</CardTitle>
              <CardDescription>Apply predefined permission sets based on common roles</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-2 border-dashed">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Admin</CardTitle>
                    <CardDescription>Full access to all features</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-primary" />
                      <span>All permissions enabled</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        // Set all permissions to true
                        const allEnabled = Object.keys(permissions).reduce(
                          (acc, key) => {
                            acc[key] = true
                            return acc
                          },
                          {} as Record<string, boolean>,
                        )

                        setPermissions(allEnabled)

                        toast({
                          title: "Admin preset applied",
                          description: "All permissions have been enabled.",
                        })
                      }}
                    >
                      Apply Preset
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border-2 border-dashed">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Event Manager</CardTitle>
                    <CardDescription>Manage events and attendees</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span>Create and manage events</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span>Manage tickets and attendees</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span>View reports and analytics</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setPermissions({
                          createEvents: true,
                          manageUsers: false,
                          viewReports: true,
                          manageSettings: false,
                          manageTickets: true,
                          manageSpeakers: true,
                          manageAttendees: true,
                          manageTeam: false,
                          viewAnalytics: true,
                          manageSchedule: true,
                          manageOrganization: false,
                          manageBilling: false,
                        })

                        toast({
                          title: "Event Manager preset applied",
                          description: "Event management permissions have been enabled.",
                        })
                      }}
                    >
                      Apply Preset
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border-2 border-dashed">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Viewer</CardTitle>
                    <CardDescription>Read-only access</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span>View events and attendees</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span>View basic reports</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-destructive" />
                        <span className="text-muted-foreground">No edit permissions</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        // Set all permissions to false except viewing
                        setPermissions({
                          createEvents: false,
                          manageUsers: false,
                          viewReports: true,
                          manageSettings: false,
                          manageTickets: false,
                          manageSpeakers: false,
                          manageAttendees: false,
                          manageTeam: false,
                          viewAnalytics: false,
                          manageSchedule: false,
                          manageOrganization: false,
                          manageBilling: false,
                        })

                        toast({
                          title: "Viewer preset applied",
                          description: "Read-only permissions have been enabled.",
                        })
                      }}
                    >
                      Apply Preset
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
