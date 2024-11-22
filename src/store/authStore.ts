import { create } from 'zustand';
import { User } from '../types/user';
import * as api from '../api/client';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: api.RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.login(email, password);
      
      if (response.access_token) {
        localStorage.setItem('token', response.access_token);
        set({
          user: response.user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      } else {
        throw new Error('No access token received');
      }
    } catch (err) {
      localStorage.removeItem('token');
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage
      });
      throw new Error(errorMessage);
    }
  },

  register: async (data) => {
    try {
      set({ isLoading: true, error: null });
      await api.register(data);
      set({ isLoading: false });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      set({
        isLoading: false,
        error: errorMessage
      });
      throw new Error(errorMessage);
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({
      user: null,
      isAuthenticated: false,
      error: null
    });
  },

  clearError: () => set({ error: null })
}));