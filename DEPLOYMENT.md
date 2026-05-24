# StudyRoom Deployment Guide

## Overview

StudyRoom is a modern, premium collaborative study platform built with Next.js 16, Tailwind CSS v4, and Supabase. This guide covers deployment to production.

## System Architecture

### Frontend
- **Next.js 16** with App Router
- **React 19** for UI components
- **Tailwind CSS v4** with custom design tokens
- **TypeScript** for type safety

### Backend Services
- **Supabase** for authentication and database
- **Socket.io** for real-time messaging (separate service)
- **MongoDB** for chat message persistence (optional)

### Deployed Features
1. **Authentication** - Supabase JWT-based auth
2. **Dashboard** - XP/Level progression system
3. **Study Rooms** - Video calling, chat, file sharing
4. **Games/Leaderboard** - Competitive rankings with XP
5. **Interview Module** - Code editor, problem solving
6. **Todo Management** - Task tracking with priorities
7. **Notifications** - Real-time activity feed
8. **User Profiles** - Achievements and statistics

## Environment Variables

### Required Variables
```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_service_key

# MongoDB (for chat persistence)
MONGODB_URI=your_mongodb_connection_string

# Socket.io (optional)
NEXT_PUBLIC_SOCKET_URL=your_socket_server_url
SOCKET_SECRET=your_socket_secret

# API Base URL
NEXT_PUBLIC_API_BASE_URL=your_api_base_url
```

## Deployment Steps

### 1. Local Development Setup
```bash
npm install
npm run dev
# App runs on http://localhost:3000
```

### 2. Database Setup (Supabase)

Create tables in Supabase PostgreSQL:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rooms table
CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  max_members INTEGER DEFAULT 10,
  is_private BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Todos table
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  priority VARCHAR(20),
  category VARCHAR(100),
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Games/Leaderboard table
CREATE TABLE leaderboard (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  games_played INTEGER DEFAULT 0,
  wins INTEGER DEFAULT 0,
  total_xp INTEGER DEFAULT 0,
  rank INTEGER,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Build for Production
```bash
npm run build
```

### 4. Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Or connect GitHub repository directly through Vercel dashboard.

### 5. Configure Environment Variables on Vercel
1. Go to Project Settings > Environment Variables
2. Add all required variables from `.env` section above

## Database Migrations

For future schema changes:

```bash
# Create migration (optional - use Supabase migrations)
supabase migration new add_new_table

# Apply migrations
supabase migration up
```

## Monitoring

### Performance Metrics
- Next.js Analytics: Built-in via Vercel
- Core Web Vitals: LCP, FID, CLS
- Page Load Time: Target <2s on 4G

### Logs
- Vercel Deployments: https://vercel.com/dashboard
- Error tracking: Enable Sentry (optional)

## Troubleshooting

### Common Issues

**Auth not working:**
- Verify NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
- Check Supabase project settings
- Ensure auth providers are enabled

**Database errors:**
- Check Supabase connection status
- Verify tables are created
- Review RLS policies if queries fail

**Real-time features not working:**
- Ensure Socket.io server is running
- Check NEXT_PUBLIC_SOCKET_URL
- Verify firewall allows WebSocket connections

## Performance Optimization

### Already Implemented
- Dynamic imports for code splitting
- Image optimization with Next.js
- CSS purging via Tailwind
- Gzip compression

### Recommended Additional Steps
1. Enable CDN for static assets
2. Set up database query caching
3. Implement Redis for session storage
4. Add monitoring and alerting

## Security Checklist

- [x] HTTPS enabled (automatic with Vercel)
- [x] Environment variables not exposed in build
- [x] Supabase RLS policies configured
- [x] Auth tokens in HTTP-only cookies
- [x] CORS properly configured
- [ ] Rate limiting implemented (todo)
- [ ] Input validation and sanitization (in progress)

## Maintenance

### Regular Tasks
1. Monitor error logs weekly
2. Check database usage
3. Review user feedback
4. Update dependencies monthly

### Backup Strategy
- Enable Supabase automated backups
- Use Vercel's built-in backup system

## Scaling Considerations

For production scale (1000+ concurrent users):
1. Implement database connection pooling
2. Add Redis cache layer
3. Separate Socket.io server
4. Use CDN for static assets
5. Implement API rate limiting

## Support & Documentation

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Supabase Docs: https://supabase.com/docs
- Tailwind Docs: https://tailwindcss.com/docs
