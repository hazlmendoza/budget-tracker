import React, { createContext, useContext, useState, ReactNode } from 'react'
import axios from 'axios'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  signup: (name: string, email: string, password: string) => Promise<unknown>
  login: (email: string, password: string) => Promise<unknown>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const signup = async (name: string, email: string, password: string) => {
    const response = await axios.post(`${process.env.API_URL}/api/signup`, { name, email, password })
    setUser(response.data.user)
    return response.data
  }

  const login = async (email: string, password: string) => {
    const response = await axios.post(`${process.env.API_URL}/api/login`, { email, password })
    setUser(response.data.user)
    return response.data
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}