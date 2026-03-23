"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Upload, User } from "lucide-react"
import { motion } from "framer-motion"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Sample event data
const eventData = {
  id: 1,
  name: "Tech Conference 2025",
}

export default function AddSpeakerPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    bio: "",
    email: "",
    phone: "",
    twitter: "",
    linkedin: "",
    website: "",
    speakerType: "keynote",
    presentationTitle: "",
    presentationDescription: "",
    presentationDate: "",
    presentationTime: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Speaker added",
      description: `${formData.name} has been added as a speaker.`,
    })

    setIsSubmitting(false)
    router.push(`/dashboard/events/${params.id}/speakers`)
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/dashboard/events/${params.id}/speakers`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add Speaker</h1>
          <p className="text-muted-foreground">Add a new speaker to {eventData.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Speaker Information</CardTitle>
                <CardDescription>Enter the speaker's personal and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" />
                    <AvatarFallback>
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" type="button">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photo
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter speaker's full name"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="role">Job Title</Label>
                      <Input
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="e.g. CEO, CTO, Director"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company or organization"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="bio">Biography</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Brief professional biography"
                      className="min-h-32"
                      required
                    />
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
                <CardTitle>Contact & Presentation Details</CardTitle>
                <CardDescription>Enter contact information and presentation details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="speaker@example.com"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +1 (555) 123-4567"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleChange}
                        placeholder="@username"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        placeholder="LinkedIn profile URL"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="speakerType">Speaker Type</Label>
                    <Select
                      value={formData.speakerType}
                      onValueChange={(value) => handleSelectChange("speakerType", value)}
                    >
                      <SelectTrigger id="speakerType">
                        <SelectValue placeholder="Select speaker type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="keynote">Keynote Speaker</SelectItem>
                        <SelectItem value="panelist">Panelist</SelectItem>
                        <SelectItem value="workshop">Workshop Leader</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="presentationTitle">Presentation Title</Label>
                    <Input
                      id="presentationTitle"
                      name="presentationTitle"
                      value={formData.presentationTitle}
                      onChange={handleChange}
                      placeholder="Title of the presentation or talk"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="presentationDescription">Presentation Description</Label>
                    <Textarea
                      id="presentationDescription"
                      name="presentationDescription"
                      value={formData.presentationDescription}
                      onChange={handleChange}
                      placeholder="Brief description of the presentation"
                      className="min-h-20"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" type="button" asChild>
            <Link href={`/dashboard/events/${params.id}/speakers`}>Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                Adding Speaker...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Add Speaker
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
