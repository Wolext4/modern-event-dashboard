"use client"

import React, { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { apiRequest } from "@/lib/api"

const AUTH_TOKEN_KEY = "authToken"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/dashboard"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const submitLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)

    if (!email || !password) {
      setError("Please complete all fields.")
      return
    }

    setLoading(true)

    try {
      const response = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        setError(payload?.message || payload?.data?.[0] || "Login failed")
        return
      }

      const data = await response.json()
      if (data.status !== 1 || !data.data?.token) {
        setError(data.message || "Login succeeded but no token returned")
        return
      }

      window.localStorage.setItem(AUTH_TOKEN_KEY, data.data.token)
      router.push(redirect)
    } catch (err) {
      setError("Network error during login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Sign in to your EventMaster account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={submitLogin}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
              />
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a href="/register" className="text-primary hover:text-primary/80">
                Create one
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
