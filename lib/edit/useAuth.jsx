'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { clearCredentials, setCredentials } from '@/lib/edit/github-client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.success) {
        setCredentials(username, password);
        setIsAuthenticated(true);
        return true;
      }
      setError(data.error || 'Invalid username or password');
      return false;
    } catch (err) {
      setError(err.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    clearCredentials();
    setIsAuthenticated(false);
    setError(null);
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, loading, error, login, logout }),
    [isAuthenticated, loading, error, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
