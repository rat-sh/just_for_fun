import { useContext, createContext, useState } from 'react'
import type { ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  level: number
  xp: number
  streak: number
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
