import { query } from '@/lib/db'
import { UserProfile } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'

// GET user profile
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
      'SELECT * FROM user_profiles WHERE user_id = $1',
      [userId]
    )

    if (result.rows.length === 0) {
      // Return empty profile for new users
      return NextResponse.json({
        user_id: userId,
        full_name: null,
        profile_picture_url: null,
        bio: null,
        phone_number: null,
        location: null,
        website: null,
        social_links: null,
        preferences: null,
        created_at: null,
        updated_at: null,
      })
    }

    return NextResponse.json(result.rows[0] as UserProfile)
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}

// UPDATE user profile
export async function PATCH(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    const data = await request.json()
    const {
      full_name,
      profile_picture_url,
      bio,
      phone_number,
      location,
      website,
      social_links,
      preferences,
    } = data

    // Check if profile exists
    const existingProfile = await query(
      'SELECT * FROM user_profiles WHERE user_id = $1',
      [userId]
    )

    let result
    if (existingProfile.rows.length === 0) {
      // Create new profile
      result = await query(
        `INSERT INTO user_profiles (
          user_id, full_name, profile_picture_url, bio, phone_number,
          location, website, social_links, preferences, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
        RETURNING *`,
        [
          userId,
          full_name,
          profile_picture_url,
          bio,
          phone_number,
          location,
          website,
          social_links ? JSON.stringify(social_links) : null,
          preferences ? JSON.stringify(preferences) : null,
        ]
      )
    } else {
      // Update existing profile
      result = await query(
        `UPDATE user_profiles SET
          full_name = $1,
          profile_picture_url = $2,
          bio = $3,
          phone_number = $4,
          location = $5,
          website = $6,
          social_links = $7,
          preferences = $8,
          updated_at = NOW()
        WHERE user_id = $9
        RETURNING *`,
        [
          full_name,
          profile_picture_url,
          bio,
          phone_number,
          location,
          website,
          social_links ? JSON.stringify(social_links) : null,
          preferences ? JSON.stringify(preferences) : null,
          userId,
        ]
      )
    }

    return NextResponse.json(result.rows[0] as UserProfile)
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}
