import { query } from '@/lib/db'
import { Event } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

// GET all events for user
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    const result = await query(
      'SELECT * FROM events WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    )

    return NextResponse.json(result.rows as Event[])
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

// CREATE new event
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    const {
      title,
      description,
      start_date,
      end_date,
      location,
      event_image_url,
      status = 'draft',
    } = await request.json()

    if (!title || !start_date) {
      return NextResponse.json(
        { error: 'Title and start_date are required' },
        { status: 400 }
      )
    }

    const eventId = uuidv4()
    const result = await query(
      `INSERT INTO events (
        id, user_id, title, description, start_date, end_date,
        location, event_image_url, status, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
      RETURNING *`,
      [
        eventId,
        userId,
        title,
        description || null,
        start_date,
        end_date || null,
        location || null,
        event_image_url || null,
        status,
      ]
    )

    return NextResponse.json(result.rows[0] as Event, { status: 201 })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
}
