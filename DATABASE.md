# Database Setup & Architecture

This document explains the database structure, API routes, and how user data is stored and managed in the Event Dashboard application.

## Database Schema

The application uses AWS Aurora PostgreSQL with the following tables:

### 1. **users** Table
Stores basic user account information.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  avatar_url TEXT,
  bio TEXT,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

**Fields:**
- `id`: Unique user identifier (UUID)
- `email`: User's email address (unique)
- `name`: User's full name
- `avatar_url`: URL to user's avatar image
- `bio`: Short biography
- `phone`: Phone number
- `created_at`: Timestamp when user was created
- `updated_at`: Timestamp of last update

---

### 2. **user_profiles** Table
Stores detailed profile information for users. New users start with an empty profile.

```sql
CREATE TABLE user_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  full_name VARCHAR(255),
  profile_picture_url TEXT,
  bio TEXT,
  phone_number VARCHAR(20),
  location VARCHAR(255),
  website VARCHAR(255),
  social_links JSONB,
  preferences JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

**Fields:**
- `user_id`: Reference to users table
- `full_name`: User's full name
- `profile_picture_url`: URL to profile picture
- `bio`: User biography
- `phone_number`: Contact phone number
- `location`: User's location
- `website`: User's website URL
- `social_links`: JSON object for social media links
- `preferences`: JSON object for user preferences
- `created_at` / `updated_at`: Timestamps

---

### 3. **events** Table
Stores event information created by users.

```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP,
  location VARCHAR(255),
  event_image_url TEXT,
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_events (user_id),
  INDEX idx_start_date (start_date)
)
```

**Fields:**
- `id`: Unique event identifier
- `user_id`: Creator of the event
- `title`: Event title
- `description`: Detailed event description
- `start_date`: When the event starts
- `end_date`: When the event ends
- `location`: Event location
- `event_image_url`: URL to event image
- `status`: Event status (draft, published, archived)

---

### 4. **attendees** Table
Tracks event attendees and their check-in status.

```sql
CREATE TABLE attendees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'registered',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_event_attendees (event_id)
)
```

**Fields:**
- `id`: Unique attendee record identifier
- `event_id`: Associated event
- `user_id`: Reference to user account (optional)
- `email`: Attendee email
- `name`: Attendee name
- `status`: Attendance status (registered, checked_in, no_show)

---

### 5. **tickets** Table
Manages ticket types and availability for events.

```sql
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  quantity_total INTEGER,
  quantity_available INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_event_tickets (event_id)
)
```

**Fields:**
- `id`: Unique ticket type identifier
- `event_id`: Associated event
- `name`: Ticket type name (e.g., "General Admission")
- `description`: Ticket details
- `price`: Ticket price
- `quantity_total`: Total tickets available
- `quantity_available`: Currently available tickets

---

### 6. **speakers** Table
Stores speaker information for events.

```sql
CREATE TABLE speakers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  title VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_event_speakers (event_id)
)
```

**Fields:**
- `id`: Unique speaker identifier
- `event_id`: Associated event
- `name`: Speaker name
- `bio`: Speaker biography
- `avatar_url`: Speaker profile image
- `title`: Speaker title/expertise

---

### 7. **sessions** Table
Manages user sessions for authentication.

```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_sessions (user_id),
  INDEX idx_token (session_token)
)
```

**Fields:**
- `id`: Session identifier
- `event_id`: Associated event (optional)
- `user_id`: User who owns the session
- `session_token`: Unique session token
- `expires_at`: When the session expires

---

## API Routes

### User Management

#### GET `/api/users`
Fetch current user information.

**Headers:**
- `x-user-id`: User ID (required)

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "avatar_url": "https://...",
  "bio": "...",
  "phone": "+1234567890",
  "created_at": "2025-03-25T00:00:00Z",
  "updated_at": "2025-03-25T00:00:00Z"
}
```

