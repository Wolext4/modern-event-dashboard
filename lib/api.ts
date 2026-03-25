const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"
const AUTH_TOKEN_KEY = "authToken"

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

  return fetch(url, {
    ...options,
    headers,
  })
}
