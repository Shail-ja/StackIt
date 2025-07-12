import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import API from '../api'; 
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface DecodedToken {
  id: string;
  role: string;
  username: string;
  iat: number;
  exp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  const login = async (email: string, password: string) => {    
    try {
      const response = await API.post('/auth/login', { email, password });
      const token = response.data.token;

      setToken(token);
      localStorage.setItem('token', token);

      const decoded = jwtDecode<DecodedToken>(token);
      setUser({
        id: decoded.id,
        username: decoded.username,
        email: email,
        avatar: `https://api.dicebear.com/6.x/initials/svg?seed=${decoded.username}`
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } 
  };


  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUser({
          id: decoded.id,
          username: 'User', // optional: fetch from backend
          email: '',
          avatar: `https://api.dicebear.com/6.x/initials/svg?seed=User`
        });
      } catch {
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}