import { useCallback } from "react"
import { apiRequest } from "@/lib/api"

export interface FormSubmissionData {
  formType: string // e.g., 'login', 'register', 'event_create'
  formName: string // e.g., 'User Login', 'Create Event'
  submittedData: Record<string, any> // The actual form data
}

/**
 * Hook to log form submissions to the backend
 * Usage: const { logSubmission } = useFormLogger()
 *        logSubmission({ formType: 'login', formName: 'User Login', submittedData: { email, password } })
 */
export function useFormLogger() {
  const logSubmission = useCallback(async (data: FormSubmissionData) => {
    try {
      const token = typeof window !== "undefined" ? window.localStorage.getItem("authToken") : null
      
      // Only log if user is authenticated
      if (!token) {
        console.log("Form submission not logged (user not authenticated)")
        return
      }

      const response = await apiRequest("/api/form-submissions", {
        method: "POST",
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        console.error("Failed to log form submission:", response.statusText)
        return
      }

      const result = await response.json()
      console.log("Form submission logged:", result)
      return result
    } catch (error) {
      console.error("Error logging form submission:", error)
    }
  }, [])

  const getUserSubmissions = useCallback(async () => {
    try {
      const response = await apiRequest("/api/form-submissions")
      if (!response.ok) return null
      return await response.json()
    } catch (error) {
      console.error("Error fetching user submissions:", error)
      return null
    }
  }, [])

  const getSubmissionsByType = useCallback(async (formType: string) => {
    try {
      const response = await apiRequest(`/api/form-submissions/type/${formType}`)
      if (!response.ok) return null
      return await response.json()
    } catch (error) {
      console.error("Error fetching submissions by type:", error)
      return null
    }
  }, [])

  const getSummary = useCallback(async () => {
    try {
      const response = await apiRequest("/api/form-submissions/summary")
      if (!response.ok) return null
      return await response.json()
    } catch (error) {
      console.error("Error fetching submission summary:", error)
      return null
    }
  }, [])

  return {
    logSubmission,
    getUserSubmissions,
    getSubmissionsByType,
    getSummary,
  }
}
