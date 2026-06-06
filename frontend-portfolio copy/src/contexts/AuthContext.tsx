import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '../lib/api';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: {
    id: string;
    name: string;
    slug: string;
    permissions: string[];
  };
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  updateUser: (data: any) => Promise<void>;
  hasPermission: (permission: string) => boolean;
  clearAuthError: () => void;
  authError: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Prevent multiple simultaneous initialization attempts
let authInitialized = false;
let authPromise: Promise<any> | null = null;
let initAttempts = 0;
let lastInitAttempt = 0;

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    // Only get token from localStorage once on initialization
    return localStorage.getItem('token');
  });
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const initAuth = async (retryCount = 0): Promise<void> => {
    const tokenValue = localStorage.getItem('token');
    
    // Don't initialize if already initialized or no token
    if (authInitialized || !tokenValue) {
      setLoading(false);
      return;
    }

    // Prevent multiple simultaneous initialization attempts
    if (authPromise) {
      try {
        await authPromise;
      } catch (error) {
        // Handle error
      }
      setLoading(false);
      return;
    }

    // Rate limiting: Don't try more than 3 times in 1 minute
    const now = Date.now();
    if (now - lastInitAttempt < 20000 && initAttempts >= 3) {
      console.warn('Too many auth initialization attempts. Waiting...');
      setAuthError('Too many attempts. Please refresh the page.');
      setLoading(false);
      return;
    }

    lastInitAttempt = now;
    initAttempts++;

    authPromise = (async () => {
      try {
        const response = await authAPI.getMe();
        setUser(response.data.user);
        setToken(tokenValue);
        setAuthError(null);
        authInitialized = true;
        initAttempts = 0; // Reset attempts on success
      } catch (error: any) {
        console.error('Auth initialization error:', error);
        
        // Handle rate limiting specifically
        if (error.response?.status === 429) {
          setAuthError('Too many requests. Please wait a moment and refresh the page.');
          // Don't clear token on rate limit
        } 
        // Handle other errors (401, 500, etc.)
        else if (error.response?.status === 401) {
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        } else {
          // For network errors, retry up to 2 times
          if (retryCount < 2) {
            await new Promise(resolve => setTimeout(resolve, 2000 * (retryCount + 1)));
            return initAuth(retryCount + 1);
          }
        }
      } finally {
        setLoading(false);
        authPromise = null;
      }
    })();

    return authPromise;
  };

  useEffect(() => {
    initAuth();
    
    // Cleanup function to reset state on unmount
    return () => {
      // Don't reset authInitialized on unmount to maintain state
    };
  }, []); // Only run once on mount

  // In AuthContext.tsx, ensure the login function sets loading properly
  const login = async (email: string, password: string) => {
    try {
      setAuthError(null);
      setLoading(true); // Set loading true before API call
      const response = await authAPI.login({ email, password });
      const { token: newToken, user: newUser } = response.data;

      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(newUser);
      authInitialized = true;
      initAttempts = 0;
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.response?.status === 429) {
        setAuthError('Too many login attempts. Please wait 15 minutes before trying again.');
      } else if (error.response?.status === 401) {
        setAuthError('Invalid email or password.');
      } else {
        setAuthError('Login failed. Please try again.');
      }
      throw error;
    } finally {
      setLoading(false); // Always set loading false
    }
  };

  const register = async (data: any) => {
    try {
      setAuthError(null);
      const response = await authAPI.register(data);
      const { token: newToken, user: newUser } = response.data;

      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(newUser);
      authInitialized = true;
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.response?.status === 429) {
        setAuthError('Too many registration attempts. Please wait a moment.');
      } else if (error.response?.status === 400) {
        setAuthError(error.response?.data?.message || 'Registration failed. Please check your information.');
      } else {
        setAuthError('Registration failed. Please try again.');
      }
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    authInitialized = false;
    authPromise = null;
    initAttempts = 0;
    setAuthError(null);
  };

  const updateUser = async (data: any) => {
    try {
      const response = await authAPI.updateProfile(data);
      setUser(response.data.user);
    } catch (error: any) {
      console.error('Update user error:', error);
      if (error.response?.status === 429) {
        setAuthError('Too many requests. Please wait a moment.');
      }
      throw error;
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    const permissions = user.role?.permissions || [];
    return permissions.includes('*') || permissions.includes(permission);
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser,
    hasPermission,
    clearAuthError,
    authError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};