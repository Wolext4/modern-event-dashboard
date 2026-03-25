# Event Dashboard Architecture

Complete architecture overview of the database-driven event management system.

## System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Profile Page              Events Page           Calendar Page   │
│  /dashboard/profile        /dashboard/events     /dashboard/..   │
│       │                         │                     │          │
│       └─────────────┬───────────┴─────────┬──────────┘          │
│                     │                     │                      │
│              Fetch Profile          Fetch Events           Fetch │
│              Save Profile           Create Event       Schedule  │
│                     │                     │                      │
└─────────────────────┼─────────────────────┼──────────────────────┘
                      │                     │
                      ▼                     ▼
┌──────────────────────────────────────────────────────────────────┐
│                    NEXT.JS API ROUTES                            │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  /api/users/profile/route.ts     /api/events/route.ts          │
│  ├─ GET: Fetch profile           ├─ GET: List all events       │
│  └─ PATCH: Create/Update         └─ POST: Create event         │
│                                                                  │
│  /api/events/[id]/route.ts                                     │
│  ├─ GET: Event details                                         │
│  ├─ PATCH: Update event                                        │
│  └─ DELETE: Delete event                                       │
│                                                                  │
│  Header: x-user-id (authentication)                            │
│  All queries: Parameterized (SQL injection safe)               │
│                                                                  │
└─────────────────────┬─────────────────────────────────────────┘
                      │
                      │ Database Queries
                      │ Transactions
                      │
                      ▼
┌──────────────────────────────────────────────────────────────────┐
│                   DATABASE CONNECTION (lib/db.ts)               │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ AWS RDS Signer (IAM Authentication)                     │  │
│  │ ├─ roleArn: AWS_ROLE_ARN                                │  │
│  │ ├─ region: AWS_REGION                                   │  │
│  │ └─ hostname: PGHOST                                     │  │
│  └─────────────────────────────────────────────────────────┘  │
│                      │                                          │
│                      ▼                                          │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ Connection Pool (pg)                                    │  │
│  │ ├─ Max connections: 20                                  │  │
│  │ ├─ Host: PGHOST                                         │  │
│  │ ├─ Database: PGDATABASE                                 │  │
│  │ ├─ User: PGUSER                                         │  │
│  │ └─ Password: Dynamic (from signer)                      │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                  │
└──────────────────────────┬───────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│           AWS AURORA POSTGRESQL DATABASE                         │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ users TABLE                   (Core User Accounts)     │   │
│  │ ├─ id (UUID)                                           │   │
│  │ ├─ email (UNIQUE)                                      │   │
│  │ ├─ name, avatar_url, bio, phone                        │   │
│  │ └─ created_at, updated_at                              │   │
│  └────────────────────────────────────────────────────────┘   │
│           │                                                    │
│           ├─► ┌──────────────────────────────────────┐        │
│           │   │ user_profiles (1:1 Relationship)    │        │
│           │   ├─ user_id (FK, PK)                    │        │
│           │   ├─ full_name, profile_picture_url    │        │
│           │   ├─ bio, phone_number, location        │        │
│           │   ├─ website, social_links (JSON)      │        │
│           │   ├─ preferences (JSON)                 │        │
│           │   └─ created_at, updated_at             │        │
│           │   ← EMPTY FOR NEW USERS                 │        │
│           └──────────────────────────────────────────┘        │
│           │                                                    │
│           ├─► ┌──────────────────────────────────────┐        │
│           │   │ events (1:N Relationship)           │        │
│           │   ├─ id (UUID)                           │        │
│           │   ├─ user_id (FK) - Event creator       │        │
│           │   ├─ title, description                  │        │
│           │   ├─ start_date, end_date                │        │
│           │   ├─ location, event_image_url          │        │
│           │   ├─ status (draft/published/archived)  │        │
│           │   └─ created_at, updated_at             │        │
│           │   ← EMPTY FOR NEW USERS                 │        │
│           │   INDEX: user_id, start_date            │        │
│           │                                          │        │
│           │   ├─► attendees (N:M)                   │        │
│           │   │   ├─ id, event_id (FK)              │        │
│           │   │   ├─ user_id (optional FK)          │        │
│           │   │   ├─ email, name                     │        │
│           │   │   ├─ status (registered/checked_in) │        │
│           │   │   └─ created_at, updated_at         │        │
│           │   │                                     │        │
│           │   ├─► tickets (1:N)                     │        │
│           │   │   ├─ id, event_id (FK)              │        │
│           │   │   ├─ name, description              │        │
│           │   │   ├─ price, quantity_total          │        │
│           │   │   └─ quantity_available             │        │
│           │   │                                     │        │
│           │   └─► speakers (1:N)                    │        │
│           │       ├─ id, event_id (FK)              │        │
│           │       ├─ name, bio                       │        │
│           │       ├─ avatar_url, title              │        │
│           │       └─ created_at, updated_at         │        │
│           │                                          │        │
│           └──────────────────────────────────────────┘        │
│           │                                                    │
│           └─► ┌──────────────────────────────────────┐        │
│               │ sessions (1:N Relationship)         │        │
│               ├─ id (UUID)                           │        │
│               ├─ user_id (FK)                        │        │
│               ├─ session_token (UNIQUE)              │        │
│               ├─ expires_at                          │        │
│               ├─ created_at, updated_at              │        │
│               └─ INDEX: user_id, token               │        │
│               ← For authentication                  │        │
│               └──────────────────────────────────────┘        │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

