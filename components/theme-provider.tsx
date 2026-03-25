"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { apiRequest } from "@/lib/api"

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

export function ThemeProvider({
  children,
  defaultTheme = "system",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const loadThemeFromBackend = async () => {
      try {
        const response = await apiRequest("/api/user/theme", {
          method: "GET",
        })

        if (!response.ok) {
          setTheme(defaultTheme)
          return
        }

        const data = await response.json()
        if (data.status === 1 && data.data?.theme && (data.data.theme === "light" || data.data.theme === "dark" || data.data.theme === "system")) {
          setTheme(data.data.theme)
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

    apiRequest("/api/user/theme", {
      method: "POST",
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
