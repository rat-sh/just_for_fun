// User types
export interface User {
  id: string
  name: string
  email: string
  avatar_url?: string
  level: number
  xp: number
  rank: number
  created_at: string
}

// Room types
export interface Room {
  id: string
  name: string
  code: string
  pin: string
  is_public: boolean
  topic: string
  max_members: number
  created_by: string
  expires_at: string
  created_at: string
}

// Chat message types
export interface ChatMessage {
  _id?: string
  room_code: string
  user_id: string
  username: string
  message: string
  timestamp: Date
  reactions?: Record<string, string[]>
}

// Game types
export interface GameSession {
  id: string
  type: 'code' | 'quiz' | 'speed'
  player1_id: string
  player2_id: string
  status: 'pending' | 'active' | 'completed'
  winner_id?: string
  score_p1: number
  score_p2: number
  created_at: string
}

// Interview types
export interface Interview {
  id: string
  user_id: string
  question_id: string
  status: 'pending' | 'in_progress' | 'completed'
  code_solution?: string
  score?: number
  feedback?: string
  created_at: string
  completed_at?: string
}

// Todo types
export interface Todo {
  id: string
  title: string
  description?: string
  is_completed: boolean
  priority: 'low' | 'medium' | 'high'
  due_date?: string
  created_by: string
  shared_with_user_id?: string
  created_at: string
}

// Leaderboard entry
export interface LeaderboardEntry {
  user_id: string
  username: string
  level: number
  xp: number
  rank: number
  avatar_url?: string
  wins: number
}
