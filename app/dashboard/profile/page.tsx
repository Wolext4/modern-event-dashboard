"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Pencil } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { UserProfile } from "@/lib/types"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [profileData, setProfileData] = useState<Partial<UserProfile>>({
    full_name: null,
    profile_picture_url: null,
    bio: null,
    phone_number: null,
    location: null,
    website: null,
  })

  useEffect(() => {
    // Load profile from database
    const loadProfile = async () => {
      try {
        // In a real app, get the user ID from auth context/session
        const userId = localStorage.getItem('userId') || 'demo-user'
        const response = await fetch('/api/users/profile', {
          headers: {
            'x-user-id': userId,
          },
        })
        if (response.ok) {
          const profile = await response.json()
          setProfileData(profile)
        }
      } catch (error) {
        console.error('Failed to load profile:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadProfile()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value || null,
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const userId = localStorage.getItem('userId') || 'demo-user'
      const response = await fetch('/api/users/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify(profileData),
      })
      if (response.ok) {
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Failed to save profile:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  const isProfileEmpty = !profileData.full_name && !profileData.bio && !profileData.phone_number

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
            {isProfileEmpty ? 'Create Profile' : 'Edit Profile'}
          </Button>
        ) : (
          <Button onClick={handleSave} disabled={isSaving}>
            <Check className="mr-2 h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        )}
      </div>

      {isProfileEmpty && !isEditing ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="rounded-full bg-muted p-3">
              <Pencil className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">No profile information yet</h3>
              <p className="text-sm text-muted-foreground">
                Create your profile to get started. Share your information with attendees and event organizers.
              </p>
            </div>
            <Button onClick={() => setIsEditing(true)}>Create Your Profile</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profileData.profile_picture_url || undefined} alt="Profile" />
                  <AvatarFallback>{profileData.full_name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>

                <div className="space-y-2 flex-1 w-full sm:w-auto">
                  <div className="space-y-1">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      name="full_name"
                      placeholder="Enter your full name"
                      value={profileData.full_name || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="phone_number">Phone</Label>
                <Input
                  id="phone_number"
                  name="phone_number"
                  placeholder="Enter your phone number"
                  value={profileData.phone_number || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Enter your location"
                  value={profileData.location || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell us about yourself"
                  value={profileData.bio || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  placeholder="https://example.com"
                  value={profileData.website || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="profile_picture_url">Profile Picture URL</Label>
                <Input
                  id="profile_picture_url"
                  name="profile_picture_url"
                  placeholder="https://example.com/image.jpg"
                  value={profileData.profile_picture_url || ''}
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
      )}
    </div>
  )
}
