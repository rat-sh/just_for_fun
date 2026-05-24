# StudyRoom v2 - Redesigned with MongoDB Chat

## What's New

### 1. **Premium Minimal Design**
- Light theme (98% white background, dark text)
- Subtle borders and shadows
- Removed heavy gradients and colorful UIs
- Clean, focused, professional aesthetic matching your deployed version
- Simple typography and spacing

### 2. **MongoDB Chat Integration**
- Real-time chat system using MongoDB
- Messages persisted in database
- Chat messages loaded from `/api/rooms/[code]/messages`
- Full CRUD operations for messages

### 3. **Updated Components**
- **Login Page**: Minimal form with light theme
- **Room Page**: Clean video grid + side chat panel
- **Global Styles**: New design tokens for minimal aesthetic

## Setup Instructions

### 1. Set MongoDB Environment Variable

Add to your `.env` file:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
```

Or for local MongoDB:
```
MONGODB_URI=mongodb://localhost:27017
```

### 2. Database Collections

The system automatically creates these collections in MongoDB:

```json
// messages collection
{
  "_id": ObjectId,
  "roomId": "study-101",
  "userId": "user123",
  "username": "Alice",
  "message": "Hello everyone!",
  "timestamp": ISODate("2026-05-24T10:30:00Z"),
  "edited": ISODate | null,
  "reactions": { "👍": ["user456", "user789"] }
}

// rooms collection
{
  "_id": ObjectId,
  "code": "study-101",
  "name": "Data Structures Study",
  "description": "Weekly data structures session",
  "category": "Computer Science",
  "members": ["user123", "user456"],
  "maxMembers": 10,
  "isPrivate": false,
  "createdBy": "user123",
  "createdAt": ISODate("2026-05-20T15:00:00Z")
}

// users collection (optional)
{
  "_id": ObjectId,
  "email": "alice@example.com",
  "username": "Alice",
  "level": 5,
  "xp": 2500,
  "streak": 12,
  "createdAt": ISODate("2025-01-01T00:00:00Z")
}
```

### 3. API Endpoints

**Get Messages**
```bash
GET /api/rooms/[code]/messages
```

**Send Message**
```bash
POST /api/rooms/[code]/messages
Content-Type: application/json

{
  "username": "Alice",
  "message": "Hello everyone!",
  "userId": "user123"
}
```

**Get Rooms**
```bash
GET /api/rooms
```

**Get Todos**
```bash
GET /api/todos
```

## File Changes Summary

### Modified Files
1. **app/globals.css** - Premium minimal light theme
2. **app/(auth)/login/page.tsx** - Clean minimal login form
3. **app/(app)/room/[code]/page.tsx** - Redesigned room with chat
4. **app/api/rooms/[code]/messages/route.ts** - MongoDB integration

### New Files
1. **lib/mongodb.ts** - MongoDB connection and helpers
2. **package.json** - Added `mongodb` dependency

## Theme Design Tokens

The minimal light theme uses these colors:

```css
--background: 0 0% 98%;        /* Very light background */
--foreground: 0 0% 12%;        /* Dark text */
--card: 0 0% 100%;             /* Pure white cards */
--primary: 260 80% 56%;        /* Purple buttons */
--secondary: 200 70% 50%;      /* Blue accents */
--accent: 280 65% 55%;         /* Accent color */
--muted: 0 0% 70%;             /* Gray text */
--border: 0 0% 92%;            /* Subtle borders */
--input: 0 0% 96%;             /* Light input fields */
```

## Running the App

```bash
# Install dependencies
npm install

# Set environment variables
echo "MONGODB_URI=your_mongodb_uri" >> .env.local

# Development
npm run dev

# Production build
npm run build
npm start
```

## Next Steps

1. **Connect Real Supabase Auth** - Replace mock login with actual Supabase authentication
2. **Setup WebRTC** - Integrate actual video calling (currently uses placeholder UI)
3. **Real-time Updates** - Add Socket.io for live chat updates
4. **Database Indexing** - Add MongoDB indexes for better performance
5. **Authentication Middleware** - Protect routes with proper auth checks

## File Structure

```
studyroom/
├── app/
│   ├── (auth)/              # Authentication
│   │   └── login/
│   ├── (app)/               # Protected routes with new minimal design
│   │   ├── room/[code]/
│   │   ├── dashboard/
│   │   └── lobby/
│   ├── api/                 # MongoDB-backed APIs
│   │   └── rooms/
│   └── globals.css          # New minimal theme
├── lib/
│   └── mongodb.ts           # MongoDB connection
└── package.json             # Updated dependencies
```

---

**Version**: 2.0.0  
**Design**: Premium Minimal  
**Backend**: MongoDB + Next.js API Routes  
**Status**: Ready for WebRTC & Socket.io integration
