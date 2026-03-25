# Quick Start Guide - Event Dashboard

Get up and running with the database-backed event dashboard in minutes.

## Prerequisites

✅ Node.js 18+ installed
✅ AWS Aurora PostgreSQL integration connected in v0
✅ Environment variables configured (PGHOST, PGDATABASE, etc.)

## Initial Setup

### 1. Database Migration (Already Done!)
The database schema has been created with:
- User management tables
- Event management tables
- Attendee tracking
- Ticket management
- Speaker profiles
- Session management

The migration file is located at: `scripts/001-setup-users-schema.sql`

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

Make sure these packages are installed:
- `pg` - PostgreSQL driver
- `@aws-sdk/rds-signer` - AWS RDS authentication
- `@vercel/functions` - Vercel utilities

### 3. Start Development Server
```bash
npm run dev
# Server runs on http://localhost:3000
```

## Testing the System

### Test 1: Create a User Profile (Empty State)
1. Open browser to `http://localhost:3000/dashboard/profile`
2. You should see an empty state:
   - "No profile information yet" message
   - "Create Your Profile" button
3. Click the button to enter edit mode
4. Fill in your profile:
   - Full Name: "John Doe"
   - Phone: "+1 (555) 123-4567"
   - Location: "San Francisco, CA"
   - Bio: "Event organizer"
5. Click "Save Changes"
6. **Refresh the page** - Your data persists! ✅

### Test 2: Create Events (Empty State)
1. Navigate to `http://localhost:3000/dashboard/events`
2. You should see an empty state:
   - "No events yet" message
   - "Create Your First Event" button
3. Click the button to create an event
4. Enter event details and save
5. **Refresh the page** - Your event persists! ✅

### Test 3: Verify Database Storage
Check your AWS Aurora PostgreSQL:
1. Go to AWS RDS Console
2. Find your database instance
3. Connect with a SQL client (DBeaver, pgAdmin, etc.)
4. Query the tables:

```sql
-- See all users
SELECT * FROM users;

-- See user profiles
SELECT * FROM user_profiles;

-- See events
SELECT * FROM events;
```

## API Examples

### Get User Profile
```bash
curl -X GET http://localhost:3000/api/users/profile \
  -H "x-user-id: demo-user"
```

### Create/Update Profile
```bash
curl -X PATCH http://localhost:3000/api/users/profile \
  -H "x-user-id: demo-user" \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "John Doe",
    "bio": "Event organizer",
    "location": "San Francisco, CA"
  }'
```

### Get All Events
```bash
curl -X GET http://localhost:3000/api/events \
  -H "x-user-id: demo-user"
```

### Create Event
```bash
curl -X POST http://localhost:3000/api/events \
  -H "x-user-id: demo-user" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tech Conference 2025",
    "start_date": "2025-05-15T09:00:00Z",
    "description": "A tech conference",
    "location": "San Francisco, CA"
  }'
```

## Project Structure

```
app/
├── api/                    # API Routes
│   ├── users/
│   │   ├── route.ts       # User CRUD
│   │   └── profile/
│   │       └── route.ts   # Profile CRUD
│   └── events/
│       ├── route.ts       # Events list & create
│       └── [id]/
│           └── route.ts   # Event detail CRUD
├── dashboard/
│   ├── profile/
│   │   └── page.tsx       # Profile page (empty state)
│   └── events/
│       └── page.tsx       # Events page (empty state)

lib/
├── db.ts                  # Database connection
└── types.ts               # TypeScript interfaces

scripts/
└── 001-setup-users-schema.sql  # Database schema

DATABASE.md               # Full API documentation
SETUP_SUMMARY.md         # Detailed setup guide
QUICK_START.md          # This file
```

## Key Files to Know

### `lib/db.ts`
Database connection pool with RDS Signer authentication:
```typescript
import { query } from '@/lib/db'

// Single query
const result = await query('SELECT * FROM users WHERE id = $1', [userId])

// Transaction
const result = await withConnection(async (client) => {
  await client.query('BEGIN')
  // ... multiple queries
  await client.query('COMMIT')
})
```

### `lib/types.ts`
TypeScript interfaces for all data models:
```typescript
import { User, UserProfile, Event } from '@/lib/types'
```

### `app/api/users/profile/route.ts`
Profile API implementation:
- `GET` - Fetch profile (returns empty object for new users)
- `PATCH` - Create or update profile

### `app/dashboard/profile/page.tsx`
Profile page with empty state:
- Shows "No profile information yet" for new users
- Fetches data from `/api/users/profile`
- Allows editing and saving to database

### `app/dashboard/events/page.tsx`
Events page with empty state:
- Shows "No events yet" for new users
- Fetches events from `/api/events`
- Full CRUD functionality

## Common Tasks

### Add a New Database Table
1. Create migration in `scripts/002-add-new-table.sql`
2. Run: `npm run migrate:002`
3. Add TypeScript interface to `lib/types.ts`
4. Create API routes in `app/api/new-resource/route.ts`

### Add a New API Endpoint
1. Create file: `app/api/resource/route.ts`
2. Implement handlers: `GET`, `POST`, `PATCH`, `DELETE`
3. Use parameterized queries to prevent SQL injection
4. Import types from `lib/types.ts`
5. Test with curl or Postman

### Modify a Page's Empty State
Edit the component:
1. Open page file: `app/dashboard/*/page.tsx`
2. Find empty state check (usually early in render)
3. Modify the empty state Card/message
4. Keep the data-fetching logic intact

### Debug Database Issues
Enable logging:
```typescript
// In lib/db.ts, add:
console.log('[v0] Query:', text, 'Params:', params)
```

Or check AWS RDS console for:
- Active connections
- Query logs
- Performance insights
- Slow query logs

## Environment Variables Checklist

Make sure these are set in Vercel:

```
✅ AWS_REGION=us-east-1
✅ AWS_ROLE_ARN=arn:aws:iam::...
✅ PGHOST=your-db-cluster.rds.amazonaws.com
✅ PGDATABASE=eventdashboard
✅ PGUSER=postgres
```

Check in v0 Settings → Vars section.

## Troubleshooting

### "Connection timeout" errors
**Solution**: 
- Check VPC security groups allow your IP
- Verify database is running
- Test connectivity: `telnet PGHOST 5432`

### "User ID required" error
**Solution**:
- Frontend must send `x-user-id` header
- Check browser DevTools Network tab
- For testing, use fixed user ID in localStorage

### Empty state showing but data exists
**Solution**:
- Check browser DevTools → Network → API calls
- Verify response status is 200
- Check database directly: `SELECT * FROM user_profiles`
- Try hard refresh (Ctrl+Shift+R)

### Data not saving
**Solution**:
- Check API response for errors
- Verify `x-user-id` header is sent
- Check database write permissions
- Look at server logs for SQL errors

## Next Steps

1. ✅ Test the empty states (you're here!)
2. Implement authentication login/logout
3. Add image upload for profiles
4. Create event editing interface
5. Build attendee management dashboard
6. Add email notifications
7. Implement ticket sales

## Resources

- **API Docs**: See `DATABASE.md`
- **Schema**: See `scripts/001-setup-users-schema.sql`
- **Types**: See `lib/types.ts`
- **Database Connection**: See `lib/db.ts`

## Support

For issues:
1. Check `DATABASE.md` for API details
2. Check `SETUP_SUMMARY.md` for architecture
3. Review the relevant API route file
4. Check AWS RDS console logs
5. Verify environment variables in Vercel settings

Happy building! 🚀
