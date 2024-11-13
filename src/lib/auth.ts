import { create } from 'zustand';

type Role = 'ADMIN' | 'EMPLOYEE';

interface User {
  id: string;
  name: string;
  role: Role;
}

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  login: async (email: string, password: string) => {
    // Simulate API call
    const mockUsers = {
      'admin@example.com': { id: '1', name: 'Admin User', role: 'ADMIN' as Role },
      'employee@example.com': { id: '2', name: 'Employee User', role: 'EMPLOYEE' as Role },
    };

    await new Promise(resolve => setTimeout(resolve, 1000));
    const user = mockUsers[email as keyof typeof mockUsers];
    
    if (user && password === 'password') {
      set({ user });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  logout: () => set({ user: null }),
}));