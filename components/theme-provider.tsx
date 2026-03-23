"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"

export function ThemeProvider({
  children,
  defaultTheme = "system",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const loadThemeFromBackend = async () => {
      try {
        const token = typeof window !== "undefined" ? window.localStorage.getItem("authToken") : null
        const response = await fetch(`${BACKEND_URL}/api/user/theme`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: "include",
        })

        if (!response.ok) {
          setTheme(defaultTheme)
          return
        }

        const data = await response.json()
        if (data?.theme === "light" || data?.theme === "dark" || data?.theme === "system") {
          setTheme(data.theme)
        } else {
          setTheme(defaultTheme)
        }
      } catch (error) {
        console.warn("Unable to load theme from backend", error)
        setTheme(defaultTheme)
      }
    }

    loadThemeFromBackend()
  }, [defaultTheme])

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const setThemeAndPersist = (newTheme: Theme) => {
    setTheme(newTheme)

    const token = typeof window !== "undefined" ? window.localStorage.getItem("authToken") : null

    fetch(`${BACKEND_URL}/api/user/theme`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
      body: JSON.stringify({ theme: newTheme }),
    }).catch((error) => {
      console.warn("Unable to persist theme to backend", error)
    })
  }

  const value = {
    theme,
    setTheme: setThemeAndPersist,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
