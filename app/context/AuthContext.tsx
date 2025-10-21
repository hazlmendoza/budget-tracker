import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react'
import axios from 'axios'
import LoadingOverlay from '../layout/LoadingOverlay'
import { toast } from 'sonner'

interface User {
  id: string
  username: string
  email: string
  sessionToken?: string
}

interface AuthContextProps {
  user: User | null
  loading: boolean
  login: (credentials: { email: string; password: string }) => Promise<void>
  signup: (userData: {
    username: string
    email: string
    password: string
  }) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error('Failed to parse user data:', error)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (credentials: { email: string; password: string }) => {
    setLoading(true)
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        credentials,
      )
      const userData = response.data
      const { _id, username, email, sessionToken } = userData
      const userToStore = { id: _id, username, email, sessionToken }
      setUser(userToStore)
      localStorage.setItem('user', JSON.stringify(userToStore))
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signup = async (userData: {
    username: string
    email: string
    password: string
  }) => {
    setLoading(true)
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        userData,
      )
      const userResponse = response.data
      const { _id, username, email, sessionToken } = userResponse
      const userToStore = { id: _id, username, email, sessionToken }
      setUser(userToStore)
      localStorage.setItem('user', JSON.stringify(userToStore))
      toast.success('User Created!', {
        description: 'New user has been successfully added.',
      })
    } catch (error) {
      toast.error('User Creation Failed!', {
        description: 'Something went wrong while adding a new user.',
      })
      console.error('Signup failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
    setUser(null)
    localStorage.removeItem('user')
  }

  if (loading) return <LoadingOverlay />

  return (
    <>
      {loading && <LoadingOverlay />}
      <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
