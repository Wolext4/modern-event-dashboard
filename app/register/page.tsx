"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { apiRequest } from "@/lib/api"

const AUTH_TOKEN_KEY = "authToken"

export default function RegisterPage() {
  const router = useRouter()

  useEffect(() => {
    const token = typeof window !== "undefined" ? window.localStorage.getItem("authToken") : null
    if (token) {
      router.push("/dashboard")
    }
  }, [router])

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const submitRegister = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)

    if (!name || !email || !password || !confirmPassword) {
      setError("Please complete all fields.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)

    try {
      const response = await apiRequest("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password, password_confirmation: confirmPassword }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        setError(payload?.message || payload?.data?.[0] || "Registration failed")
        return
      }

      const data = await response.json()
      if (data.status !== 1 || !data.data?.token) {
        setError(data.message || "Registration succeeded but no token returned")
        return
      }

      window.localStorage.setItem(AUTH_TOKEN_KEY, data.data.token)
      router.push("/dashboard")
    } catch (err) {
      setError("Network error during registration")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>Join EventMaster to start managing your events</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={submitRegister}>
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="********" />
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Sign up"}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <a href="/login" className="text-primary hover:text-primary/80">
                Log in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
