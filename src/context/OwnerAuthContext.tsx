import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface OwnerUser {
  role: string;
  email: string;
  company: string;
}

interface OwnerAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: OwnerUser | null;
  token: string | null;
  login: (password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkSession: () => Promise<boolean>;
}

const OwnerAuthContext = createContext<OwnerAuthContextType | undefined>(undefined);

export const OwnerAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<OwnerUser | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    return sessionStorage.getItem('digitex_owner_token');
  });

  const checkSession = useCallback(async (): Promise<boolean> => {
    try {
      const headers: Record<string, string> = {};
      const storedToken = sessionStorage.getItem('digitex_owner_token');
      if (storedToken) {
        headers['Authorization'] = `Bearer ${storedToken}`;
      }

      const res = await fetch('/api/owner/session', {
        headers,
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          setUser(data.user || { role: 'owner', email: 'info.digitex.media@gmail.com', company: 'DIGITEX' });
          setIsLoading(false);
          return true;
        }
      }
    } catch (err) {
      console.warn('[DIGITEX] Session check warning:', err);
    }

    setIsAuthenticated(false);
    setUser(null);
    setIsLoading(false);
    return false;
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const login = async (password: string): Promise<{ ok: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/owner/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setIsAuthenticated(true);
        setUser(data.user);
        if (data.token) {
          setToken(data.token);
          sessionStorage.setItem('digitex_owner_token', data.token);
        }
        setIsLoading(false);
        return { ok: true };
      } else {
        setIsLoading(false);
        if (res.status === 401) {
          return { ok: false, error: 'Incorrect password.' };
        }
        return { ok: false, error: data.error || 'Incorrect password.' };
      }
    } catch (err) {
      setIsLoading(false);
      return { ok: false, error: 'Unable to connect to Owner Portal. Please try again.' };
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      await fetch('/api/owner/logout', {
        method: 'POST',
        headers,
        credentials: 'include',
      });
    } catch (err) {
      console.warn('Logout error:', err);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
      sessionStorage.removeItem('digitex_owner_token');
      setIsLoading(false);
    }
  };

  return (
    <OwnerAuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        token,
        login,
        logout,
        checkSession,
      }}
    >
      {children}
    </OwnerAuthContext.Provider>
  );
};

export const useOwnerAuth = () => {
  const context = useContext(OwnerAuthContext);
  if (!context) {
    throw new Error('useOwnerAuth must be used within an OwnerAuthProvider');
  }
  return context;
};
