// src/contexts/AuthContext.tsx

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Tipe untuk nilai yang ada di dalam Context
interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: string | null; 
  login: (username: string) => void;
  logout: () => void;
}

// Membuat Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Membuat Provider (ini yang Anda impor di App.tsx)
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  // Cek status login saat aplikasi dimuat (contoh simulasi)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); 
    }, 1500); 
  }, []);

  const login = (username: string) => {
    setUser(username);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const value = {
    isLoggedIn,
    isLoading,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook (ini yang Anda impor di AppNavigator)
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}