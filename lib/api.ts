const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"
const AUTH_TOKEN_KEY = "authToken"
const USER_PROFILE_KEY = "userProfile"

function clearAuthData() {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(AUTH_TOKEN_KEY)
  window.localStorage.removeItem(USER_PROFILE_KEY)
}

function redirectToLogin() {
  if (typeof window === "undefined") return

  // Don't redirect if already on login or other auth pages to prevent infinite loops
  const currentPathname = window.location.pathname
  if (currentPathname === "/login" || currentPathname === "/register" || currentPathname === "/") {
    clearAuthData()
    return
  }

  const currentPath = window.location.pathname + window.location.search
  const redirect = encodeURIComponent(currentPath)
  clearAuthData()
  window.location.href = `/login?redirect=${redirect}`
}

/**
 * Makes an authenticated API request with the Bearer token automatically included
 */
export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const token =
    typeof window !== "undefined" ? window.localStorage.getItem(AUTH_TOKEN_KEY) : null

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...options.headers,
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const url = endpoint.startsWith("http") ? endpoint : `${BACKEND_URL}${endpoint}`

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (response.status === 401 || response.status === 403) {
    redirectToLogin()
  }

  return response
}
