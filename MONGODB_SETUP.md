# MongoDB + Vercel Deployment Guide

## Quick Start

### 1. Get MongoDB Connection String

**Option A: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new project
4. Create a cluster (free tier available)
5. Set up a database user (username/password)
6. Click "Connect" → "Drivers" → Copy connection string
7. Replace `<password>` with your user password

**Option B: Local MongoDB**
```
mongodb://localhost:27017
```

### 2. Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add:
   ```
   MONGODB_URI=your_connection_string_here
   ```

### 3. Deploy to Vercel

```bash
# Push to GitHub
git add .
git commit -m "Add MongoDB chat system and minimal redesign"
git push origin main

# Deploy from Vercel dashboard or CLI
vercel deploy --prod
```

### 4. Test MongoDB Connection

```bash
# Test locally first
npm run dev

# Visit http://localhost:3000/room/test-room
# Send a message in the chat panel
# Check MongoDB Atlas to see the message saved
```

## Troubleshooting

### "Connection refused" Error
- Check if MongoDB is running (local) or cluster is active (Atlas)
- Verify connection string is correct
- Check firewall/network settings

### "MONGODB_URI is not defined"
- Add to .env.local file locally
- Add to Vercel Environment Variables for production

### Messages not persisting
- Check MongoDB collections are created
- Verify database user has write permissions
- Check browser console for API errors

## Performance Tips

### Add MongoDB Indexes

```javascript
// In MongoDB Atlas or local shell
use studyroom

// Create indexes for better performance
db.messages.createIndex({ roomId: 1, timestamp: -1 })
db.rooms.createIndex({ code: 1 }, { unique: true })
db.users.createIndex({ email: 1 }, { unique: true })
```

### Connection Pooling

The MongoDB driver automatically handles connection pooling. For large-scale deployments, configure in connection string:

```
mongodb+srv://user:pass@cluster.mongodb.net/?maxPoolSize=50&minPoolSize=10
```

## Chat Features

### Current Features
- Send and receive messages
- Message timestamps
- User identification
- Real-time chat load (polls every 2 seconds)

### Planned Features
- WebSocket real-time chat (Socket.io)
- Message editing & deletion
- Reactions and emojis
- User online status
- Typing indicators
- Message search

## Cost Estimates

### MongoDB Atlas (Free Tier)
- Storage: 512 MB
- Connections: 100
- Perfect for testing and small apps

### MongoDB Atlas (Paid)
- M0: Free 512 MB
- M2: $9/month, 2.5 GB
- M5: $57/month, 10 GB

### Vercel
- Hobby: Free (for experiments)
- Pro: $20/month (production ready)

## Important Security Notes

⚠️ **Never commit `.env` files to git**
- Add to `.gitignore`
- Use `.env.local` for development
- Use Vercel Environment Variables for production

⚠️ **MongoDB Authentication**
- Always use authentication enabled
- Use strong passwords
- Restrict IP access in Atlas (if possible)

⚠️ **API Security**
- Add rate limiting to prevent abuse
- Validate all user inputs
- Implement proper authentication
- Use HTTPS only

## Example: Adding Rate Limiting

```typescript
// lib/rateLimit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 h"),
});

export async function checkRateLimit(userId: string) {
  const { success } = await ratelimit.limit(userId);
  return success;
}
```

Use it in your API routes to prevent spam.

---

**Next**: Connect Socket.io for real-time chat and add WebRTC for actual video calling!
