"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Pencil } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "admin@eventmaster.com",
    phone: "+1 (555) 123-4567",
    bio: "Event management professional with over 5 years of experience.",
    jobTitle: "Event Manager",
    company: "EventMaster Inc.",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = () => {
    setIsEditing(false)
    // Save logic would go here
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">My Profile</h1>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <Button onClick={handleSave}>
            <Check className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>

              <div className="space-y-2 flex-1">
                <div className="space-y-1">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                name="jobTitle"
                value={profileData.jobTitle}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={profileData.company}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <h3 className="font-medium">Account Options</h3>
              <div className="flex flex-col gap-2">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/billing/plans">Subscription Plans</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/dashboard/billing/payment-methods">Payment Methods</Link>
                </Button>
                <Button variant="outline">Change Password</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
