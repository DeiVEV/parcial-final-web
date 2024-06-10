import AuthContext from 'contexts/AuthContext';
import { useState } from 'react';

import type { User } from '@~types/common';

interface AuthProviderProps {
  children: React.ReactNode;
}

const users: User[] = [
  { name: 'Jose', email: 'jose@example.com', password: '123456789', rol: 'admin', id: 1 },
  { name: 'John Doe', email: 'john.doe@example.com', password: 'password', rol: 'user', id: 2 },
  { name: 'Jane Smith', email: 'jane.smith@example.com', password: 'password123', rol: 'user', id: 3 },
  { name: 'Maria Garcia', email: 'maria.garcia@example.com', password: 'qwerty', rol: 'user', id: 4 },
  { name: 'Mohammed Ahmed', email: 'mohammed.ahmed@example.com', password: 'password123', rol: 'user', id: 5 },
];

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const storedUser = localStorage.getItem('user') || null;
  const storedIsAuthenticated = localStorage.getItem('isAuthenticated') || false;
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(Boolean(storedIsAuthenticated));
  const [user, setUser] = useState<User | null>(storedUser ? JSON.parse(storedUser) : null);

  const login = (email: string, password: string) => {
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      localStorage.setItem('isAuthenticated', String(1));
      localStorage.setItem('user', JSON.stringify(user));

      setIsAuthenticated(true);
      setUser(user);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setUser(null);
  };

  return <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
