import { apiRequest } from "@/lib/api"

export interface FormData {
  [key: string]: any
}

/**
 * Save form data to the backend
 */
export async function saveFormData(
  page: string,
  formKey: string,
  formData: FormData,
  isCompleted: boolean = false
): Promise<{ success: boolean; id?: number; lastUpdated?: string }> {
  try {
    const response = await apiRequest("/api/form-data", {
      method: "POST",
      body: JSON.stringify({
        page,
        form_key: formKey,
        form_data: formData,
        is_completed: isCompleted
      })
    })

    if (!response.ok) {
      throw new Error("Failed to save form data")
    }

    const result = await response.json()
    return {
      success: result.status === 1,
      id: result.data?.id,
      lastUpdated: result.data?.last_updated
    }
  } catch (error) {
    console.error("Error saving form data:", error)
    return { success: false }
  }
}

/**
 * Load form data from the backend
 */
export async function loadFormData(
  page: string,
  formKey?: string
): Promise<FormData | null> {
  try {
    const url = formKey
      ? `/api/form-data?page=${encodeURIComponent(page)}&form_key=${encodeURIComponent(formKey)}`
      : `/api/form-data?page=${encodeURIComponent(page)}`

    const response = await apiRequest(url, {
      method: "GET"
    })

    if (!response.ok) {
      throw new Error("Failed to load form data")
    }

    const result = await response.json()
    return result.status === 1 ? result.data : null
  } catch (error) {
    console.error("Error loading form data:", error)
    return null
  }
}

/**
 * Delete form data from the backend
 */
export async function deleteFormData(
  page: string,
  formKey: string
): Promise<boolean> {
  try {
    const response = await apiRequest("/api/form-data", {
      method: "DELETE",
      body: JSON.stringify({
        page,
        form_key: formKey
      })
    })

    if (!response.ok) {
      throw new Error("Failed to delete form data")
    }

    const result = await response.json()
    return result.status === 1 && result.data?.deleted
  } catch (error) {
    console.error("Error deleting form data:", error)
    return false
  }
}

/**
 * Auto-save form data with debouncing
 */
export function useAutoSave(
  page: string,
  formKey: string,
  delay: number = 2000
) {
  let timeoutId: NodeJS.Timeout

  const autoSave = (formData: FormData, isCompleted: boolean = false) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      saveFormData(page, formKey, formData, isCompleted)
    }, delay)
  }

  const saveNow = (formData: FormData, isCompleted: boolean = false) => {
    clearTimeout(timeoutId)
    return saveFormData(page, formKey, formData, isCompleted)
  }

  const cancelAutoSave = () => {
    clearTimeout(timeoutId)
  }

  return { autoSave, saveNow, cancelAutoSave }
}