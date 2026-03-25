import { query } from '@/lib/db'
import { Event } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'

// GET event by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('x-user-id')
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    const result = await query(
      'SELECT * FROM events WHERE id = $1 AND user_id = $2',
      [params.id, userId]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(result.rows[0] as Event)
  } catch (error) {
    console.error('Error fetching event:', error)
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    )
  }
}

// UPDATE event
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      status,
    } = await request.json()

    const result = await query(
      `UPDATE events SET
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        start_date = COALESCE($3, start_date),
        end_date = COALESCE($4, end_date),
        location = COALESCE($5, location),
        event_image_url = COALESCE($6, event_image_url),
        status = COALESCE($7, status),
        updated_at = NOW()
      WHERE id = $8 AND user_id = $9
      RETURNING *`,
      [
        title,
        description,
        start_date,
        end_date,
        location,
        event_image_url,
        status,
        params.id,
        userId,
      ]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(result.rows[0] as Event)
  } catch (error) {
    console.error('Error updating event:', error)
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    )
  }
}

// DELETE event
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('x-user-id')
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    const result = await query(
      'DELETE FROM events WHERE id = $1 AND user_id = $2 RETURNING *',
      [params.id, userId]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Event deleted successfully' })
  } catch (error) {
    console.error('Error deleting event:', error)
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    )
  }
}
