import { useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

const INACTIVITY_TIMEOUT = 60 * 60 * 1000 // 60 minutes in milliseconds
const WARNING_TIME = 55 * 60 * 1000 // Show warning at 55 minutes
let warningShown = false

export function useInactivityTimeout() {
  const router = useRouter()
  const { toast } = useToast()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const resetTimeout = useCallback(() => {
    // Clear existing timeouts
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current)

    warningShown = false

    // Set warning timeout
    warningTimeoutRef.current = setTimeout(() => {
      if (!warningShown) {
        warningShown = true
        toast({
          title: "Session Expiring Soon",
          description: "Your session will expire in 5 minutes due to inactivity. Move your mouse or click to stay logged in.",
          variant: "destructive",
        })
      }
    }, WARNING_TIME)

    // Set logout timeout
    timeoutRef.current = setTimeout(() => {
      // Clear the token from storage
      localStorage.removeItem("authToken")
      localStorage.removeItem("userProfile")

      // Show logout toast
      toast({
        title: "Session Expired",
        description: "Your session has expired due to inactivity. Please log in again.",
        variant: "destructive",
      })

      // Redirect to login
      router.push("/login")
    }, INACTIVITY_TIMEOUT)
  }, [router, toast])

  useEffect(() => {
    // Only set up listeners on client side
    if (typeof window === "undefined") return

    // Check if user is logged in
    const token = localStorage.getItem("authToken")
    if (!token) return

    // Initialize timeout
    resetTimeout()

    // Activity event listeners
    const events = ["mousedown", "keydown", "scroll", "touchstart", "click"]

    const handleActivity = () => {
      resetTimeout()
    }

    events.forEach((event) => {
      document.addEventListener(event, handleActivity)
    })

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity)
      })
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current)
    }
  }, [resetTimeout])
}
