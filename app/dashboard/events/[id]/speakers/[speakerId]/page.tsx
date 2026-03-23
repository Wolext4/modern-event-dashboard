"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Edit, Globe, Mail, MapPin, Phone, Twitter } from "lucide-react"
import { motion } from "framer-motion"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Sample speaker data
const speakerData = {
  id: 1,
  name: "Jane Smith",
  role: "CEO",
  company: "TechGiant",
  bio: "Jane Smith is the CEO of TechGiant, a leading technology company specializing in AI and machine learning solutions. With over 15 years of experience in the tech industry, Jane has led numerous successful product launches and company initiatives. Prior to TechGiant, she was the CTO at InnovateCorp and held senior positions at several Fortune 500 companies. Jane holds an MBA from Harvard Business School and a BS in Computer Science from MIT.",
  email: "jane.smith@techgiant.com",
  phone: "+1 (555) 123-4567",
  twitter: "@janesmith",
  linkedin: "linkedin.com/in/janesmith",
  website: "janesmith.com",
  avatar: "/placeholder.svg?height=200&width=200",
  speakerType: "keynote",
  presentation: {
    title: "The Future of Tech: AI and Beyond",
    description:
      "An exploration of how artificial intelligence is reshaping industries and what the future holds for technology innovation.",
    date: "2025-05-15",
    time: "10:00 AM - 11:30 AM",
    location: "Main Stage",
  },
}

// Sample event data
const eventData = {
  id: 1,
  name: "Tech Conference 2025",
}

export default function SpeakerProfilePage({ params }: { params: { id: string; speakerId: string } }) {
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
          <h1 className="text-2xl font-bold tracking-tight">Speaker Profile</h1>
          <p className="text-muted-foreground">View information for {speakerData.name}</p>
        </div>
        <div className="ml-auto">
          <Button asChild>
            <Link href={`/dashboard/events/${params.id}/speakers/${params.speakerId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Speaker
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:col-span-1"
        >
          <Card>
            <CardHeader className="text-center">
              <Avatar className="mx-auto h-32 w-32">
                <AvatarImage src={speakerData.avatar} />
                <AvatarFallback>{speakerData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">{speakerData.name}</CardTitle>
              <CardDescription>
                {speakerData.role} at {speakerData.company}
              </CardDescription>
              <Badge className="mx-auto mt-2">
                {speakerData.speakerType === "keynote" ? "Keynote Speaker" : speakerData.speakerType}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{speakerData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{speakerData.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Twitter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{speakerData.twitter}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{speakerData.website}</span>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-2 font-medium">Speaking At</h3>
                <div className="rounded-md border p-3">
                  <div className="font-medium">{eventData.name}</div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(speakerData.presentation.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/dashboard/events/${params.id}/schedule`}>View Event Schedule</Link>
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
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Biography</CardTitle>
                <CardDescription>Professional background and experience</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{speakerData.bio}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Presentation Details</CardTitle>
                <CardDescription>Information about the speaker's session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">{speakerData.presentation.title}</h3>
                  <p className="mt-2 text-muted-foreground">{speakerData.presentation.description}</p>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <h4 className="font-medium">Date</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(speakerData.presentation.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <h4 className="font-medium">Time</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{speakerData.presentation.time}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <h4 className="font-medium">Location</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{speakerData.presentation.location}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/dashboard/events/${params.id}/schedule/edit`}>Edit Schedule</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Previous Presentations</CardTitle>
                <CardDescription>Past speaking engagements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">AI in Business: Practical Applications</h3>
                      <Badge variant="outline">2024</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">Business Tech Summit 2024</p>
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">The Evolution of Machine Learning</h3>
                      <Badge variant="outline">2023</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">Global AI Conference</p>
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Technology Leadership in the Digital Age</h3>
                      <Badge variant="outline">2022</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">Leadership Summit</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