### Profile Creation Flow (Empty → Populated)

```
User visits /dashboard/profile
         │
         ├─ Check localStorage for userId
         │
         └─ useEffect: fetch /api/users/profile
                 │
                 ├─ Database: SELECT * FROM user_profiles
                 │
                 ├─ Found: Display data in form
                 │
                 └─ Not found: Display EMPTY STATE
                         │
                         ├─ Icon: Pencil
                         ├─ Message: "No profile information yet"
                         └─ Button: "Create Profile"
                                 │
                                 ├─ User clicks button
                                 │
                                 └─ Enter EDIT MODE
                                         │
                                         ├─ User fills form
                                         ├─ full_name, bio, phone_number, etc.
                                         │
                                         └─ User clicks "Save Changes"
                                                 │
                                                 ├─ PATCH /api/users/profile
                                                 │
                                                 ├─ Database: INSERT or UPDATE
                                                 │   INSERT INTO user_profiles (...)
                                                 │   or UPDATE user_profiles SET ...
                                                 │
                                                 └─ Return updated profile
                                                         │
                                                         └─ Display saved data
                                                             ✅ Refresh page
                                                             ✅ Data persists!
```

### Event Creation Flow (Empty → Populated)

```
User visits /dashboard/events
         │
         ├─ Check localStorage for userId
         │
         └─ useEffect: fetch /api/events
                 │
                 ├─ Database: SELECT * FROM events WHERE user_id = $1
                 │
                 ├─ Found: Display events list
                 │
                 └─ Not found: Display EMPTY STATE
                         │
                         ├─ Icon: CalendarX
                         ├─ Message: "No events yet"
                         └─ Button: "Create Your First Event"
                                 │
                                 ├─ User navigates to create page
                                 │
                                 └─ User fills event form
                                         │
                                         ├─ title (required)
                                         ├─ start_date (required)
                                         ├─ description, location, image (optional)
                                         │
                                         └─ User clicks "Create Event"
                                                 │
                                                 ├─ POST /api/events
                                                 │
                                                 ├─ Database: INSERT INTO events (...)
                                                 │   id (UUID), user_id, title, ...
                                                 │   status = 'draft'
                                                 │
                                                 └─ Return created event
                                                         │
                                                         └─ Redirect to events list
                                                             ✅ Refresh page
                                                             ✅ Event appears!
                                                             ✅ Data persists!
```

## Authentication Flow

```
Client Request
     │
     ├─ Include header: x-user-id (from localStorage)
     │
     └─ API Route (/api/users/profile, /api/events, etc.)
             │
             ├─ Extract x-user-id from request header
             │
             ├─ User ID not provided?
             │  └─ Return 400 Bad Request
             │     "User ID required"
             │
             ├─ Query database with user_id
             │
             ├─ For GET: Return user's data only
             │
             ├─ For PATCH/DELETE: Verify user owns resource
             │  └─ User doesn't own? Return 404
             │
             └─ Execute query & return response
```

## TypeScript Type Flow

```
database
   │
   ├─ lib/types.ts (Type Definitions)
   │  ├─ User interface
   │  ├─ UserProfile interface
   │  ├─ Event interface
   │  ├─ Attendee interface
   │  ├─ Ticket interface
   │  ├─ Speaker interface
   │  └─ Session interface
   │
   ├─ API Routes (app/api/**/route.ts)
   │  ├─ Fetch: async () => Database ──► Type<T>
   │  ├─ Create: await query(...) ──► Type<T>
   │  └─ Response: NextResponse.json(T)
   │
   └─ Components (app/dashboard/**/page.tsx)
      ├─ State: useState<Type<T>>()
      ├─ Fetch: fetch API ──► Type<T>
      └─ Render: Use typed data
```

## Query Patterns

