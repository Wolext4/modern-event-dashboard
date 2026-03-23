"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LogoutPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          // Redirect to login page after countdown
          router.push("/")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const handleStayLoggedIn = () => {
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="mx-auto max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <LogOut className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl">Logging Out</CardTitle>
          <CardDescription>You are being logged out of EventMaster</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p>You will be redirected in {countdown} seconds...</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleStayLoggedIn}>
            Stay Logged In
          </Button>
          <Button onClick={() => router.push("/")}>Logout Now</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
