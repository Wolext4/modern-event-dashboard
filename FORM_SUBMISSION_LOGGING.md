# Form Submission Logging System

This system logs all form submissions per user for easy tracking and auditing.

## Database Schema

The `form_submissions` table stores:
- `id` - Unique submission ID
- `user_id` - FK to users table
- `form_type` - Type of form (e.g., 'login', 'event_create', 'profile_update')
- `form_name` - Human-readable form name (e.g., 'Create New Event')
- `submitted_data` - JSON data with all form inputs
- `status` - Submission status (completed, error, etc.)
- `error_message` - Error details if any
- `ip_address` - User's IP address
- `user_agent` - Browser/app info
- `created_at` / `updated_at` - Timestamps

## API Endpoints

All endpoints are protected with `auth:sanctum` middleware and require authentication.

### 1. Log a Form Submission
**POST** `/api/form-submissions`

```json
{
  "form_type": "event_create",
  "form_name": "Create New Event",
  "submitted_data": {
    "name": "Tech Conference 2025",
    "description": "...",
    "location": "San Francisco",
    ...
  }
}
```

**Response:**
```json
{
  "status": 1,
  "message": "Form submission logged successfully",
  "data": {
    "id": 1,
    "user_id": 1,
    "form_type": "event_create",
    "form_name": "Create New Event",
    "submitted_data": {...},
    "status": "completed",
    "created_at": "2025-04-07T10:30:00Z"
  }
}
```

### 2. Get All User Submissions
**GET** `/api/form-submissions`

Returns paginated list (50 per page) of all submissions for the authenticated user.

**Response:**
```json
{
  "status": 1,
  "message": "User submissions retrieved successfully",
  "data": {
    "current_page": 1,
    "data": [...],
    "total": 25,
    "per_page": 50,
    ...
  }
}
```

### 3. Get Submissions by Form Type
**GET** `/api/form-submissions/type/{formType}`

Get all submissions for a specific form type (e.g., `/api/form-submissions/type/event_create`)

### 4. Get Summary
**GET** `/api/form-submissions/summary`

Get a summary grouped by form type with submission counts and last submission time.

**Response:**
```json
{
  "status": 1,
  "message": "Summary retrieved successfully",
  "data": [
    {
      "form_type": "event_create",
      "form_name": "Create New Event",
      "count": 5,
      "last_submitted": "2025-04-07T10:30:00Z"
    },
    {
      "form_type": "profile_update",
      "form_name": "Update Profile Settings",
      "count": 2,
      "last_submitted": "2025-04-06T15:20:00Z"
    },
    ...
  ]
}
```

### 5. Get Specific Submission
**GET** `/api/form-submissions/{id}`

Get details of a specific form submission.

### 6. Delete Submission
**DELETE** `/api/form-submissions/{id}`

Delete a specific form submission (user can only delete their own).

## Frontend Integration

### Using the Form Logger Hook

```typescript
import { useFormLogger } from "@/hooks/use-form-logger"

export function MyComponent() {
  const { logSubmission, getUserSubmissions, getSubmissionsByType, getSummary } = useFormLogger()

  const handleSubmit = async (formData) => {
    // ... submit form to backend or save locally ...

    // Log the form submission
    await logSubmission({
      formType: "my_form_type",
      formName: "My Form Name",
      submittedData: formData,
    })
  }

  const viewUserSubmissions = async () => {
    const result = await getUserSubmissions()
    console.log(result.data)
  }

  const viewEventSubmissions = async () => {
    const result = await getSubmissionsByType("event_create")
    console.log(result.data)
  }

  const viewSummary = async () => {
    const result = await getSummary()
    console.log(result.data)
  }

  return (
    // ...
  )
}
```

## Form Types

Standard form types used throughout the application:

- `login` - User login
- `register` - User registration
- `profile_edit` - Profile page edits
- `profile_update` - Settings page profile updates
- `event_create` - Create new event
- `event_edit` - Edit existing event
- `settings_update` - Update settings
- `password_change` - Change password

## Example Integrations

### Event Creation (Already Integrated)
File: `app/dashboard/events/create/page.tsx`

```typescript
const { logSubmission } = useFormLogger()

const handleSubmit = async (e) => {
  // ... save event ...
  
  await logSubmission({
    formType: "event_create",
    formName: "Create New Event",
    submittedData: formData,
  })
}
```

### Profile Update (Already Integrated)
File: `app/dashboard/profile/page.tsx`

```typescript
const { logSubmission } = useFormLogger()

const handleSave = async () => {
  // ... save profile ...
  
  await logSubmission({
    formType: "profile_edit",
    formName: "Edit Profile",
    submittedData: profileData,
  })
}
```

### Settings Update (Already Integrated)
File: `app/dashboard/settings/page.tsx`

```typescript
const { logSubmission } = useFormLogger()

const handleSave = async () => {
  // ... save settings ...
  
  await logSubmission({
    formType: "profile_update",
    formName: "Update Profile Settings",
    submittedData: profileData,
  })
}
```

## Setup Steps

1. **Run Migration** (if not already done):
   ```bash
   php artisan migrate
   ```

2. **Import the Hook** in any component:
   ```typescript
   import { useFormLogger } from "@/hooks/use-form-logger"
   ```

3. **Call Log Submission** after form submission:
   ```typescript
   await logSubmission({
     formType: "your_form_type",
     formName: "Your Form Name",
     submittedData: formData,
   })
   ```

## Security & Privacy

- All endpoints require authentication (`auth:sanctum`)
- Users can only view/delete their own submissions
- IP address and User Agent are logged for audit trail
- Sensitive data (passwords) should NOT be logged
- Consider implementing data retention policies

## Notes

- Form submissions are only logged for authenticated users
- If a user is not authenticated, the logging call gracefully fails without error
- All data is JSON serializable
- Timestamps are automatically recorded in UTC
