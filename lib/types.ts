export interface User {
  id: string
  email: string
  name: string | null
  avatar_url: string | null
  bio: string | null
  phone: string | null
  created_at: string
  updated_at: string
}

export interface UserProfile {
  user_id: string
  full_name: string | null
  profile_picture_url: string | null
  bio: string | null
  phone_number: string | null
  location: string | null
  website: string | null
  social_links: Record<string, string> | null
  preferences: Record<string, unknown> | null
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  user_id: string
  title: string
  description: string | null
  start_date: string
  end_date: string | null
  location: string | null
  event_image_url: string | null
  status: 'draft' | 'published' | 'archived'
  created_at: string
  updated_at: string
}

export interface Attendee {
  id: string
  event_id: string
  user_id: string | null
  email: string
  name: string
  status: 'registered' | 'checked_in' | 'no_show'
  created_at: string
  updated_at: string
}

export interface Ticket {
  id: string
  event_id: string
  name: string
  description: string | null
  price: number
  quantity_total: number
  quantity_available: number
  created_at: string
  updated_at: string
}

export interface Speaker {
  id: string
  event_id: string
  name: string
  bio: string | null
  avatar_url: string | null
  title: string | null
  created_at: string
  updated_at: string
}

export interface Session {
  id: string
  event_id: string
  user_id: string
  session_token: string
  expires_at: string
  created_at: string
  updated_at: string
}