#### POST `/api/users`
Create a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe"
}
```

---

### Profile Management

#### GET `/api/users/profile`
Fetch user profile. Returns empty profile for new users.

**Headers:**
- `x-user-id`: User ID (required)

**Response:**
```json
{
  "user_id": "uuid",
  "full_name": null,
  "profile_picture_url": null,
  "bio": null,
  "phone_number": null,
  "location": null,
  "website": null,
  "social_links": null,
  "preferences": null,
  "created_at": null,
  "updated_at": null
}
```

#### PATCH `/api/users/profile`
Create or update user profile.

**Headers:**
- `x-user-id`: User ID (required)
- `Content-Type`: application/json

**Request Body:**
```json
{
  "full_name": "John Doe",
  "profile_picture_url": "https://...",
  "bio": "Event organizer",
  "phone_number": "+1234567890",
  "location": "San Francisco, CA",
  "website": "https://example.com",
  "social_links": {
    "twitter": "https://twitter.com/...",
    "linkedin": "https://linkedin.com/..."
  },
  "preferences": {
    "theme": "dark",
    "notifications": true
  }
}
```

---

### Event Management

#### GET `/api/events`
Fetch all events for the current user.

**Headers:**
- `x-user-id`: User ID (required)

**Response:**
```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "title": "Tech Conference 2025",
    "description": "...",
    "start_date": "2025-05-15T09:00:00Z",
    "end_date": "2025-05-17T18:00:00Z",
    "location": "San Francisco, CA",
    "event_image_url": "https://...",
    "status": "published",
    "created_at": "2025-03-25T00:00:00Z",
    "updated_at": "2025-03-25T00:00:00Z"
  }
]
```

#### POST `/api/events`
Create a new event.

**Headers:**
- `x-user-id`: User ID (required)
- `Content-Type`: application/json

**Request Body:**
```json
{
  "title": "Tech Conference 2025",
  "description": "A conference about technology",
  "start_date": "2025-05-15T09:00:00Z",
  "end_date": "2025-05-17T18:00:00Z",
  "location": "San Francisco, CA",
  "event_image_url": "https://...",
  "status": "draft"
}
```

#### GET `/api/events/[id]`
Fetch a specific event.

**Headers:**
- `x-user-id`: User ID (required)

#### PATCH `/api/events/[id]`
Update an event.

**Headers:**
- `x-user-id`: User ID (required)

#### DELETE `/api/events/[id]`
Delete an event.

**Headers:**
- `x-user-id`: User ID (required)

---

## Empty State Behavior

### New User Profile Page
When a user visits `/dashboard/profile` without any profile data:
1. The page shows an empty state message
2. A "Create Profile" button appears
3. Clicking it enables edit mode
4. User can fill in profile information and save it
5. Data is persisted to the database

### Events Page
When a user has no events:
1. The page shows an empty state with "No events yet"
2. A "Create Your First Event" button is provided
3. Users can start creating events
4. Events are stored in the database with `status: 'draft'` by default

---

## Environment Variables

The application requires these AWS Aurora PostgreSQL environment variables:

```env
AWS_REGION=us-east-1
AWS_ROLE_ARN=arn:aws:iam::ACCOUNT_ID:role/ROLE_NAME
PGHOST=your-db-cluster.rds.amazonaws.com
PGDATABASE=eventdashboard
PGUSER=postgres
```

These are automatically configured when you connect AWS Aurora PostgreSQL integration in v0.

---

## How to Use the API

All API calls require the `x-user-id` header for authentication. In the frontend, this is retrieved from localStorage:

```typescript
const userId = localStorage.getItem('userId') || 'demo-user'
const response = await fetch('/api/users/profile', {
  headers: {
    'x-user-id': userId,
  },
})
```

---

## Data Flow

1. **User Creation**: User account is created in the `users` table
2. **Profile Creation**: User visits profile page → empty state shown → User fills in profile → Data saved to `user_profiles` table
3. **Event Creation**: User clicks "Create Event" → Form is submitted → Event saved to `events` table with `status: 'draft'`
4. **Event Publishing**: User can edit event and change status to `'published'`
5. **Attendee Management**: Attendees are added to `attendees` table
6. **Ticket Management**: Ticket types are configured in `tickets` table
7. **Speaker Management**: Speakers are added to `speakers` table

---

## Notes

- All new user profiles start **empty** - no pre-filled data
- All new events start in **draft status** - not visible to public
- User data is **isolated** - users can only see their own data
- Cascading deletes are configured - deleting a user deletes all associated data
- Database uses **timestamps** for all records - automatic audit trail
