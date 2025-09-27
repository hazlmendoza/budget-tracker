import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react'
import axios from 'axios'

interface User {
    id: string
    username: string
}

interface AuthContextProps {
    user: User | null
    loading: boolean
    login: (credentials: { email: string; password: string }) => Promise<void>
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
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
             try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error('Failed to parse user data:', error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    const login = async (credentials: { email: string; password: string }) => {
        setLoading(false)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, credentials)
            const userData = response.data;
            console.log('Logging in user:', userData);
            const { _id, username, email, sessionToken } = userData;
            const userToStore = { id: _id, username, email, sessionToken };
            setUser(userToStore) 
            localStorage.setItem('user', JSON.stringify(userToStore)) 
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    const logout = async () => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
        setUser(null)
        localStorage.removeItem('user')
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};