import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  adminEmail: string | null;
  login: (token: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  adminEmail: null,
  login: () => {},
  logout: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('admin_token'));
  const [adminEmail, setAdminEmail] = useState<string | null>(localStorage.getItem('admin_email'));

  const login = (newToken: string, email: string) => {
    localStorage.setItem('admin_token', newToken);
    localStorage.setItem('admin_email', email);
    setToken(newToken);
    setAdminEmail(email);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_email');
    setToken(null);
    setAdminEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, token, adminEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
