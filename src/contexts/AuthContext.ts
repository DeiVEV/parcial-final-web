import { createContext } from 'react';

import type { User } from '@~types/common';

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  login: () => false,
  logout: () => {},
});

export default AuthContext;