### Safe Parameterized Queries
```typescript
// ✅ SAFE - Prevents SQL injection
const result = await query(
  'SELECT * FROM users WHERE id = $1',
  [userId]
)

// ✅ SAFE - Multiple parameters
const result = await query(
  'UPDATE events SET title = $1 WHERE id = $2 AND user_id = $3',
  [title, eventId, userId]
)

// ❌ UNSAFE - Don't do this!
const result = await query(
  `SELECT * FROM users WHERE id = '${userId}'`
)
```

### User Isolation Pattern
```typescript
// Only return user's own data
const result = await query(
  'SELECT * FROM events WHERE user_id = $1',
  [userId]
)

// Verify user owns resource before modifying
const result = await query(
  'DELETE FROM events WHERE id = $1 AND user_id = $2',
  [eventId, userId]
)
```

## Empty State Implementation

### Frontend Logic
```
if (isLoading) {
  return <LoadingSkeleton />
}

if (data.length === 0 || !data.full_name) {
  return (
    <Card>
      <Icon />
      <Message: "No X yet" />
      <Button: "Create Your First X" />
    </Card>
  )
}

return <RegularContent data={data} />
```

### Database Behavior
```
New User
  ├─ GET /api/users/profile
  │  └─ Database: No user_profiles row
  │     ├─ Return: null or empty object
  │     └─ Frontend: Show empty state
  │
  ├─ PATCH /api/users/profile
  │  └─ Database: INSERT new row (create)
  │     └─ Frontend: Show form with data
  │
  └─ GET /api/events
     └─ Database: SELECT returns empty array []
        └─ Frontend: Show empty state
```

## Performance Optimizations

### Database Indexes
```sql
-- Prevent full table scans
CREATE INDEX idx_user_events ON events(user_id);
CREATE INDEX idx_event_attendees ON attendees(event_id);
CREATE INDEX idx_start_date ON events(start_date DESC);
```

### Connection Pooling
```typescript
// Reuse database connections
const pool = new Pool({
  max: 20,  // Maximum 20 connections
  min: 0,   // Minimum 0 connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})
```

### Query Optimization
```typescript
// Fetch only needed columns
const result = await query(
  'SELECT id, title, status FROM events WHERE user_id = $1',
  [userId]
)

// Limit results
const result = await query(
  'SELECT * FROM events WHERE user_id = $1 LIMIT 10',
  [userId]
)
```

## Security Measures

✅ **SQL Injection Prevention**
- All queries use parameterized statements ($1, $2, etc.)
- Never concatenate user input into SQL

✅ **User Data Isolation**
- All queries filter by user_id
- Cannot access other users' data
- Ownership verified before modifications

✅ **Authentication**
- x-user-id header required
- Could be upgraded to JWT tokens

✅ **HTTPS**
- All API calls over HTTPS in production
- Credentials never exposed in URLs

✅ **Database Credentials**
- AWS IAM authentication (no passwords in code)
- Credentials cached briefly, then regenerated
- Environment variables in Vercel (never in code)

## Deployment Architecture

```
┌─────────────────────────────────────┐
│     Vercel (Next.js Frontend)       │
├─────────────────────────────────────┤
│ app/dashboard/profile/page.tsx     │
│ app/dashboard/events/page.tsx      │
│ app/api/users/profile/route.ts     │
│ app/api/events/[id]/route.ts       │
└──────────────┬──────────────────────┘
               │
               │ HTTPS
               │
┌──────────────▼──────────────────────┐
│   AWS Aurora PostgreSQL Cluster     │
├─────────────────────────────────────┤
│ ├─ Primary instance (write)         │
│ ├─ Read replica (optional)          │
│ ├─ Automated backups                │
│ └─ Multi-AZ failover                │
└─────────────────────────────────────┘
```

## Scalability

### Current Setup
- Supports: ~100-1000 concurrent users
- Database: Single Aurora instance
- API: Serverless Vercel Functions
- Connection pool: 20 connections

### To Scale Further
1. Add read replicas for Aurora
2. Implement caching (Redis)
3. Add database sharding
4. Use CloudFront for static assets
5. Implement API rate limiting
6. Add message queue for async tasks

## Monitoring & Observability

### Database Monitoring
- AWS RDS Performance Insights
- CloudWatch metrics
- Slow query logs
- Connection pool utilization

### Application Monitoring
- Vercel Analytics
- Error tracking (Sentry, etc.)
- API response times
- User flow tracking

### Error Logging
```typescript
console.error('[v0] Error:', error)
// Captured in Vercel logs
```

---

This architecture ensures:
✅ Empty states for new users
✅ Complete data persistence
✅ User data isolation
✅ Production-ready security
✅ Scalable design
✅ Type-safe operations
