import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth';

const UserContext = createContext(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const permissions = {
  super_admin: [
    'manage_users',
    'manage_admins',
    'view_all_reports',
    'manage_inventory',
    'manage_suppliers',
    'manage_invoices',
    'view_activity_logs',
    'checkout_assets',
    'checkin_assets',
  ],
  admin: [
    'manage_users',
    'manage_inventory',
    'manage_suppliers',
    'manage_invoices',
    'checkout_assets',
    'checkin_assets',
    'view_limited_reports',
  ],
  user: [
    'request_assets',
    'view_own_requests',
  ],
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Try to get user from localStorage on initial load
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Save user to localStorage whenever user changes
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    // On mount, refresh user session to validate backend session
    const refreshSession = async () => {
      try {
        const userData = await authService.refreshUser();
        setUser(userData);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Only call refresh if no user in localStorage (optional)
    if (!user) {
      refreshSession();
    } else {
      setIsLoading(false); // user restored from localStorage, skip refresh
    }
  }, []);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      await authService.login(credentials);
      const userData = await authService.getUser();
      setUser(userData);
      return true;
    } catch (error) {
      setUser(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setUser(null);
      setIsLoading(false);
    }
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    return permissions[user.role]?.includes(permission);
  };

  return (
    <UserContext.Provider value={{ user, setUser, hasPermission, logout, isLoading, login }}>
      {children}
    </UserContext.Provider>
  );
};
