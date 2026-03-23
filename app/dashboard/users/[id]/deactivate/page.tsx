"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertTriangle, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Sample user data
const userData = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  role: "Admin",
  avatar: "/placeholder.svg?height=96&width=96",
}

export default function DeactivateUserPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [reason, setReason] = useState("")
  const [confirmed, setConfirmed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleDeactivate = async () => {
    if (!confirmed) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "User deactivated",
      description: `${userData.firstName} ${userData.lastName}'s account has been deactivated.`,
    })

    setIsSubmitting(false)
    router.push("/dashboard/users")
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
          <h1 className="text-2xl font-bold tracking-tight">Deactivate User</h1>
          <p className="text-muted-foreground">
            Deactivate {userData.firstName} {userData.lastName}'s account
          </p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card>
          <CardHeader className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Deactivate User Account</CardTitle>
                <CardDescription>This will temporarily disable the user's access to the platform</CardDescription>
              </div>
              <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
              <Avatar className="h-16 w-16">
                <AvatarImage src={userData.avatar} />
                <AvatarFallback>
                  {userData.firstName.charAt(0)}
                  {userData.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1 text-center sm:text-left">
                <h3 className="font-medium">
                  {userData.firstName} {userData.lastName}
                </h3>
                <p className="text-sm text-muted-foreground">{userData.email}</p>
                <p className="text-sm text-muted-foreground">{userData.role}</p>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for deactivation</Label>
                <Textarea
                  id="reason"
                  placeholder="Please provide a reason for deactivating this user"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>

              <div className="rounded-md bg-amber-50 p-4 dark:bg-amber-950">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200">
                      Important information about deactivation
                    </h3>
                    <div className="mt-2 text-sm text-amber-700 dark:text-amber-300">
                      <ul className="list-disc space-y-1 pl-5">
                        <li>The user will no longer be able to log in to the platform</li>
                        <li>All scheduled events and activities will remain in the system</li>
                        <li>You can reactivate this account at any time</li>
                        <li>This action will be logged in the system audit trail</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="confirm"
                  checked={confirmed}
                  onCheckedChange={(checked) => setConfirmed(checked === true)}
                />
                <Label htmlFor="confirm" className="text-sm">
                  I understand that this will deactivate {userData.firstName} {userData.lastName}'s account
                </Label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between p-4">
            <Button variant="outline" asChild>
              <Link href={`/dashboard/users/${params.id}`}>Cancel</Link>
            </Button>
            <Button variant="destructive" onClick={handleDeactivate} disabled={!confirmed || isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Deactivating...
                </>
              ) : (
                "Deactivate User"
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
